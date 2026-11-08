import { statSync } from "node:fs";
import { join } from "node:path";
import { ContentError, type ContentIssue } from "./errors";
import type { LocalizedText, SocialImage, SocialProvenance, SocialSlot } from "./types";
import {
  addIssue,
  isMissingFileError,
  isPlainObject,
  readChoice,
  readFileText,
  readInteger,
  readIsoDate,
  readPattern,
  readText,
  rejectUnknownFields,
  RECORD_ID_PATTERN,
} from "./validate";

/**
 * Stills taken from the charity's own public Facebook page.
 *
 * The page exposes no camera originals, so each still is the largest rendition
 * the page served, committed as a WebP derivative under `public/media/social/`
 * and never upscaled. Nothing is hot-linked: the browser only ever requests a
 * file from this site.
 *
 * A still whose origin is not established is recorded here with `src` set to
 * null, and the site renders a redacted placeholder in its place rather than a
 * photograph nobody can vouch for.
 */

export const SOCIAL_DIRECTORY = "content/social";
export const FACEBOOK_MEDIA_FILE = `${SOCIAL_DIRECTORY}/facebook.json`;
export const SOCIAL_IMAGE_DIRECTORY = "public/media/social";

export const SOCIAL_SLOTS: readonly SocialSlot[] = [
  "mosques",
  "water",
  "hunar-ghar",
  "field",
];

export const SOCIAL_PROVENANCE: readonly SocialProvenance[] = [
  "public-page",
  "unconfirmed",
];

const MANIFEST_FIELDS = ["source", "retrieved", "retrieval", "images"];

const IMAGE_FIELDS = [
  "id",
  "slot",
  "photoId",
  "sourceUrl",
  "sourceWidth",
  "sourceHeight",
  "sourceBytes",
  "src",
  "width",
  "height",
  "bytes",
  "provenance",
  "note",
  "alt",
];

const PHOTO_ID_PATTERN = /^\d+$/;
const FACEBOOK_URL_PATTERN = /^https:\/\/www\.facebook\.com\//;
const DERIVATIVE_PATH_PATTERN = /^\/media\/social\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/;

/** A committed still that the site may render as a photograph. */
export type PhotoMedia = {
  kind: "photo";
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
};

/** What a slot should render: a committed photo or a redacted block. */
export type SlotMedia = PhotoMedia | { kind: "redacted"; alt: LocalizedText };

export type SocialManifest = {
  source: string;
  retrieved: string;
  retrieval: string;
  images: SocialImage[];
};

function emptyManifest(): SocialManifest {
  return { source: "", retrieved: "", retrieval: "", images: [] };
}

function readAlt(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
): LocalizedText | null {
  if (!isPlainObject(value)) {
    addIssue(issues, file, `field "${field}" must be an object holding "en" and "ur" text`);
    return null;
  }

  rejectUnknownFields(issues, file, value, ["en", "ur"], `${field}.`);

  const en = readText(issues, file, `${field}.en`, value.en, true);
  const ur = readText(issues, file, `${field}.ur`, value.ur, true);

  if (en === null || ur === null) return null;

  return { en, ur };
}

function checkDerivative(
  issues: ContentIssue[],
  file: string,
  src: string,
  projectRoot: string,
  bytes: number | null,
): void {
  const relative = join(SOCIAL_IMAGE_DIRECTORY, src.replace("/media/social/", ""));

  let size: number;
  try {
    const stats = statSync(join(projectRoot, relative));
    if (!stats.isFile()) {
      addIssue(issues, file, `field "src" points at "${relative}" but that is not a file`);
      return;
    }
    size = stats.size;
  } catch (error) {
    if (isMissingFileError(error)) {
      addIssue(
        issues,
        file,
        `field "src" points at "${src}" but ${relative} does not exist; commit the derivative under public/media/social/`,
      );
      return;
    }
    throw error;
  }

  if (bytes !== null && size !== bytes) {
    addIssue(
      issues,
      file,
      `field "bytes" says ${bytes} but ${relative} is ${size} bytes on disk; update the record to match the committed file`,
    );
  }
}

function readImage(
  issues: ContentIssue[],
  file: string,
  projectRoot: string,
  value: unknown,
  index: number,
): SocialImage | null {
  const label = `images[${index}]`;

  if (!isPlainObject(value)) {
    addIssue(issues, file, `field "${label}" must be an object`);
    return null;
  }

  rejectUnknownFields(issues, file, value, IMAGE_FIELDS, `${label}.`);

  const id = readPattern(
    issues,
    file,
    `${label}.id`,
    value.id,
    RECORD_ID_PATTERN,
    "use lowercase letters, numbers and single hyphens",
    true,
  );
  const slot = readChoice(issues, file, `${label}.slot`, value.slot, SOCIAL_SLOTS, true);
  const photoId = readPattern(
    issues,
    file,
    `${label}.photoId`,
    value.photoId,
    PHOTO_ID_PATTERN,
    "be the numeric Facebook photo id",
    true,
  );
  const sourceUrl = readPattern(
    issues,
    file,
    `${label}.sourceUrl`,
    value.sourceUrl,
    FACEBOOK_URL_PATTERN,
    "be the full https://www.facebook.com/ permalink of the photo",
    true,
  );
  const sourceWidth = readInteger(issues, file, `${label}.sourceWidth`, value.sourceWidth, {
    required: true,
    minimum: 1,
  });
  const sourceHeight = readInteger(issues, file, `${label}.sourceHeight`, value.sourceHeight, {
    required: true,
    minimum: 1,
  });
  const sourceBytes = readInteger(issues, file, `${label}.sourceBytes`, value.sourceBytes, {
    required: true,
    minimum: 1,
  });
  const provenance = readChoice(
    issues,
    file,
    `${label}.provenance`,
    value.provenance,
    SOCIAL_PROVENANCE,
    true,
  );
  const note = readText(issues, file, `${label}.note`, value.note, false);
  const alt = readAlt(issues, file, `${label}.alt`, value.alt);

  if (provenance === "unconfirmed") {
    if (value.src !== null && value.src !== undefined) {
      addIssue(
        issues,
        file,
        `field "${label}.src" must be null because provenance is "unconfirmed"; an unconfirmed still is never rendered as a photograph`,
      );
    }

    if (note === null) {
      addIssue(
        issues,
        file,
        `field "${label}.note" is required when provenance is "unconfirmed"; say why the still is not shown`,
      );
    }

    if (id === null || slot === null || photoId === null || sourceUrl === null) return null;
    if (sourceWidth === null || sourceHeight === null || sourceBytes === null) return null;
    if (alt === null) return null;

    return {
      id,
      slot,
      photoId,
      sourceUrl,
      sourceWidth,
      sourceHeight,
      sourceBytes,
      src: null,
      width: null,
      height: null,
      bytes: null,
      provenance,
      note,
      alt,
    };
  }

  if (provenance === null) return null;

  const src = readPattern(
    issues,
    file,
    `${label}.src`,
    value.src,
    DERIVATIVE_PATH_PATTERN,
    'be a committed WebP file such as "/media/social/name-640.webp"',
    true,
  );
  const width = readInteger(issues, file, `${label}.width`, value.width, {
    required: true,
    minimum: 1,
  });
  const height = readInteger(issues, file, `${label}.height`, value.height, {
    required: true,
    minimum: 1,
  });
  const bytes = readInteger(issues, file, `${label}.bytes`, value.bytes, {
    required: true,
    minimum: 1,
  });

  if (src !== null && width !== null && sourceWidth !== null && width > sourceWidth) {
    addIssue(
      issues,
      file,
      `field "${label}.width" is ${width} but the source is only ${sourceWidth} wide; a derivative is never upscaled beyond the source`,
    );
  }

  if (src !== null && height !== null && sourceHeight !== null && height > sourceHeight) {
    addIssue(
      issues,
      file,
      `field "${label}.height" is ${height} but the source is only ${sourceHeight} high; a derivative is never upscaled beyond the source`,
    );
  }

  if (src !== null) checkDerivative(issues, file, src, projectRoot, bytes);

  if (id === null || slot === null || photoId === null || sourceUrl === null) return null;
  if (sourceWidth === null || sourceHeight === null || sourceBytes === null) return null;
  if (src === null || width === null || height === null || bytes === null) return null;
  if (alt === null) return null;

  return {
    id,
    slot,
    photoId,
    sourceUrl,
    sourceWidth,
    sourceHeight,
    sourceBytes,
    src,
    width,
    height,
    bytes,
    provenance,
    note,
    alt,
  };
}

/** Read and validate the Facebook stills manifest. */
export function loadFacebookMedia(projectRoot: string = process.cwd()): SocialManifest {
  let raw: string;
  try {
    raw = readFileText(projectRoot, FACEBOOK_MEDIA_FILE);
  } catch (error) {
    if (isMissingFileError(error)) return emptyManifest();
    throw error;
  }

  const file = FACEBOOK_MEDIA_FILE;
  const issues: ContentIssue[] = [];

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    addIssue(
      issues,
      file,
      `is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw new ContentError(issues);
  }

  if (!isPlainObject(data)) {
    addIssue(issues, file, "must hold one object with the fields source, retrieved, retrieval and images");
    throw new ContentError(issues);
  }

  rejectUnknownFields(issues, file, data, MANIFEST_FIELDS);

  const source = readText(issues, file, "source", data.source, true);
  const retrieved = readIsoDate(issues, file, "retrieved", data.retrieved, true);
  const retrieval = readText(issues, file, "retrieval", data.retrieval, true);

  const images: SocialImage[] = [];
  const seen = new Set<string>();

  if (data.images === undefined || data.images === null) {
    addIssue(issues, file, 'missing required field "images"; use [] when there are no stills');
  } else if (!Array.isArray(data.images)) {
    addIssue(issues, file, 'field "images" must be a list');
  } else {
    data.images.forEach((entry, index) => {
      const image = readImage(issues, file, projectRoot, entry, index);
      if (image === null) return;

      if (seen.has(image.id)) {
        addIssue(issues, file, `field "images[${index}].id" repeats the id "${image.id}"`);
        return;
      }
      seen.add(image.id);
      images.push(image);
    });
  }

  if (issues.length > 0) throw new ContentError(issues);

  return {
    source: source ?? "",
    retrieved: retrieved ?? "",
    retrieval: retrieval ?? "",
    images,
  };
}

/**
 * What one slot should render. `null` means the manifest holds nothing for the
 * slot, so the caller renders nothing at all.
 */
export function mediaForSlot(
  slot: SocialSlot,
  projectRoot: string = process.cwd(),
): SlotMedia | null {
  const images = loadFacebookMedia(projectRoot).images;
  const image = images.find((entry) => entry.slot === slot);
  if (!image) return null;

  if (image.provenance !== "public-page" || image.src === null) {
    return { kind: "redacted", alt: image.alt };
  }

  return {
    kind: "photo",
    src: image.src,
    width: image.width ?? 0,
    height: image.height ?? 0,
    alt: image.alt,
  };
}

/** Every confirmed still that belongs in the field gallery, in manifest order. */
export function fieldPhotos(projectRoot: string = process.cwd()): PhotoMedia[] {
  return loadFacebookMedia(projectRoot)
    .images.filter((image) => image.slot === "field" && image.provenance === "public-page")
    .map((image) => ({
      kind: "photo" as const,
      src: image.src ?? "",
      width: image.width ?? 0,
      height: image.height ?? 0,
      alt: image.alt,
    }));
}
