import { ContentError, type ContentIssue } from "./errors";
import { knownFieldTripSlugs } from "./field-trips";
import type {
  LedgerEntry,
  LedgerKind,
  LedgerTotal,
  LocalizedText,
  PublishedFigure,
} from "./types";
import {
  addIssue,
  CURRENCY_PATTERN,
  isMissingFileError,
  isPlainObject,
  readChoice,
  readFileText,
  readIsoDate,
  readInteger,
  readNumber,
  readPattern,
  readRepoFile,
  readText,
  rejectUnknownFields,
  RECORD_ID_PATTERN,
} from "./validate";

/** Folder that holds the structured stores. */
export const FACTS_DIRECTORY = "content/facts";

export const LEDGER_FILE = `${FACTS_DIRECTORY}/ledger.json`;
export const FIGURES_FILE = `${FACTS_DIRECTORY}/figures.json`;

export const LEDGER_KINDS: readonly LedgerKind[] = ["income", "expenditure"];

const LEDGER_FIELDS = [
  "id",
  "date",
  "kind",
  "category",
  "description",
  "amountMinor",
  "currency",
  "project",
  "fieldTripSlug",
  "receipt",
] as const;

const FIGURE_FIELDS = ["id", "label", "value", "unit", "asOf", "fieldTripSlug"] as const;

const LABEL_FIELDS = ["en", "ur"] as const;

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

function readRootList(
  file: JsonFile,
  relativePath: string,
  key: string,
  issues: ContentIssue[],
): unknown[] {
  if (file.state === "missing") return [];

  if (file.state === "invalid") {
    throw new ContentError(issues);
  }

  if (!isPlainObject(file.value)) {
    addIssue(
      issues,
      relativePath,
      `file must contain one JSON object with a "${key}" list`,
    );
    throw new ContentError(issues);
  }

  rejectUnknownFields(issues, relativePath, file.value, [key]);

  const list = file.value[key];
  if (!Array.isArray(list)) {
    addIssue(
      issues,
      relativePath,
      `missing required field "${key}"; it must be a list, and an empty store is "${key}": []`,
    );
    throw new ContentError(issues);
  }

  return list;
}

/**
 * Read `content/facts/ledger.json`, validate every entry and return the entries
 * newest first. A missing file means the store is empty.
 */
export function loadLedger(projectRoot: string = process.cwd()): LedgerEntry[] {
  const issues: ContentIssue[] = [];
  const file = readJsonFile(projectRoot, LEDGER_FILE, issues);
  const list = readRootList(file, LEDGER_FILE, "entries", issues);
  const knownSlugs = knownFieldTripSlugs(projectRoot);
  const entries: LedgerEntry[] = [];
  const seenIds = new Map<string, number>();

  list.forEach((raw, index) => {
    const before = issues.length;

    if (!isPlainObject(raw)) {
      addIssue(issues, LEDGER_FILE, `entries[${index}] must be a JSON object`);
      return;
    }

    const prefix = `entries[${index}].`;
    rejectUnknownFields(issues, LEDGER_FILE, raw, LEDGER_FIELDS, prefix);

    const id = readPattern(
      issues,
      LEDGER_FILE,
      `${prefix}id`,
      raw.id,
      RECORD_ID_PATTERN,
      "use letters, numbers and single hyphens",
      true,
    );
    const date = readIsoDate(issues, LEDGER_FILE, `${prefix}date`, raw.date, true);
    const kind = readChoice(
      issues,
      LEDGER_FILE,
      `${prefix}kind`,
      raw.kind,
      LEDGER_KINDS,
      true,
    );
    const category = readText(
      issues,
      LEDGER_FILE,
      `${prefix}category`,
      raw.category,
      true,
    );
    const description = readText(
      issues,
      LEDGER_FILE,
      `${prefix}description`,
      raw.description,
      true,
    );
    const amountMinor = readInteger(
      issues,
      LEDGER_FILE,
      `${prefix}amountMinor`,
      raw.amountMinor,
      { required: true, minimum: 1 },
    );
    const currency = readPattern(
      issues,
      LEDGER_FILE,
      `${prefix}currency`,
      raw.currency,
      CURRENCY_PATTERN,
      'be a three letter uppercase currency code such as "PKR"',
      true,
    );
    const project = readText(
      issues,
      LEDGER_FILE,
      `${prefix}project`,
      raw.project,
      false,
    );
    const fieldTripSlug = readText(
      issues,
      LEDGER_FILE,
      `${prefix}fieldTripSlug`,
      raw.fieldTripSlug,
      false,
    );
    const receiptValue = readText(
      issues,
      LEDGER_FILE,
      `${prefix}receipt`,
      raw.receipt,
      false,
    );
    const receiptPath = receiptValue
      ? readRepoFile(
          issues,
          LEDGER_FILE,
          `${prefix}receipt`,
          receiptValue,
          projectRoot,
          { requirePublic: false },
        )
      : null;

    if (fieldTripSlug && knownSlugs && !knownSlugs.has(fieldTripSlug)) {
      addIssue(
        issues,
        LEDGER_FILE,
        `${prefix}fieldTripSlug points at "${fieldTripSlug}" but no field trip with that file name exists in content/field-trips`,
      );
    }

    if (id) {
      const firstIndex = seenIds.get(id);
      if (firstIndex !== undefined) {
        addIssue(
          issues,
          LEDGER_FILE,
          `${prefix}id repeats "${id}" from entries[${firstIndex}]; every ledger entry needs its own id`,
        );
      } else {
        seenIds.set(id, index);
      }
    }

    if (issues.length > before) return;
    if (
      id === null ||
      date === null ||
      kind === null ||
      category === null ||
      description === null ||
      amountMinor === null ||
      currency === null
    ) {
      return;
    }

    entries.push({
      id,
      date,
      kind,
      category,
      description,
      amountMinor,
      currency,
      project,
      fieldTripSlug,
      receiptPath,
    });
  });

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return sortLedger(entries);
}

/**
 * Read `content/facts/figures.json`, validate every figure and return the
 * figures newest first. A missing file means the store is empty.
 */
export function loadFigures(projectRoot: string = process.cwd()): PublishedFigure[] {
  const issues: ContentIssue[] = [];
  const file = readJsonFile(projectRoot, FIGURES_FILE, issues);
  const list = readRootList(file, FIGURES_FILE, "figures", issues);
  const knownSlugs = knownFieldTripSlugs(projectRoot);
  const figures: PublishedFigure[] = [];
  const seenIds = new Map<string, number>();

  list.forEach((raw, index) => {
    const before = issues.length;
    const prefix = `figures[${index}].`;

    if (!isPlainObject(raw)) {
      addIssue(issues, FIGURES_FILE, `figures[${index}] must be a JSON object`);
      return;
    }

    rejectUnknownFields(issues, FIGURES_FILE, raw, FIGURE_FIELDS, prefix);

    const id = readPattern(
      issues,
      FIGURES_FILE,
      `${prefix}id`,
      raw.id,
      RECORD_ID_PATTERN,
      "use letters, numbers and single hyphens",
      true,
    );
    const label = readLocalizedText(
      issues,
      FIGURES_FILE,
      `${prefix}label`,
      raw.label,
    );
    const value = readNumber(issues, FIGURES_FILE, `${prefix}value`, raw.value, {
      required: true,
      minimum: 0,
    });
    const unit = readText(issues, FIGURES_FILE, `${prefix}unit`, raw.unit, true);
    const asOf = readIsoDate(
      issues,
      FIGURES_FILE,
      `${prefix}asOf`,
      raw.asOf,
      true,
    );
    const fieldTripSlug = readText(
      issues,
      FIGURES_FILE,
      `${prefix}fieldTripSlug`,
      raw.fieldTripSlug,
      false,
    );

    if (fieldTripSlug && knownSlugs && !knownSlugs.has(fieldTripSlug)) {
      addIssue(
        issues,
        FIGURES_FILE,
        `${prefix}fieldTripSlug points at "${fieldTripSlug}" but no field trip with that file name exists in content/field-trips`,
      );
    }

    if (id) {
      const firstIndex = seenIds.get(id);
      if (firstIndex !== undefined) {
        addIssue(
          issues,
          FIGURES_FILE,
          `${prefix}id repeats "${id}" from figures[${firstIndex}]; every figure needs its own id`,
        );
      } else {
        seenIds.set(id, index);
      }
    }

    if (issues.length > before) return;
    if (
      id === null ||
      label === null ||
      value === null ||
      unit === null ||
      asOf === null
    ) {
      return;
    }

    figures.push({ id, label, value, unit, asOf, fieldTripSlug });
  });

  if (issues.length > 0) {
    throw new ContentError(issues);
  }

  return sortFigures(figures);
}

function readLocalizedText(
  issues: ContentIssue[],
  file: string,
  field: string,
  value: unknown,
): LocalizedText | null {
  if (!isPlainObject(value)) {
    addIssue(
      issues,
      file,
      `field "${field}" must be a JSON object with an "en" line and an optional "ur" line, for example { "en": "Madrasahs", "ur": null }`,
    );
    return null;
  }

  rejectUnknownFields(issues, file, value, LABEL_FIELDS, `${field}.`);

  const en = readText(issues, file, `${field}.en`, value.en, true);
  const ur = readText(issues, file, `${field}.ur`, value.ur, false);

  if (en === null) return null;

  return { en, ur };
}

/** Ledger entries newest first, then by id so the order is stable. */
export function sortLedger(entries: readonly LedgerEntry[]): LedgerEntry[] {
  return [...entries].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
  });
}

/** Figures newest first, then by id so the order is stable. */
export function sortFigures(figures: readonly PublishedFigure[]): PublishedFigure[] {
  return [...figures].sort((a, b) => {
    if (a.asOf !== b.asOf) return a.asOf < b.asOf ? 1 : -1;
    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
  });
}

/**
 * Totals for a set of ledger entries, kept separate per currency because adding
 * different currencies together would be wrong. An empty ledger gives an empty
 * list, so callers can show the empty state instead of zeros.
 */
export function ledgerTotals(entries: readonly LedgerEntry[]): LedgerTotal[] {
  const totals = new Map<string, LedgerTotal>();

  for (const entry of entries) {
    const total =
      totals.get(entry.currency) ??
      { currency: entry.currency, incomeMinor: 0, expenditureMinor: 0 };

    if (entry.kind === "income") {
      total.incomeMinor += entry.amountMinor;
    } else {
      total.expenditureMinor += entry.amountMinor;
    }

    totals.set(entry.currency, total);
  }

  return [...totals.values()].sort((a, b) => a.currency.localeCompare(b.currency));
}

/** Convenience wrappers around the loaders. */
export function getLedger(projectRoot: string = process.cwd()): LedgerEntry[] {
  return loadLedger(projectRoot);
}

export function getFigures(projectRoot: string = process.cwd()): PublishedFigure[] {
  return loadFigures(projectRoot);
}

export function getLedgerTotals(
  projectRoot: string = process.cwd(),
): LedgerTotal[] {
  return ledgerTotals(loadLedger(projectRoot));
}
