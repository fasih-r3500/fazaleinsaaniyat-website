import type { MetadataRoute } from "next";
import { absoluteUrl, publishedPages } from "@/lib/routes";

// The sitemap is built with the site: it reads the same route list and the same
// content stores as the pages, so it cannot list an address the site does not
// serve. Building it at build time also means `lastModified` is the deploy that
// changed the content, not the moment a crawler happened to ask.
export const dynamic = "force-static";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return publishedPages().flatMap(({ path, locales }) =>
    locales.map((locale) => {
      const entry: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(locale, path),
        lastModified,
      };

      if (locales.length > 1) {
        entry.alternates = {
          languages: {
            en: absoluteUrl("en", path),
            ur: absoluteUrl("ur", path),
            "x-default": absoluteUrl("en", path),
          },
        };
      }

      return entry;
    }),
  );
}
