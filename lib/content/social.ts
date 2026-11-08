import { statSync } from "node:fs";
import { join } from "node:path";
import { ContentError, type ContentIssue } from "./errors";
import type { SocialMediaType, SocialPlatform, SocialPost } from "./types";
import {
  addIssue,
  isMissingFileError,
  isPlainObject,
  isRealCalendarDate,
  publicUrlFor,
  readChoice,
  readFileText,
  readPattern,
  readRepoFile,
  readText,
  rejectUnknownFields,
  ISO_DATE_PATTERN,
} from "./validate";

/** Folder that holds the social snapshot manifest. */
export const SOCIAL_DIRECTORY = "content/social";

/** The manifest written by `scripts/social-snapshot.mjs`. */
export const SOCIAL_POSTS_FILE = `${SOCIAL_DIRECTORY}/posts.json`;

export const SOCIAL_PLATFORMS: readonly SocialPlatform[] = ["instagram"];

export const SOCIAL_MEDIA_TYPES: readonly SocialMediaType[] = ["image", "video"];

const SOCIAL_FIELDS = [
  "platform",
  "url",
  "takenAt",
  "mediaType",
  "poster",
  "alt",
  "owner",
  "collaborator",
] as const;

const HANDLE_PATTERN = /^[A-Za-z0-9._]+$/;

const INSTAGRAM_POST_PATH = /^\/(?:[A-Za-z0-9._]+\/)?(?:p|reel|tv)\/[A-Za-z0-9_-]+\/?$/;

const ISO_INSTANT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

type JsonFile =
  | { state: "missing" }
  | { state: "invalid" }
  | { state: "parsed"; value: unknown };

function readJsonFile(
  projectRoot: string,
  relativePath: string,
  issues: ContentIssue[],
): JsonFile {
  let source: string;

  try {
    source = readFileText(projectRoot, relativePath);
  } catch (error) {
    if (isMissingFileError(error)) return { state: "missing" };
    throw error;
  }

  try {
    return { state: "parsed", value: JSON.parse(source) };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    addIssue(issues, relativePath, `file is not valid JSON: ${detail}`);
    return { state: "invalid" };
  }
}

function readPostUrl(
  issues: ContentIssue[],
  field: string,
  value: unknown,
): string | null {
  const text = readText(issues, SOCIAL_POSTS_FILE, field, value, true);
  if (text === null) return null;

  let parsed: URL;
  try {
    parsed = new URL(text);
  } catch {
    addIssue(
      issues,
      SOCIAL_POSTS_FILE,
      `field "${field}" must be a full https:// post URL, found "${text}"`,
    );
    return null;
  }

  const isInstagram =
    parsed.protocol === "https:" &&
    (parsed.hostname === "instagram.com" || parsed.hostname === "www.instagram.com");

  if (!isInstagram || !INSTAGRAM_POST_PATH.test(parsed.pathname)) {
    addIssue(
      issues,
      SOCIAL_POSTS_FILE,
      `field "${field}" must be an Instagram post or reel URL such as https://www.instagram.com/p/ABC123/, found "${text}"`,
    );
    return null;
  }

  return text;
}

function readTakenAt(
  issues: ContentIssue[],
  field: string,
  value: unknown,
): string | null {
  const text = readText(issues, SOCIAL_POSTS_FILE, field, value, true);
  if (text === null) return null;

  const day = text.slice(0, 10);
  if (
    !ISO_INSTANT_PATTERN.test(text) ||
    !ISO_DATE_PATTERN.test(day) ||
    !isRealCalendarDate(day) ||
    Number.isNaN(Date.parse(text))
  ) {
    addIssue(
      issues,
      SOCIAL_POSTS_FILE,
      `field "${field}" must be a UTC timestamp written as YYYY-MM-DDTHH:MM:SSZ, found "${text}"`,
    );
    return null;
  }

  return text;
}

/**
 * Read `content/social/posts.json`, validate every entry and return the posts
 * sorted by the post's own timestamp, newest first. A missing or empty manifest
 * means the social strip has nothing to render.
 *
 * The manifest is a build-time snapshot. It holds local poster paths, never the
 * signed Instagram CDN URLs, because those expire within days.
 */
export function loadSocialPosts(projectRoot: string = process.cwd()): SocialPost[] {
  const issues: ContentIssue[] = [];
  const file = readJsonFile(projectRoot, SOCIAL_POSTS_FILE, issues);

  if (file.state !== "parsed") {
    if (file.state === "invalid") throw new ContentError(issues);
    return [];
  }

  if (!Array.isArray(file.value)) {
    addIssue(
      issues,
      SOCIAL_POSTS_FILE,
      "the manifest must be a JSON list of posts, for example [ { ... } ]",
    );
    throw new ContentError(issues);
  }

  const posts: SocialPost[] = [];
  const seenUrls = new Set<string>();
  const seenPosters = new Set<string>();

  file.value.forEach((raw, index) => {
    const prefix = `posts[${index}].`;

    if (!isPlainObject(raw)) {
      addIssue(issues, SOCIAL_POSTS_FILE, `posts[${index}] must be a JSON object`);
      return;
    }

    rejectUnknownFields(issues, SOCIAL_POSTS_FILE, raw, SOCIAL_FIELDS, prefix);

    const platform = readChoice(
      issues,
      SOCIAL_POSTS_FILE,
      `${prefix}platform`,
      raw.platform,
      SOCIAL_PLATFORMS,
      true,
    );
    const url = readPostUrl(issues, `${prefix}url`, raw.url);
    const takenAt = readTakenAt(issues, `${prefix}takenAt`, raw.takenAt);
    const mediaType = readChoice(
      issues,
      SOCIAL_POSTS_FILE,
      `${prefix}mediaType`,
      raw.mediaType,
      SOCIAL_MEDIA_TYPES,
      true,
    );
    const poster = readText(
      issues,
      SOCIAL_POSTS_FILE,
      `${prefix}poster`,
      raw.poster,
      true,
    );
    const alt = readText(issues, SOCIAL_POSTS_FILE, `${prefix}alt`, raw.alt, true);
    const owner = readPattern(
      issues,
      SOCIAL_POSTS_FILE,
      `${prefix}owner`,
      raw.owner,
      HANDLE_PATTERN,
      "be a handle without the @ symbol",
      true,
    );
    const collaborator = readPattern(
      issues,
      SOCIAL_POSTS_FILE,
      `${prefix}collaborator`,
      raw.collaborator,
      HANDLE_PATTERN,
      "be a handle without the @ symbol",
      false,
    );

    let posterPath: string | null = null;
    if (poster !== null) {
      if (!poster.endsWith(".webp")) {
        addIssue(
          issues,
          SOCIAL_POSTS_FILE,
          `field "${prefix}poster" must point at a .webp file, found "${poster}"`,
        );
      } else {
        posterPath = readRepoFile(
          issues,
          SOCIAL_POSTS_FILE,
          `${prefix}poster`,
          poster,
          projectRoot,
          { requirePublic: true },
        );
      }
    }

    if (posterPath !== null) {
      const size = statSync(join(projectRoot, posterPath)).size;
      if (size === 0) {
        addIssue(
          issues,
          SOCIAL_POSTS_FILE,
          `field "${prefix}poster" points at an empty file "${posterPath}"`,
        );
        posterPath = null;
      }
    }

    if (url !== null) {
      if (seenUrls.has(url)) {
        addIssue(issues, SOCIAL_POSTS_FILE, `field "${prefix}url" repeats "${url}"`);
        return;
      }
      seenUrls.add(url);
    }

    if (posterPath !== null) {
      if (seenPosters.has(posterPath)) {
        addIssue(
          issues,
          SOCIAL_POSTS_FILE,
          `field "${prefix}poster" repeats "${posterPath}"`,
        );
        return;
      }
      seenPosters.add(posterPath);
    }

    if (
      platform === null ||
      url === null ||
      takenAt === null ||
      mediaType === null ||
      posterPath === null ||
      alt === null ||
      owner === null
    ) {
      return;
    }

    posts.push({
      platform,
      url,
      takenAt,
      mediaType,
      posterPath,
      posterUrl: publicUrlFor(posterPath),
      alt,
      owner,
      collaborator,
    });
  });

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return posts.sort(
    (a, b) =>
      Date.parse(b.takenAt) - Date.parse(a.takenAt) || a.url.localeCompare(b.url),
  );
}
