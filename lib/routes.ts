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
 * Every page the site publishes, as a path inside one language tree, without a
 * leading slash.
 *
 * Only published records contribute a path: `getPublishedInitiatives` and
 * `getPublishedFieldTrips` leave out every record marked `draft`, and a store
 * that holds no records contributes no paths instead of a broken one. The
 * preserved `/gkk` pages are a separate app on the same domain, not part of
 * this route list.
 */
export function publishedPagePaths(): string[] {
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

  return paths;
}

/** The absolute URL of a page in one language tree. */
export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(pathForLocale(locale, path), SITE_URL).toString();
}
