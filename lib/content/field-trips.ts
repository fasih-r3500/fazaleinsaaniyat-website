import { readdirSync } from "node:fs";
import { join } from "node:path";
import { ContentError, type ContentIssue } from "./errors";
import { parseMarkdownFile } from "./frontmatter";
import type {
  FieldTrip,
  FieldTripLanguage,
  FieldTripPhoto,
  FieldTripStat,
} from "./types";
import {
  addIssue,
  FIELD_TRIP_SLUG_PATTERN,
  isMissingFileError,
  isPlainObject,
  publicUrlFor,
  readBoolean,
  readChoice,
  readInteger,
  readIsoDate,
  readRepoFile,
  readText,
  readTextList,
  rejectUnknownFields,
} from "./validate";

/** Folder that holds one Markdown file per field trip. */
export const FIELD_TRIPS_DIRECTORY = "content/field-trips";

export const FIELD_TRIP_EXTENSION = ".md";

/** Files whose names start with these characters are ignored by the loader. */
export const IGNORED_FIELD_TRIP_PREFIXES = ["_", "."] as const;

export const FIELD_TRIP_LANGUAGES: readonly FieldTripLanguage[] = ["en", "ur"];

/** Front matter fields a field trip may use. Unknown fields stop the build. */
export const FIELD_TRIP_FIELDS = [
  "title",
  "date",
  "place",
  "language",
  "organiser",
  "peopleMet",
  "partners",
  "householdsServed",
  "costPkr",
  "dataFile",
  "photos",
  "stats",
  "draft",
] as const;

const PHOTO_FIELDS = ["path", "caption"] as const;
const STAT_FIELDS = ["label", "value"] as const;

/**
 * Read every field trip in `content/field-trips`, validate it and return the
 * records sorted newest first. Drafts are included; use
 * `getPublishedFieldTrips` for the public listing.
 *
 * Any invalid file throws a single ContentError listing every problem. An empty
 * or absent folder returns an empty list.
 */
export function loadFieldTrips(projectRoot: string = process.cwd()): FieldTrip[] {
  const issues: ContentIssue[] = [];
  const fieldTrips: FieldTrip[] = [];
  const directory = join(projectRoot, FIELD_TRIPS_DIRECTORY);

  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    if (isMissingFileError(error)) return [];
    throw error;
  }

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (
      IGNORED_FIELD_TRIP_PREFIXES.some((prefix) => entry.name.startsWith(prefix))
    ) {
      continue;
    }

    const sourcePath = `${FIELD_TRIPS_DIRECTORY}/${entry.name}`;

    if (!entry.isFile()) {
      addIssue(
        issues,
        sourcePath,
        `field trips must be Markdown files directly inside ${FIELD_TRIPS_DIRECTORY}, not folders`,
      );
      continue;
    }

    if (!entry.name.endsWith(FIELD_TRIP_EXTENSION)) {
      addIssue(
        issues,
        sourcePath,
        `field trip files must end in ${FIELD_TRIP_EXTENSION}`,
      );
      continue;
    }

    const slug = entry.name.slice(0, -FIELD_TRIP_EXTENSION.length);
    if (!FIELD_TRIP_SLUG_PATTERN.test(slug)) {
      addIssue(
        issues,
        sourcePath,
        `the file name becomes the field trip slug, so it must use lowercase letters, numbers and single hyphens, for example "2026-01-water-pumps${FIELD_TRIP_EXTENSION}"`,
      );
      continue;
    }

    const fieldTrip = loadFieldTrip(projectRoot, sourcePath, slug, issues);
    if (fieldTrip) fieldTrips.push(fieldTrip);
  }

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return sortFieldTrips(fieldTrips);
}

function loadFieldTrip(
  projectRoot: string,
  sourcePath: string,
  slug: string,
  issues: ContentIssue[],
): FieldTrip | null {
  const before = issues.length;
  let parsed;

  try {
    parsed = parseMarkdownFile(projectRoot, sourcePath);
  } catch (error) {
    if (error instanceof ContentError) {
      issues.push(...error.issues);
      return null;
    }
    throw error;
  }

  const { data, body } = parsed;
  rejectUnknownFields(issues, sourcePath, data, FIELD_TRIP_FIELDS);

  const title = readText(issues, sourcePath, "title", data.title, true);
  const date = readIsoDate(issues, sourcePath, "date", data.date, true);
  const place = readText(issues, sourcePath, "place", data.place, true);
  const language = readChoice(
    issues,
    sourcePath,
    "language",
    data.language,
    FIELD_TRIP_LANGUAGES,
    true,
  );

  const organiser = readText(
    issues,
    sourcePath,
    "organiser",
    data.organiser,
    false,
  );

  const peopleMet = readTextList(
    issues,
    sourcePath,
    "peopleMet",
    data.peopleMet,
  );
  const partners = readTextList(issues, sourcePath, "partners", data.partners);

  const householdsServed = readInteger(
    issues,
    sourcePath,
    "householdsServed",
    data.householdsServed,
    { required: false, minimum: 0 },
  );

  const costPkr = readInteger(issues, sourcePath, "costPkr", data.costPkr, {
    required: false,
    minimum: 0,
  });

  const draft = readBoolean(issues, sourcePath, "draft", data.draft, false) ?? false;

  const dataFileValue = readText(
    issues,
    sourcePath,
    "dataFile",
    data.dataFile,
    false,
  );

  const dataFilePath = dataFileValue
    ? readRepoFile(issues, sourcePath, "dataFile", dataFileValue, projectRoot, {
        requirePublic: true,
      })
    : null;

  const photos = readPhotos(issues, sourcePath, data.photos, projectRoot);
  const stats = readStats(issues, sourcePath, data.stats);

  if (issues.length > before) return null;
  if (title === null || date === null || place === null || language === null) {
    return null;
  }

  return {
    slug,
    title,
    date,
    place,
    language,
    organiser,
    peopleMet: peopleMet ?? [],
    partners: partners ?? [],
    householdsServed,
    cost:
      costPkr === null
        ? null
        : { amountMinor: costPkr * 100, currency: "PKR" },
    dataFile:
      dataFilePath === null
        ? null
        : { path: dataFilePath, url: publicUrlFor(dataFilePath) },
    photos,
    stats,
    draft,
    body,
    sourcePath,
  };
}

/**
 * Read the optional `photos` list. Each photo is an object with a `path` under
 * `public/` and an optional caption. A missing list is an empty list.
 */
function readPhotos(
  issues: ContentIssue[],
  file: string,
  value: unknown,
  projectRoot: string,
): FieldTripPhoto[] {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    addIssue(
      issues,
      file,
      `field "photos" must be a list; write each photo on its own line starting with "- "`,
    );
    return [];
  }

  const photos: FieldTripPhoto[] = [];
  const before = issues.length;

  value.forEach((raw, index) => {
    const field = `photos[${index}]`;

    if (!isPlainObject(raw)) {
      addIssue(
        issues,
        file,
        `field "${field}" must hold a path and an optional caption`,
      );
      return;
    }

    rejectUnknownFields(issues, file, raw, PHOTO_FIELDS, `${field}.`);

    const path = readText(issues, file, `${field}.path`, raw.path, true);
    const caption = readText(
      issues,
      file,
      `${field}.caption`,
      raw.caption,
      false,
    );

    if (path === null) return;

    const checkedPath = readRepoFile(
      issues,
      file,
      `${field}.path`,
      path,
      projectRoot,
      { requirePublic: true },
    );

    if (checkedPath === null) return;

    photos.push({
      path: checkedPath,
      url: publicUrlFor(checkedPath),
      caption,
    });
  });

  return issues.length > before ? [] : photos;
}

/**
 * Read the optional `stats` list. Each stat needs a label and a value. A value
 * may be text or a number, so a trip can record "about 40" as easily as 40.
 */
function readStats(
  issues: ContentIssue[],
  file: string,
  value: unknown,
): FieldTripStat[] {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    addIssue(
      issues,
      file,
      `field "stats" must be a list; write each figure on its own line starting with "- "`,
    );
    return [];
  }

  const stats: FieldTripStat[] = [];
  const before = issues.length;

  value.forEach((raw, index) => {
    const field = `stats[${index}]`;

    if (!isPlainObject(raw)) {
      addIssue(
        issues,
        file,
        `field "${field}" must hold a label and a value`,
      );
      return;
    }

    rejectUnknownFields(issues, file, raw, STAT_FIELDS, `${field}.`);

    const label = readText(issues, file, `${field}.label`, raw.label, true);
    const statValue = readStatValue(issues, file, `${field}.value`, raw.value);

    if (label === null || statValue === null) return;

    stats.push({ label, value: statValue });
  });

  return issues.length > before ? [] : stats;
}

function readStatValue(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
): string | null {
  if (value === undefined || value === null) {
    addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      addIssue(
        issues,
        file,
        `field "${field}" must be a real number or text, found ${value}`,
      );
      return null;
    }
    return String(value);
  }

  if (typeof value !== "string") {
    addIssue(
      issues,
      file,
      `field "${field}" must be text or a number, found ${typeof value}`,
    );
    return null;
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    addIssue(issues, file, `field "${field}" must not be empty`);
    return null;
  }

  return trimmed;
}

/** Sort field trips newest first, then by slug so the order is stable. */
export function sortFieldTrips(fieldTrips: readonly FieldTrip[]): FieldTrip[] {
  return [...fieldTrips].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.slug === b.slug) return 0;
    return a.slug < b.slug ? -1 : 1;
  });
}

/** Every published field trip, newest first. Drafts are left out. */
export function getPublishedFieldTrips(
  projectRoot: string = process.cwd(),
): FieldTrip[] {
  return loadFieldTrips(projectRoot).filter((fieldTrip) => !fieldTrip.draft);
}

/** Draft field trips for an internal preview. Never list these as published. */
export function getDraftFieldTrips(
  projectRoot: string = process.cwd(),
): FieldTrip[] {
  return loadFieldTrips(projectRoot).filter((fieldTrip) => fieldTrip.draft);
}

/** The newest published field trip, or null when nothing is published yet. */
export function getLatestFieldTrip(
  projectRoot: string = process.cwd(),
): FieldTrip | null {
  return getPublishedFieldTrips(projectRoot)[0] ?? null;
}

/**
 * One published field trip by slug, or null. Drafts are not served publicly, so
 * a draft slug returns null here.
 */
export function getFieldTripBySlug(
  slug: string,
  projectRoot: string = process.cwd(),
): FieldTrip | null {
  return (
    getPublishedFieldTrips(projectRoot).find(
      (fieldTrip) => fieldTrip.slug === slug,
    ) ?? null
  );
}

/**
 * Slugs of every field trip, drafts included. Used to check cross references
 * from the ledger and figures stores. Returns null when the field trips
 * themselves are invalid, because those problems are reported separately.
 */
export function knownFieldTripSlugs(
  projectRoot: string = process.cwd(),
): Set<string> | null {
  try {
    return new Set(loadFieldTrips(projectRoot).map((fieldTrip) => fieldTrip.slug));
  } catch (error) {
    if (error instanceof ContentError) return null;
    throw error;
  }
}
