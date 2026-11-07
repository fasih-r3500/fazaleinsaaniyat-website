import type { LocalizedText } from "./types";

/** Copy a page can render when a content store is still empty. */
export type EmptyState = {
  title: LocalizedText;
  body: LocalizedText;
};

/**
 * Shown instead of a list when `content/field-trips` holds no published trip.
 * It states plainly that nothing is published yet and promises nothing.
 */
export const fieldTripsEmptyState: EmptyState = {
  title: {
    en: "No field trips published yet",
    ur: "ابھی کوئی میدانی دورہ شائع نہیں ہوا",
  },
  body: {
    en: "Field trips will appear here once the write-up has been checked. Nothing is published in their place.",
    ur: "تحریر کی جانچ کے بعد میدانی دورے یہاں آئیں گے۔ ان کی جگہ کوئی اور چیز شائع نہیں کی جاتی۔",
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
