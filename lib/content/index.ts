/**
 * The single entry point for charity content.
 *
 * Every record lives as a plain file in this repository:
 *
 * - `content/reports/*.md` one Markdown file with front matter per field report
 * - `content/facts/ledger.json` money in, money out and project costs
 * - `content/facts/figures.json` the figures the charity publishes
 *
 * Import from `@/lib/content` only. The module reads files from disk, so use it
 * in server components, `generateStaticParams`, `generateMetadata` or page
 * modules, never in a client component. Records are sorted newest first and an
 * empty store returns an empty list with a matching empty state.
 *
 * Invalid content throws a ContentError whose message names every file and field
 * at fault. `next.config.ts` runs `assertContentValid` when the config loads, so
 * a malformed report stops `next build` before anything renders.
 */

import { ContentError, dedupeIssues, type ContentIssue } from "./errors";
import { loadFigures, loadLedger } from "./facts";
import { loadReports } from "./reports";

export type * from "./types";

export type { ContentIssue } from "./errors";
export { ContentError, formatContentError } from "./errors";

export {
  getDraftReports,
  getLatestReport,
  getPublishedReports,
  getReportBySlug,
  knownReportSlugs,
  loadReports,
  REPORT_EXTENSION,
  REPORT_FIELDS,
  REPORT_LANGUAGES,
  REPORTS_DIRECTORY,
  sortReports,
} from "./reports";

export {
  FACTS_DIRECTORY,
  FIGURES_FILE,
  getFigures,
  getLedger,
  getLedgerTotals,
  LEDGER_FILE,
  LEDGER_KINDS,
  ledgerTotals,
  loadFigures,
  loadLedger,
  sortFigures,
  sortLedger,
} from "./facts";

export {
  figuresEmptyState,
  ledgerEmptyState,
  reportsEmptyState,
} from "./empty-state";

export type { EmptyState } from "./empty-state";

/**
 * Validate every content store and return the problems found. Loaders are
 * isolated so one broken store does not hide problems in another.
 */
export function validateContent(
  projectRoot: string = process.cwd(),
): ContentIssue[] {
  const issues: ContentIssue[] = [];

  for (const load of [loadReports, loadLedger, loadFigures]) {
    try {
      load(projectRoot);
    } catch (error) {
      if (error instanceof ContentError) {
        issues.push(...error.issues);
        continue;
      }
      throw error;
    }
  }

  return dedupeIssues(issues);
}

/**
 * Throw one readable ContentError when any content file is invalid. Called from
 * `next.config.ts` so content problems fail the build.
 */
export function assertContentValid(
  projectRoot: string = process.cwd(),
): void {
  const issues = validateContent(projectRoot);

  if (issues.length > 0) {
    throw new ContentError(issues);
  }
}
