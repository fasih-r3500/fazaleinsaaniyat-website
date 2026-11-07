import type { LocalizedText } from "./types";

/** Copy a page can render when a content store is still empty. */
export type EmptyState = {
  title: LocalizedText;
  body: LocalizedText;
};

/**
 * Shown instead of a list when `content/reports` holds no published report.
 * It states plainly that nothing is published yet and promises nothing.
 */
export const reportsEmptyState: EmptyState = {
  title: {
    en: "No field reports published yet",
    ur: null,
  },
  body: {
    en: "Reports will appear here once the field team has verified them. Nothing is published in their place.",
    ur: null,
  },
};

/** Shown when `content/facts/ledger.json` holds no entries. */
export const ledgerEmptyState: EmptyState = {
  title: {
    en: "No ledger entries published yet",
    ur: null,
  },
  body: {
    en: "Money in, money out and project costs will be listed here once the records are verified.",
    ur: null,
  },
};

/** Shown when `content/facts/figures.json` holds no figures. */
export const figuresEmptyState: EmptyState = {
  title: {
    en: "No figures published yet",
    ur: null,
  },
  body: {
    en: "The figures we publish will appear here, each with the date it is true as of.",
    ur: null,
  },
};
