import { policySlugs } from "@/content/copy";
import { getPublishedFieldTrips, getPublishedInitiatives } from "@/lib/content";
import { SITE_URL, pathForLocale, type Locale } from "./locale";

/**
 * The public route list, in one place.
 *
 * `/robots.txt` and `/sitemap.xml` are generated from here, so a page that is
 * added to the site is added to the sitemap at the same time and a page that
 * does not exist is never advertised.
 */

/**
 * Paths that exist in both language trees and do not come from a content file.
 * The empty string is the home page.
 */
export const staticPagePaths = [
  "",
  "madrasahs",
  "initiatives",
  "field-trips",
  "transparency",
  "policies",
  "give",
  "get-help",
  "contact",
  "about",
] as const;

/**
 * Paths the site serves in English only: the preserved Ghar Ka Khana pages,
 * which have no `/ur` tree. A path listed here is published once, with no
 * alternate it cannot answer for.
 */
export const englishOnlyPagePaths = ["gkk", "gkk/privacy"] as const;

type PublishedPage = {
  /** The path inside a language tree, without a leading slash. */
  path: string;
  /** Every language tree that serves this path. */
  locales: readonly Locale[];
};

const bilingual: readonly Locale[] = ["en", "ur"];
const englishOnly: readonly Locale[] = ["en"];

/**
 * Every page the site publishes, as a path inside one language tree, without a
 * leading slash, together with the language trees that serve it.
 *
 * Only published records contribute a path: `getPublishedInitiatives` and
 * `getPublishedFieldTrips` leave out every record marked `draft`, and a store
 * that holds no records contributes no paths instead of a broken one.
 */
export function publishedPages(): PublishedPage[] {
  const paths: string[] = [...staticPagePaths];

  for (const slug of policySlugs) {
    paths.push(`policies/${slug}`);
  }

  for (const initiative of getPublishedInitiatives()) {
    paths.push(`initiatives/${initiative.slug}`);
  }

  for (const fieldTrip of getPublishedFieldTrips()) {
    paths.push(`field-trips/${fieldTrip.slug}`);
  }

  return [
    ...paths.map((path) => ({ path, locales: bilingual })),
    ...englishOnlyPagePaths.map((path) => ({ path, locales: englishOnly })),
  ];
}

/** The absolute URL of a page in one language tree. */
export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(pathForLocale(locale, path), SITE_URL).toString();
}
