import { readdirSync } from "node:fs";
import { join } from "node:path";
import { ContentError, type ContentIssue } from "./errors";
import { parseMarkdownFile } from "./frontmatter";
import type {
  Initiative,
  InitiativePhoto,
  InitiativeStat,
  InitiativeStatus,
} from "./types";
import {
  addIssue,
  describeValue,
  isMissingFileError,
  isPlainObject,
  readBoolean,
  readChoice,
  readInteger,
  readMonthOrDate,
  readRepoFile,
  readText,
  readTextList,
  rejectUnknownFields,
  publicUrlFor,
  FIELD_TRIP_SLUG_PATTERN,
} from "./validate";

/** Folder that holds one Markdown file per initiative. */
export const INITIATIVES_DIRECTORY = "content/initiatives";

export const INITIATIVE_EXTENSION = ".md";

/** Files whose names start with these characters are ignored by the loader. */
export const IGNORED_INITIATIVE_PREFIXES = ["_", "."] as const;

export const INITIATIVE_STATUSES: readonly InitiativeStatus[] = [
  "active",
  "paused",
  "completed",
];

/**
 * Initiative files are written in English. The copy inside a file is shown as
 * written in both language trees, with `lang` and `dir` set from here so an
 * English entry sits correctly inside the Urdu page. Translations are a later
 * content change, following the site's Urdu review convention.
 */
export const INITIATIVE_CONTENT_LANGUAGE: "en" | "ur" = "en";

/** Front matter fields an initiative may use. Unknown fields stop the build. */
export const INITIATIVE_FIELDS = [
  "title",
  "summary",
  "status",
  "category",
  "locations",
  "startDate",
  "endDate",
  "peopleServed",
  "householdsServed",
  "costPkr",
  "costCovers",
  "partners",
  "photos",
  "stats",
  "draft",
] as const;

const PHOTO_FIELDS = ["src", "alt"] as const;
const STAT_FIELDS = ["label", "value"] as const;

/** A value that reads as a plain number, shown in the tabular figure style. */
const NUMERIC_VALUE_PATTERN = /^[0-9][0-9,.]*$/;

/**
 * Read every initiative in `content/initiatives`, validate it and return the
 * records sorted for the public listing. Drafts are included; use
 * `getPublishedInitiatives` for the public listing.
 *
 * Any invalid file throws a single ContentError listing every problem. An empty
 * or absent folder returns an empty list.
 */
export function loadInitiatives(projectRoot: string = process.cwd()): Initiative[] {
  const issues: ContentIssue[] = [];
  const initiatives: Initiative[] = [];
  const directory = join(projectRoot, INITIATIVES_DIRECTORY);

  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    if (isMissingFileError(error)) return [];
    throw error;
  }

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (IGNORED_INITIATIVE_PREFIXES.some((prefix) => entry.name.startsWith(prefix))) {
      continue;
    }

    const sourcePath = `${INITIATIVES_DIRECTORY}/${entry.name}`;

    if (!entry.isFile()) {
      addIssue(
        issues,
        sourcePath,
        `initiatives must be Markdown files directly inside ${INITIATIVES_DIRECTORY}, not folders`,
      );
      continue;
    }

    if (!entry.name.endsWith(INITIATIVE_EXTENSION)) {
      addIssue(
        issues,
        sourcePath,
        `initiative files must end in ${INITIATIVE_EXTENSION}`,
      );
      continue;
    }

    const slug = entry.name.slice(0, -INITIATIVE_EXTENSION.length);
    if (!FIELD_TRIP_SLUG_PATTERN.test(slug)) {
      addIssue(
        issues,
        sourcePath,
        `the file name becomes the initiative slug, so it must use lowercase letters, numbers and single hyphens, for example "water-pumps${INITIATIVE_EXTENSION}"`,
      );
      continue;
    }

    const initiative = loadInitiative(projectRoot, sourcePath, slug, issues);
    if (initiative) initiatives.push(initiative);
  }

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return sortInitiatives(initiatives);
}

function loadInitiative(
  projectRoot: string,
  sourcePath: string,
  slug: string,
  issues: ContentIssue[],
): Initiative | null {
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
  rejectUnknownFields(issues, sourcePath, data, INITIATIVE_FIELDS);

  const title = readText(issues, sourcePath, "title", data.title, true);
  const summary = readText(issues, sourcePath, "summary", data.summary, true);
  const status = readChoice(
    issues,
    sourcePath,
    "status",
    data.status,
    INITIATIVE_STATUSES,
    true,
  );
  const category = readText(issues, sourcePath, "category", data.category, true);

  const locations = readTextList(issues, sourcePath, "locations", data.locations);
  const peopleServed = readTextList(
    issues,
    sourcePath,
    "peopleServed",
    data.peopleServed,
  );
  const partners = readTextList(issues, sourcePath, "partners", data.partners);

  const startDate = readMonthOrDate(
    issues,
    sourcePath,
    "startDate",
    data.startDate,
  );
  const endDate = readMonthOrDate(issues, sourcePath, "endDate", data.endDate);

  if (data.endDate !== undefined && data.endDate !== null && startDate === null) {
    addIssue(
      issues,
      sourcePath,
      `field "endDate" needs a start date; add "startDate" or remove "endDate"`,
    );
  }

  if (startDate !== null && endDate !== null) {
    // Compare by month so a month only end date is not treated as earlier than
    // a day precision start date in the same month.
    if (endDate.slice(0, 7) < startDate.slice(0, 7)) {
      addIssue(
        issues,
        sourcePath,
        `field "endDate" is ${endDate}, which is before "startDate" ${startDate}`,
      );
    }
  }

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

  const costCovers = readText(
    issues,
    sourcePath,
    "costCovers",
    data.costCovers,
    false,
  );

  if (costCovers !== null && data.costPkr === undefined) {
    addIssue(
      issues,
      sourcePath,
      `field "costCovers" says what the cost paid for, so "costPkr" is needed too; add "costPkr" or remove "costCovers"`,
    );
  }

  const photos = readPhotos(issues, sourcePath, data.photos, projectRoot);
  const stats = readStats(issues, sourcePath, data.stats);

  const draft =
    readBoolean(issues, sourcePath, "draft", data.draft, false) ?? false;

  if (issues.length > before) return null;
  if (title === null || summary === null || status === null || category === null) {
    return null;
  }

  return {
    slug,
    title,
    summary,
    status,
    category,
    locations,
    startDate,
    endDate,
    peopleServed,
    householdsServed,
    cost: costPkr === null ? null : { amountMinor: costPkr * 100, currency: "PKR" },
    costCovers,
    partners,
    photos,
    stats,
    draft,
    body,
    sourcePath,
  };
}

/**
 * Read the photo list. Each photo needs a repository path under `public/` and a
 * text alternative, so no image reaches the page undescribed.
 */
function readPhotos(
  issues: ContentIssue[],
  file: string,
  value: unknown,
  projectRoot: string,
): InitiativePhoto[] {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    addIssue(
      issues,
      file,
      `field "photos" must be a list; write each photo on its own lines starting with "- ", then "src:" and "alt:"`,
    );
    return [];
  }

  const photos: InitiativePhoto[] = [];

  value.forEach((item, index) => {
    const position = index + 1;

    if (!isPlainObject(item)) {
      addIssue(
        issues,
        file,
        `field "photos" item ${position} must be a photo with "src" and "alt", found ${describeValue(item)}`,
      );
      return;
    }

    rejectUnknownFields(issues, file, item, PHOTO_FIELDS, `photos item ${position} `);

    const src = readText(issues, file, `photos item ${position} src`, item.src, true);
    const alt = readText(issues, file, `photos item ${position} alt`, item.alt, true);

    if (src === null) return;

    const path = readRepoFile(
      issues,
      file,
      `photos item ${position} src`,
      src,
      projectRoot,
      { requirePublic: true },
    );

    if (path === null || alt === null) return;

    photos.push({ path, url: publicUrlFor(path), alt });
  });

  return photos;
}

/**
 * Read the stat tiles. A stat is a label and a value. The value may be a number
 * or text, so one initiative can show "20" and another "Since 2019" without a
 * schema change.
 */
function readStats(
  issues: ContentIssue[],
  file: string,
  value: unknown,
): InitiativeStat[] {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    addIssue(
      issues,
      file,
      `field "stats" must be a list; write each stat on its own lines starting with "- ", then "label:" and "value:"`,
    );
    return [];
  }

  const stats: InitiativeStat[] = [];

  value.forEach((item, index) => {
    const position = index + 1;

    if (!isPlainObject(item)) {
      addIssue(
        issues,
        file,
        `field "stats" item ${position} must be a stat with "label" and "value", found ${describeValue(item)}`,
      );
      return;
    }

    rejectUnknownFields(issues, file, item, STAT_FIELDS, `stats item ${position} `);

    const label = readText(issues, file, `stats item ${position} label`, item.label, true);
    const raw = item.value;
    let text: string | null = null;

    if (typeof raw === "string" && raw.trim() !== "") {
      text = raw.trim();
    } else if (typeof raw === "number" && Number.isFinite(raw)) {
      text = String(raw);
    } else {
      addIssue(
        issues,
        file,
        `field "stats item ${position} value" must be text or a number, found ${describeValue(raw)}`,
      );
    }

    if (label === null || text === null) return;

    stats.push({ label, value: text, numeric: NUMERIC_VALUE_PATTERN.test(text) });
  });

  return stats;
}

const STATUS_ORDER: Record<InitiativeStatus, number> = {
  active: 0,
  paused: 1,
  completed: 2,
};

/**
 * Sort the listing: work that is still running first, then paused, then
 * completed. Within a status, entries with a start date come first and newest
 * first, so recent work leads. The title breaks any remaining tie, which keeps
 * the order stable between builds.
 */
export function sortInitiatives(initiatives: readonly Initiative[]): Initiative[] {
  return [...initiatives].sort((a, b) => {
    if (a.status !== b.status) {
      return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    }

    if (a.startDate !== b.startDate) {
      if (a.startDate === null) return 1;
      if (b.startDate === null) return -1;
      return a.startDate < b.startDate ? 1 : -1;
    }

    if (a.title === b.title) return 0;
    return a.title < b.title ? -1 : 1;
  });
}

/** Every published initiative, in listing order. Drafts are left out. */
export function getPublishedInitiatives(
  projectRoot: string = process.cwd(),
): Initiative[] {
  return loadInitiatives(projectRoot).filter((initiative) => !initiative.draft);
}

/** Draft initiatives for an internal preview. Never list these as published. */
export function getDraftInitiatives(
  projectRoot: string = process.cwd(),
): Initiative[] {
  return loadInitiatives(projectRoot).filter((initiative) => initiative.draft);
}

/**
 * One published initiative by slug, or null. Drafts are not served publicly, so
 * a draft slug returns null here.
 */
export function getInitiativeBySlug(
  slug: string,
  projectRoot: string = process.cwd(),
): Initiative | null {
  return (
    getPublishedInitiatives(projectRoot).find(
      (initiative) => initiative.slug === slug,
    ) ?? null
  );
}
