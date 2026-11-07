import type { Metadata } from "next";
import type { Locale } from "./locale";

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
