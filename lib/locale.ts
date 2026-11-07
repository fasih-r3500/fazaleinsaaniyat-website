export type Locale = "en" | "ur";

export const SITE_URL = "https://fazaleinsaaniyat.org";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ur";
}

export function pathForLocale(locale: Locale, slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  const prefix = locale === "ur" ? "/ur" : "";
  return clean ? `${prefix}/${clean}` : prefix || "/";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ur" : "en";
}

export function dirForLocale(locale: Locale): "ltr" | "rtl" {
  return locale === "ur" ? "rtl" : "ltr";
}
