import type { LocalizedText } from "./types";

/** Copy a page can render when a content store is still empty. */
export type EmptyState = {
  title: LocalizedText;
  body: LocalizedText;
};

/**
 * Shown instead of a list when `content/initiatives` holds no published
 * initiative. It states plainly that nothing is published yet.
 */
export const initiativesEmptyState: EmptyState = {
  title: {
    en: "No initiatives published yet",
    ur: "ابھی کوئی اقدام شائع نہیں ہوا",
  },
  body: {
    en: "Each initiative carries a write-up, and they are listed here as they are finished.",
    ur: "ہر اقدام کی ایک تحریر ہے، اور وہ مکمل ہونے پر یہاں درج ہوتے ہیں۔",
  },
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
    en: "Field trips are listed here as they are published.",
    ur: "میدانی دورے شائع ہوتے ہی یہاں درج ہو جاتے ہیں۔",
  },
};

/** Shown when `content/facts/ledger.json` holds no entries. */
export const ledgerEmptyState: EmptyState = {
  title: {
    en: "No ledger entries published yet",
    ur: "ابھی کھاتے میں کوئی سطر شائع نہیں ہوئی",
  },
  body: {
    en: "Money in, money out and project costs are listed here as the records are checked.",
    ur: "وصول شدہ رقم، خرچ اور منصوبے کی لاگت ریکارڈ کی جانچ کے بعد یہاں درج ہوتی ہے۔",
  },
};

/** Shown when `content/facts/figures.json` holds no figures. */
export const figuresEmptyState: EmptyState = {
  title: {
    en: "No figures published yet",
    ur: "ابھی کوئی عدد شائع نہیں ہوا",
  },
  body: {
    en: "The figures we publish are listed here, each with the date it is true as of.",
    ur: "ہمارے شائع کردہ اعداد یہاں درج ہیں، ہر ایک کے ساتھ وہ تاریخ جس تک وہ درست ہے۔",
  },
};
