import type { Bilingual } from "@/content/copy";
import type { Locale } from "@/lib/locale";

export function T({
  locale,
  value,
}: {
  locale: Locale;
  value: Bilingual;
}) {
  if (locale === "en") {
    return <>{value.en}</>;
  }

  return <>{value.ur ?? value.en}</>;
}
