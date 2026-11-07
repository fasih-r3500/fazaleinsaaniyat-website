import { readdirSync } from "node:fs";
import { join } from "node:path";
import { ContentError, type ContentIssue } from "./errors";
import { parseMarkdownFile } from "./frontmatter";
import type { Report, ReportLanguage } from "./types";
import {
  addIssue,
  isMissingFileError,
  readBoolean,
  readChoice,
  readIsoDate,
  readInteger,
  readRepoFile,
  readText,
  rejectUnknownFields,
  publicUrlFor,
  REPORT_SLUG_PATTERN,
} from "./validate";

/** Folder that holds one Markdown file per report. */
export const REPORTS_DIRECTORY = "content/reports";

export const REPORT_EXTENSION = ".md";

/** Files whose names start with these characters are ignored by the loader. */
export const IGNORED_REPORT_PREFIXES = ["_", "."] as const;

export const REPORT_LANGUAGES: readonly ReportLanguage[] = ["en", "ur"];

/** Front matter fields a report may use. Unknown fields stop the build. */
export const REPORT_FIELDS = [
  "title",
  "date",
  "place",
  "language",
  "householdsServed",
  "costPkr",
  "dataFile",
  "draft",
] as const;

/**
 * Read every report in `content/reports`, validate it and return the records
 * sorted newest first. Drafts are included; use `getPublishedReports` for the
 * public listing.
 *
 * Any invalid file throws a single ContentError listing every problem. An empty
 * or absent folder returns an empty list.
 */
export function loadReports(projectRoot: string = process.cwd()): Report[] {
  const issues: ContentIssue[] = [];
  const reports: Report[] = [];
  const directory = join(projectRoot, REPORTS_DIRECTORY);

  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    if (isMissingFileError(error)) return [];
    throw error;
  }

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (IGNORED_REPORT_PREFIXES.some((prefix) => entry.name.startsWith(prefix))) {
      continue;
    }

    const sourcePath = `${REPORTS_DIRECTORY}/${entry.name}`;

    if (!entry.isFile()) {
      addIssue(
        issues,
        sourcePath,
        `reports must be Markdown files directly inside ${REPORTS_DIRECTORY}, not folders`,
      );
      continue;
    }

    if (!entry.name.endsWith(REPORT_EXTENSION)) {
      addIssue(issues, sourcePath, `report files must end in ${REPORT_EXTENSION}`);
      continue;
    }

    const slug = entry.name.slice(0, -REPORT_EXTENSION.length);
    if (!REPORT_SLUG_PATTERN.test(slug)) {
      addIssue(
        issues,
        sourcePath,
        `the file name becomes the report slug, so it must use lowercase letters, numbers and single hyphens, for example "2026-01-water-pumps${REPORT_EXTENSION}"`,
      );
      continue;
    }

    const report = loadReport(projectRoot, sourcePath, slug, issues);
    if (report) reports.push(report);
  }

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return sortReports(reports);
}

function loadReport(
  projectRoot: string,
  sourcePath: string,
  slug: string,
  issues: ContentIssue[],
): Report | null {
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
  rejectUnknownFields(issues, sourcePath, data, REPORT_FIELDS);

  const title = readText(issues, sourcePath, "title", data.title, true);
  const date = readIsoDate(issues, sourcePath, "date", data.date, true);
  const place = readText(issues, sourcePath, "place", data.place, true);
  const language = readChoice(
    issues,
    sourcePath,
    "language",
    data.language,
    REPORT_LANGUAGES,
    true,
  );

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
    householdsServed,
    cost:
      costPkr === null
        ? null
        : { amountMinor: costPkr * 100, currency: "PKR" },
    dataFile:
      dataFilePath === null
        ? null
        : { path: dataFilePath, url: publicUrlFor(dataFilePath) },
    draft,
    body,
    sourcePath,
  };
}

/** Sort reports newest first, then by slug so the order is stable. */
export function sortReports(reports: readonly Report[]): Report[] {
  return [...reports].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.slug === b.slug) return 0;
    return a.slug < b.slug ? -1 : 1;
  });
}

/** Every published report, newest first. Drafts are left out. */
export function getPublishedReports(projectRoot: string = process.cwd()): Report[] {
  return loadReports(projectRoot).filter((report) => !report.draft);
}

/** Draft reports for an internal preview. Never list these as published. */
export function getDraftReports(projectRoot: string = process.cwd()): Report[] {
  return loadReports(projectRoot).filter((report) => report.draft);
}

/** The newest published report, or null when nothing is published yet. */
export function getLatestReport(projectRoot: string = process.cwd()): Report | null {
  return getPublishedReports(projectRoot)[0] ?? null;
}

/**
 * One published report by slug, or null. Drafts are not served publicly, so a
 * draft slug returns null here.
 */
export function getReportBySlug(
  slug: string,
  projectRoot: string = process.cwd(),
): Report | null {
  return getPublishedReports(projectRoot).find((report) => report.slug === slug) ?? null;
}

/**
 * Slugs of every report, drafts included. Used to check cross references from
 * the ledger and figures stores. Returns null when the reports themselves are
 * invalid, because those problems are reported separately.
 */
export function knownReportSlugs(projectRoot: string = process.cwd()): Set<string> | null {
  try {
    return new Set(loadReports(projectRoot).map((report) => report.slug));
  } catch (error) {
    if (error instanceof ContentError) return null;
    throw error;
  }
}
