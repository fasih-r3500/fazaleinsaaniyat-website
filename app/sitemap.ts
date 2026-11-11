import type { MetadataRoute } from "next";
import { absoluteUrl, publishedPagePaths } from "@/lib/routes";
import { type Locale } from "@/lib/locale";

// The sitemap is built with the site: it reads the same route list and the same
// content stores as the pages, so it cannot list an address the site does not
// serve. Building it at build time also means `lastModified` is the deploy that
// changed the content, not the moment a crawler happened to ask.
export const dynamic = "force-static";

const lastModified = new Date();

const locales: Locale[] = ["en", "ur"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = publishedPagePaths();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      alternates: {
        languages: {
          en: absoluteUrl("en", path),
          ur: absoluteUrl("ur", path),
          "x-default": absoluteUrl("en", path),
        },
      },
    })),
  );
}
