import { common, plainText } from "@/content/copy";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

/**
 * Stands in for a photo that is not published yet.
 *
 * A soft blurred block with one neutral line of text, in the way a spoiler is
 * hidden. It is presentational only: not a link, not focusable, and it invents
 * no subject. Screen readers get the one label; the decorative layers are hidden
 * from them. The block stays still when the visitor asks for reduced motion.
 */
export function RedactedPhoto({ locale }: { locale: Locale }) {
  return (
    <div className="photo-redacted" role="img" aria-label={plainText(locale, common.photoNotPublished)}>
      <span className="photo-redacted-fill" aria-hidden="true" />
      <span className="photo-redacted-label" aria-hidden="true">
        <T locale={locale} value={common.photoNotPublished} />
      </span>
    </div>
  );
}
