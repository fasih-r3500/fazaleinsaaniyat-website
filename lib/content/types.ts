/**
 * Record shapes for the content stores in `content/`.
 *
 * These types describe what the loader in `lib/content` exposes after validation.
 * Every value below comes from a file in this repository. Nothing is fetched at
 * runtime, so pages that read these records render as static HTML.
 */

export type LocalizedText = {
  en: string;
  ur: string | null;
};

export type ReportLanguage = "en" | "ur";

export type Money = {
  /** Amount in minor units. For PKR, 1 rupee is 100 minor units. */
  amountMinor: number;
  /** ISO 4217 currency code. Report costs are recorded in PKR. */
  currency: "PKR";
};

export type ReportDataFile = {
  /** Repository relative path, for example public/data/reports/2026-01.csv */
  path: string;
  /** Public URL derived from the path, for example /data/reports/2026-01.csv */
  url: string;
};

/**
 * One field report. A report is one Markdown file in `content/reports` with
 * front matter, and the file name without `.md` becomes the slug.
 */
export type Report = {
  slug: string;
  title: string;
  /** Publication date in YYYY-MM-DD form. */
  date: string;
  place: string;
  language: ReportLanguage;
  /** Optional. `null` means the report does not record a household count. */
  householdsServed: number | null;
  /** Optional. `null` means the report does not record a cost. */
  cost: Money | null;
  /** Optional. `null` means no underlying data file is attached. */
  dataFile: ReportDataFile | null;
  /** Draft reports are validated but never listed as published. */
  draft: boolean;
  /** The Markdown prose after the front matter block. */
  body: string;
  /** Repository relative path of the source file, for example content/reports/x.md */
  sourcePath: string;
};

export type LedgerKind = "income" | "expenditure";

/**
 * One line of the public ledger: money in, money out or a project cost.
 * Entries live in `content/facts/ledger.json`.
 */
export type LedgerEntry = {
  id: string;
  /** Date the money moved, in YYYY-MM-DD form. */
  date: string;
  kind: LedgerKind;
  /** Short grouping label, for example "Donations" or "Project cost". */
  category: string;
  description: string;
  /** Positive amount in minor units, for example 450000 is PKR 4,500.00 */
  amountMinor: number;
  /** ISO 4217 currency code. */
  currency: string;
  /** Optional programme or project name. */
  project: string | null;
  /** Optional slug of a report that documents this entry. */
  reportSlug: string | null;
  /** Optional repository relative path to a supporting file. */
  receiptPath: string | null;
};

export type LedgerTotal = {
  currency: string;
  incomeMinor: number;
  expenditureMinor: number;
};

/**
 * One figure the charity publishes. Figures live in `content/facts/figures.json`
 * and only hold values the charity has verified.
 */
export type PublishedFigure = {
  id: string;
  label: LocalizedText;
  value: number;
  /** Unit or noun for the value, for example "madrasahs" or "households". */
  unit: string;
  /** Date the figure is true as of, in YYYY-MM-DD form. */
  asOf: string;
  /** Optional slug of a report that documents this figure. */
  reportSlug: string | null;
};
