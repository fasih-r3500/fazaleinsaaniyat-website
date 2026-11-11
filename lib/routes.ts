import { readdirSync } from "node:fs";
import { join } from "node:path";
import { getPublishedFieldTrips, getPublishedInitiatives } from "@/lib/content";
import { SITE_URL, pathForLocale, type Locale } from "./locale";

/**
 * The public route list, in one place.
 *
 * `/robots.txt` and `/sitemap.xml` are generated from here. The page list is
 * read from the route files under `app/`, so a page that exists is advertised
 * and a page that is deleted stops being advertised.
 */

/**
 * The directory that is the root of each language tree, and the tree it serves.
 * `(gkk)` holds the preserved Ghar Ka Khana pages, which have no Urdu tree: a
 * path that only one tree serves is published once, with no alternate it cannot
 * answer for.
 */
const languageTrees: readonly { root: readonly string[]; locale: Locale }[] = [
  { root: ["app", "(en)"], locale: "en" },
  { root: ["app", "(gkk)"], locale: "en" },
  { root: ["app", "(ur)", "ur"], locale: "ur" },
];

/**
 * A dynamic route (`[slug]`) has no address of its own, so its addresses come
 * from the content model below.
 */
function isDynamic(segment: string): boolean {
  return segment.startsWith("[") && segment.endsWith("]");
}

/** Every page file under one language tree, as its URL segments. */
function pageSegmentsUnder(directory: string, segments: string[] = []): string[][] {
  const pages: string[][] = [];
  const entries = readdirSync(directory, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Private folders and parallel slots are not addresses of their own.
      if (entry.name.startsWith("_") || entry.name.startsWith("@")) {
        continue;
      }

      // A route group shapes the layout tree, not the URL.
      const isGroup = entry.name.startsWith("(") && entry.name.endsWith(")");
      pages.push(
        ...pageSegmentsUnder(
          join(directory, entry.name),
          isGroup ? segments : [...segments, entry.name],
        ),
      );
    } else if (entry.name === "page.tsx") {
      pages.push(segments);
    }
  }

  return pages;
}

/**
 * The routes whose `[slug]` addresses come from the published records: a draft
 * contributes no address, and a store that holds no records contributes none
 * instead of a broken one.
 */
const contentRoutes: readonly { pattern: string; slugs: () => string[] }[] = [
  {
    pattern: "initiatives/[slug]",
    slugs: () => getPublishedInitiatives().map((initiative) => initiative.slug),
  },
  {
    pattern: "field-trips/[slug]",
    slugs: () => getPublishedFieldTrips().map((trip) => trip.slug),
  },
];

type PublishedPage = {
  /** The path inside a language tree, without a leading slash. */
  path: string;
  /** Every language tree that serves this path. */
  locales: readonly Locale[];
};

function addLocale(pages: Map<string, Locale[]>, path: string, locale: Locale): void {
  const locales = pages.get(path);

  if (!locales) {
    pages.set(path, [locale]);
  } else if (!locales.includes(locale)) {
    locales.push(locale);
  }
}

/**
 * Every page the site publishes, as a path inside one language tree, without a
 * leading slash, together with the language trees that serve it.
 */
export function publishedPages(): PublishedPage[] {
  const pages = new Map<string, Locale[]>();
  const patterns = new Map<string, Locale[]>();

  for (const { root, locale } of languageTrees) {
    for (const segments of pageSegmentsUnder(join(...root))) {
      addLocale(segments.some(isDynamic) ? patterns : pages, segments.join("/"), locale);
    }
  }

  for (const { pattern, slugs } of contentRoutes) {
    for (const locale of patterns.get(pattern) ?? []) {
      for (const slug of slugs()) {
        addLocale(pages, pattern.replace("[slug]", slug), locale);
      }
    }
  }

  return [...pages].map(([path, locales]) => ({ path, locales }));
}

/** The absolute URL of a page in one language tree. */
export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(pathForLocale(locale, path), SITE_URL).toString();
}
