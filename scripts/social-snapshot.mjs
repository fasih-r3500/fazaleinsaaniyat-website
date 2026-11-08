#!/usr/bin/env node
/**
 * Build-time social snapshot for the home page mosaic.
 *
 * Run by hand from the repository root:
 *
 *   node scripts/social-snapshot.mjs
 *
 * The script reads the explicit post list in POSTS below, fetches each post
 * page, extracts the media JSON from that page, downloads one still per post,
 * converts it to a 720px wide WebP under public/media/social/, and writes
 * content/social/posts.json.
 *
 * Retrieval surface
 * -----------------
 * The only source this script uses is a single Instagram post page, for example
 * https://www.instagram.com/fazaleinsaaniyat/reel/ABC123/. A logged-out request
 * with a full browser header set returns HTML containing the
 * `xig_polaris_media` object with `if_not_gated_logged_out`, and that object
 * carries `taken_at`, `media_type`, `user`, `caption`, `coauthor_producers` and
 * `image_versions2.candidates[]`.
 *
 * The other routes are closed and are deliberately not used here:
 *
 * - The profile page returns an error shell with zero media tiles.
 * - The public JSON endpoints (web_profile_info, ?__a=1, media info) return 404,
 *   an empty body or a login redirect.
 * - yt-dlp refuses a profile URL and only works on a single post URL. It would
 *   download video, and this task commits posters only.
 *
 * When Instagram changes the post page or moves the media JSON, the extraction
 * below throws for every post that no longer matches. The script then prints the
 * failure, writes no manifest and leaves the last good manifest in place. It
 * never writes an empty or partial manifest. To repair it, inspect one
 * post page in a browser, update `extractMedia`, run the script again and review
 * the diff before committing.
 *
 * What this script does not do
 * ----------------------------
 * It stores local poster paths, never the signed CDN URLs, because those URLs
 * expire within days. It does not save video, does not use an account, cookie or
 * Meta API, and does not run on the site at request time.
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOCIAL_DIRECTORY = "content/social";
const MANIFEST_PATH = `${SOCIAL_DIRECTORY}/posts.json`;
const POSTER_DIRECTORY = "public/media/social";
const TARGET_WIDTH = 720;
const MIN_BYTES = 80 * 1024;
const MAX_BYTES = 120 * 1024;
const START_QUALITY = 80;
const MIN_QUALITY = 45;
const MAX_QUALITY = 92;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// A bare curl request can receive Instagram's error shell. These headers match
// the request that returns the post page with the media JSON.
const REQUEST_HEADERS = {
  "user-agent": USER_AGENT,
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-GB,en;q=0.9",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "upgrade-insecure-requests": "1",
};

/**
 * The explicit snapshot. Add, remove or reorder posts here, then run the script.
 * `alt` is written by hand after looking at the poster. It describes what is
 * visible and makes no claim the post does not make.
 *
 * Excluded deliberately:
 * - Ded5nANDPZU: the square Hunar Ghar illustration, provenance unconfirmed.
 * - DQlvJYoCPzu: owned by @digital_andaz_, so it is not presented on its own.
 * - DfWoZhks11s: carries a full TikTok watermark.
 * - DRPSg3cjG2Q: a pinned post from 2025, so it is not one of the latest posts.
 * - Deqn5QcM3EJ: letterboxed video still with a small TikTok watermark.
 */
const POSTS = [
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/reel/DfW9d4-MPz0/",
    alt: "Designed poster for a home-based madrasah in Khipro, with a photograph of children and women sitting on the floor with books in a thatched room.",
  },
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/reel/DfR-G3xssDQ/",
    alt: "Designed poster showing a man handing an envelope to a woman in a black niqab beside a sewing machine, with text about a Hunar Ghar teacher's monthly salary and a sewing machine.",
  },
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/reel/DfRnh3FMpp7/",
    alt: "Designed poster showing a man handing an envelope to a woman in a white burqa, with text about paying a village madrasah teacher's monthly salary.",
  },
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/reel/De8yazXMyCe/",
    alt: "Photograph of a group gathered around a new water pump, with a man bending to drink and people clapping beside a Fazal-e-Insaaniyat banner.",
  },
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/p/De8lUcdgIY1/",
    alt: "Designed flyer for a November 2026 visit to Pakistan, with two columns of text and illustrations of a mosque, a water pump and a map.",
  },
  {
    url: "https://www.instagram.com/fazaleinsaaniyat/reel/DeoOEouMRuk/",
    alt: "Designed poster with a man whose face is blurred, standing in front of a brick building under construction, with text about washrooms in Shikarpur and a panel of QR codes.",
  },
];

function fail(message) {
  throw new Error(message);
}

function ensureNoEmDash(value, label) {
  if (typeof value === "string" && value.includes("\u2014")) {
    fail(`${label} contains an em dash, which is not allowed in this repository`);
  }
}

function shortcodeFromUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(`not a valid URL: ${value}`);
  }

  const match = parsed.pathname.match(/^\/(?:[A-Za-z0-9._]+\/)?(?:p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
  if (!match) {
    fail(`not an Instagram post URL: ${value}`);
  }

  return match[1];
}

function findJsonObjectEnd(source, start) {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }

  return -1;
}

function extractMedia(html, postUrl) {
  const marker = "xig_polaris_media";
  let searchFrom = 0;

  while (searchFrom < html.length) {
    const markerIndex = html.indexOf(marker, searchFrom);
    if (markerIndex === -1) break;

    const start = html.lastIndexOf('{"__bbox":', markerIndex);
    if (start !== -1) {
      const end = findJsonObjectEnd(html, start);
      if (end !== -1) {
        try {
          const parsed = JSON.parse(html.slice(start, end));
          const media = parsed?.__bbox?.result?.data?.xig_polaris_media;
          const payload = media?.if_not_gated_logged_out;
          if (payload && typeof payload.taken_at === "number") {
            return payload;
          }
        } catch {
          // Try the next occurrence before giving up.
        }
      }
    }

    searchFrom = markerIndex + marker.length;
  }

  fail(
    `${postUrl}: the post page no longer contains the media JSON (xig_polaris_media), so the last good manifest was left untouched`,
  );
}

function choosePosterCandidate(media, postUrl) {
  const candidates = media?.image_versions2?.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    fail(`${postUrl}: the media JSON has no image candidates`);
  }

  const valid = candidates.filter(
    (candidate) =>
      typeof candidate?.url === "string" &&
      candidate.url.startsWith("https://"),
  );

  if (valid.length === 0) {
    fail(`${postUrl}: the media JSON has no https image candidate`);
  }

  if (media.media_type === 1) {
    // A photo post lists the full-size candidate first, and some of those
    // candidates omit width and height. Keep that first full-size entry.
    return valid[0];
  }

  // A video post lists portrait, square and thumbnail crops. The largest
  // explicit area is the poster that matches the original frame.
  return valid.reduce((best, candidate) => {
    const area = (candidate.width ?? 0) * (candidate.height ?? 0);
    const bestArea = (best.width ?? 0) * (best.height ?? 0);
    return area > bestArea ? candidate : best;
  }, valid[0]);
}

function isImageBytes(buffer) {
  if (buffer.length < 12) return false;
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;
  const isWebp =
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";
  return isJpeg || isPng || isWebp;
}

async function downloadPoster(candidate, postUrl) {
  const response = await fetch(candidate.url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "image/avif,image/webp,image/jpeg,image/*;q=0.8,*/*;q=0.5",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    fail(`${postUrl}: poster download returned HTTP ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (!isImageBytes(bytes)) {
    fail(`${postUrl}: poster download was not a JPEG, PNG or WebP image`);
  }

  return bytes;
}

function runCwebp(sourcePath, outputPath, quality) {
  const result = spawnSync(
    "cwebp",
    [
      "-quiet",
      "-q",
      String(quality),
      "-resize",
      String(TARGET_WIDTH),
      "0",
      "-metadata",
      "none",
      sourcePath,
      "-o",
      outputPath,
    ],
    { encoding: "utf8" },
  );

  if (result.error || result.status !== 0) {
    const detail = (result.stderr || result.stdout || result.error?.message || "").trim();
    fail(`cwebp failed${detail ? `: ${detail}` : ""}`);
  }
}

function convertPoster(sourcePath, outputPath) {
  let quality = START_QUALITY;
  runCwebp(sourcePath, outputPath, quality);
  let size = statSync(outputPath).size;

  while (size > MAX_BYTES && quality > MIN_QUALITY) {
    quality = Math.max(MIN_QUALITY, quality - 3);
    runCwebp(sourcePath, outputPath, quality);
    size = statSync(outputPath).size;
  }

  while (size < MIN_BYTES && quality < MAX_QUALITY) {
    quality = Math.min(MAX_QUALITY, quality + 3);
    runCwebp(sourcePath, outputPath, quality);
    size = statSync(outputPath).size;
  }

  if (size > MAX_BYTES) {
    fail(
      `poster could not be brought under ${MAX_BYTES} bytes at quality ${quality}: ${outputPath}`,
    );
  }

  return { size, quality };
}

function assertCwebpAvailable() {
  const result = spawnSync("cwebp", ["-version"], { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    fail(
      "cwebp is required to make the WebP posters. Install libwebp and run the script again.",
    );
  }
}

function validateEntries(entries) {
  if (entries.length === 0) {
    fail("the snapshot has no posts");
  }

  const urls = new Set();
  const posters = new Set();

  for (const entry of entries) {
    const required = [
      "platform",
      "url",
      "takenAt",
      "mediaType",
      "poster",
      "alt",
      "owner",
      "collaborator",
    ];

    for (const field of required) {
      if (!(field in entry)) {
        fail(`snapshot entry ${entry.url ?? "(unknown)"} is missing "${field}"`);
      }
    }

    if (entry.platform !== "instagram") fail(`unsupported platform on ${entry.url}`);
    if (!["image", "video"].includes(entry.mediaType)) {
      fail(`unsupported media type on ${entry.url}`);
    }
    if (Number.isNaN(Date.parse(entry.takenAt))) {
      fail(`invalid timestamp on ${entry.url}`);
    }
    if (typeof entry.alt !== "string" || entry.alt.trim() === "") {
      fail(`missing alt text on ${entry.url}`);
    }
    if (typeof entry.owner !== "string" || !/^[A-Za-z0-9._]+$/.test(entry.owner)) {
      fail(`invalid owner handle on ${entry.url}`);
    }
    if (urls.has(entry.url)) fail(`duplicate post URL: ${entry.url}`);
    if (posters.has(entry.poster)) fail(`duplicate poster path: ${entry.poster}`);
    urls.add(entry.url);
    posters.add(entry.poster);

    const posterPath = join(PROJECT_ROOT, entry.poster);
    if (!existsSync(posterPath) || !statSync(posterPath).isFile()) {
      fail(`poster is missing for ${entry.url}: ${entry.poster}`);
    }

    const posterSize = statSync(posterPath).size;
    if (posterSize === 0 || posterSize > MAX_BYTES) {
      fail(`poster size is outside the accepted range: ${entry.poster}`);
    }

    ensureNoEmDash(entry.alt, `alt text for ${entry.url}`);
    ensureNoEmDash(entry.owner, `owner handle for ${entry.url}`);
    ensureNoEmDash(entry.collaborator ?? "", `collaborator handle for ${entry.url}`);
  }

  for (let index = 1; index < entries.length; index += 1) {
    if (Date.parse(entries[index - 1].takenAt) < Date.parse(entries[index].takenAt)) {
      fail("snapshot entries are not sorted by the post timestamp, newest first");
    }
  }
}

async function main() {
  assertCwebpAvailable();

  const tempDir = mkdtempSync(join(tmpdir(), "fi-social-snapshot-"));
  const stagedPosters = new Map();

  try {
    for (const post of POSTS) {
      ensureNoEmDash(post.url, "post URL");
      ensureNoEmDash(post.alt, `alt text for ${post.url}`);

      const shortcode = shortcodeFromUrl(post.url);
      const response = await fetch(post.url, {
        headers: REQUEST_HEADERS,
        redirect: "follow",
      });

      if (!response.ok) {
        fail(`${post.url}: post page returned HTTP ${response.status}`);
      }

      const html = await response.text();
      const media = extractMedia(html, post.url);

      if (media.code !== shortcode) {
        fail(`${post.url}: the page returned code ${media.code}, not ${shortcode}`);
      }

      const owner = media?.user?.username;
      if (typeof owner !== "string" || !/^[A-Za-z0-9._]+$/.test(owner)) {
        fail(`${post.url}: the post page has no usable owner handle`);
      }

      if (![1, 2, 8].includes(media.media_type)) {
        fail(`${post.url}: unsupported media_type ${media.media_type}`);
      }

      if (media.media_type === 8) {
        fail(`${post.url}: carousel posts are not supported by this snapshot`);
      }

      const takenAt = new Date(media.taken_at * 1000).toISOString();
      const candidate = choosePosterCandidate(media, post.url);
      const posterBytes = await downloadPoster(candidate, post.url);

      const sourcePath = join(tempDir, `${shortcode}.source`);
      const webpPath = join(tempDir, `${shortcode}.webp`);
      writeFileSync(sourcePath, posterBytes);
      const conversion = convertPoster(sourcePath, webpPath);

      const collaborators = Array.isArray(media.coauthor_producers)
        ? media.coauthor_producers
            .map((producer) => producer?.username)
            .filter((username) => typeof username === "string")
        : [];
      const collaborator =
        collaborators.find((username) => username !== owner) ?? null;

      if (media.media_type === 2) {
        // A video tile shows its poster and links to the post. The script does
        // not save the video, so the page never autoplays or streams one.
      }

      stagedPosters.set(shortcode, {
        sourcePath: webpPath,
        size: conversion.size,
        quality: conversion.quality,
      });

      const entry = {
        platform: "instagram",
        url: post.url,
        takenAt,
        mediaType: media.media_type === 2 ? "video" : "image",
        poster: `${POSTER_DIRECTORY}/${shortcode}.webp`,
        alt: post.alt,
        owner,
        collaborator,
      };

      post.entry = entry;
      post.shortcode = shortcode;
      post.summary = {
        takenAt,
        mediaType: entry.mediaType,
        bytes: conversion.size,
        quality: conversion.quality,
      };
    }

    const entries = POSTS.map((post) => post.entry).filter(Boolean);
    entries.sort(
      (a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt) || a.url.localeCompare(b.url),
    );

    // Stage posters inside the destination directory so the final rename stays
    // on one filesystem. Nothing replaces a good poster until every entry has
    // downloaded, converted and validated.
    const absolutePosterDirectory = join(PROJECT_ROOT, POSTER_DIRECTORY);
    mkdirSync(absolutePosterDirectory, { recursive: true });
    const stagingDirectory = join(absolutePosterDirectory, `.staging-${process.pid}`);
    rmSync(stagingDirectory, { recursive: true, force: true });
    mkdirSync(stagingDirectory, { recursive: true });

    for (const post of POSTS) {
      const staged = stagedPosters.get(post.shortcode);
      const target = join(stagingDirectory, `${post.shortcode}.webp`);
      copyFileSync(staged.sourcePath, target);
    }

    for (const post of POSTS) {
      const staged = join(stagingDirectory, `${post.shortcode}.webp`);
      const target = join(absolutePosterDirectory, `${post.shortcode}.webp`);
      renameSync(staged, target);
    }

    rmSync(stagingDirectory, { recursive: true, force: true });

    validateEntries(entries);

    const manifestText = `${JSON.stringify(entries, null, 2)}\n`;
    ensureNoEmDash(manifestText, "manifest");

    const absoluteSocialDirectory = join(PROJECT_ROOT, SOCIAL_DIRECTORY);
    mkdirSync(absoluteSocialDirectory, { recursive: true });
    const temporaryManifest = join(
      absoluteSocialDirectory,
      `.posts.json.${process.pid}.tmp`,
    );
    writeFileSync(temporaryManifest, manifestText);
    renameSync(temporaryManifest, join(PROJECT_ROOT, MANIFEST_PATH));

    const totalBytes = [...stagedPosters.values()].reduce(
      (total, poster) => total + poster.size,
      0,
    );

    console.log(`Wrote ${MANIFEST_PATH}`);
    console.log(
      `${entries.length} posts, ${(totalBytes / 1024).toFixed(0)} KB of WebP posters`,
    );
    console.log("");

    for (const post of POSTS) {
      console.log(
        `- ${post.shortcode}  ${post.summary.takenAt.slice(0, 10)}  ${post.summary.mediaType.padEnd(5)}  ${(post.summary.bytes / 1024).toFixed(0).padStart(3)} KB  q${post.summary.quality}  ${POSTER_DIRECTORY}/${post.shortcode}.webp`,
      );
    }

    console.log("");
    console.log("The manifest is sorted by each post's own timestamp, newest first.");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Social snapshot failed: ${message}`);
  console.error("The last good manifest was left untouched.");
  process.exitCode = 1;
});
