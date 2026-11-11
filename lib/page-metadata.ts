import type { Metadata } from "next";
import { notFound, plainText } from "@/content/copy";
import type { Locale } from "./locale";

/**
 * The title and description for a missing page.
 *
 * `not-found.tsx` cannot be reached by the client router's metadata resolution
 * on its own, so the route that answers with a 404 exports this as well. Every
 * path that ends in "page not found" then shows the same readable title.
 */
export function notFoundMetadata(locale: Locale): Metadata {
  return {
    title: plainText(locale, notFound.title),
    description: plainText(locale, notFound.body),
  };
}

export function pageMetadata({
  locale,
  slug,
  title,
  description,
  absoluteTitle = false,
  canonical,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  canonical?: string;
}): Metadata {
  const englishPath = slug ? `/${slug}` : "/";
  const urduPath = slug ? `/ur/${slug}` : "/ur";
  const canonicalPath = canonical ?? (locale === "ur" ? urduPath : englishPath);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: englishPath,
        ur: urduPath,
        "x-default": englishPath,
      },
    },
  };
}
