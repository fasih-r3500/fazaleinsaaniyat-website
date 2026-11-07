import { readFileSync, statSync } from "node:fs";
import { join, normalize, sep } from "node:path";
import type { ContentIssue } from "./errors";

/**
 * Small validation helpers shared by the report and facts loaders. Each helper
 * adds one plain sentence to the issue list and returns `null` when the value is
 * unusable, so a caller can report several problems in one pass.
 */

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const REPORT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RECORD_ID_PATTERN = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
export const CURRENCY_PATTERN = /^[A-Z]{3}$/;

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function describeValue(value: unknown): string {
  if (value === null) return "an empty value";
  if (Array.isArray(value)) return "a list";
  switch (typeof value) {
    case "string":
      return `the text "${value}"`;
    case "number":
      return `the number ${value}`;
    case "boolean":
      return `the value ${value}`;
    case "undefined":
      return "nothing";
    default:
      return `a ${typeof value}`;
  }
}

export function addIssue(issues: ContentIssue[], file: string, message: string): void {
  issues.push({ file, message });
}

export function rejectUnknownFields(
  issues: ContentIssue[],
  file: string,
  data: Record<string, unknown>,
  allowed: readonly string[],
  prefix = "",
): void {
  for (const key of Object.keys(data)) {
    if (allowed.includes(key)) continue;
    addIssue(
      issues,
      file,
      `unknown field "${prefix}${key}"; allowed fields are ${allowed.join(", ")}`,
    );
  }
}

export function readText(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  required: boolean,
): string | null {
  if (value === undefined || value === null) {
    if (required) addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  if (typeof value !== "string") {
    addIssue(
      issues,
      file,
      `field "${field}" must be text, found ${describeValue(value)}; put quotes around text values`,
    );
    return null;
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    if (required) addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  return trimmed;
}

export function readInteger(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  options: { required: boolean; minimum: number },
): number | null {
  if (value === undefined || value === null) {
    if (options.required) addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  if (typeof value !== "number" || !Number.isInteger(value)) {
    addIssue(
      issues,
      file,
      `field "${field}" must be a whole number, found ${describeValue(value)}; write it without quotes and without a decimal point`,
    );
    return null;
  }

  if (value < options.minimum) {
    addIssue(
      issues,
      file,
      `field "${field}" must be ${options.minimum} or more, found ${value}`,
    );
    return null;
  }

  return value;
}

export function readNumber(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  options: { required: boolean; minimum: number },
): number | null {
  if (value === undefined || value === null) {
    if (options.required) addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    addIssue(
      issues,
      file,
      `field "${field}" must be a number, found ${describeValue(value)}; write it without quotes`,
    );
    return null;
  }

  if (value < options.minimum) {
    addIssue(
      issues,
      file,
      `field "${field}" must be ${options.minimum} or more, found ${value}`,
    );
    return null;
  }

  return value;
}

export function readBoolean(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  required: boolean,
): boolean | null {
  if (value === undefined || value === null) {
    if (required) addIssue(issues, file, `missing required field "${field}"`);
    return null;
  }

  if (typeof value !== "boolean") {
    addIssue(
      issues,
      file,
      `field "${field}" must be true or false, found ${describeValue(value)}`,
    );
    return null;
  }

  return value;
}

export function readIsoDate(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  required: boolean,
): string | null {
  const text = readText(issues, file, field, value, required);
  if (text === null) return null;

  if (!ISO_DATE_PATTERN.test(text) || !isRealCalendarDate(text)) {
    addIssue(
      issues,
      file,
      `field "${field}" must be a real date written as YYYY-MM-DD, found "${text}"`,
    );
    return null;
  }

  return text;
}

export function readChoice<T extends string>(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  allowed: readonly T[],
  required: boolean,
): T | null {
  const text = readText(issues, file, field, value, required);
  if (text === null) return null;

  if (!allowed.includes(text as T)) {
    const choices = allowed.map((choice) => `"${choice}"`).join(" or ");
    addIssue(issues, file, `field "${field}" must be ${choices}, found "${text}"`);
    return null;
  }

  return text as T;
}

export function readPattern(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
  pattern: RegExp,
  expectation: string,
  required: boolean,
): string | null {
  const text = readText(issues, file, field, value, required);
  if (text === null) return null;

  if (!pattern.test(text)) {
    addIssue(issues, file, `field "${field}" must ${expectation}, found "${text}"`);
    return null;
  }

  return text;
}

export function isRealCalendarDate(value: string): boolean {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isMissingFileError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

/**
 * Resolve a repository relative path that a record points at, and check that the
 * file exists. Paths are never followed outside the repository.
 *
 * `requirePublic` is used for report data files: those are linked from the site,
 * so the file must sit under `public/`.
 */
export function readRepoFile(
  issues: ContentIssue[],
  file: string,
  field: string,
  relativePath: string,
  projectRoot: string,
  options: { requirePublic: boolean },
): string | null {
  if (relativePath.startsWith("/") || relativePath.includes("\\")) {
    addIssue(
      issues,
      file,
      `field "${field}" must be a path relative to the repository root with forward slashes, found "${relativePath}"`,
    );
    return null;
  }

  const normalised = normalize(relativePath).split(sep).join("/");
  if (normalised === ".." || normalised.startsWith("../")) {
    addIssue(
      issues,
      file,
      `field "${field}" must stay inside the repository, found "${relativePath}"`,
    );
    return null;
  }

  if (options.requirePublic && !normalised.startsWith("public/")) {
    addIssue(
      issues,
      file,
      `field "${field}" must point inside public/ so the file can be linked, for example "public/data/reports/name.csv", found "${relativePath}"`,
    );
    return null;
  }

  let stats;
  try {
    stats = statSync(join(projectRoot, normalised));
  } catch (error) {
    if (isMissingFileError(error)) {
      addIssue(
        issues,
        file,
        `field "${field}" points at "${normalised}" but that file does not exist`,
      );
      return null;
    }
    throw error;
  }

  if (!stats.isFile()) {
    addIssue(issues, file, `field "${field}" points at "${normalised}" but that is not a file`);
    return null;
  }

  return normalised;
}

export function publicUrlFor(relativePath: string): string {
  return `/${relativePath.replace(/^public\//, "")}`;
}

export function readFileText(projectRoot: string, relativePath: string): string {
  return readFileSync(join(projectRoot, relativePath), "utf8");
}
