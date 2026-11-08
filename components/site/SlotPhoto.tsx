import { common, plainText } from "@/content/copy";
import { mediaForSlot, type PhotoMedia } from "@/lib/content";
import type { SocialSlot } from "@/lib/content/types";
import type { Locale } from "@/lib/locale";
import { RedactedPhoto } from "./RedactedPhoto";

function Shot({ media, locale }: { media: PhotoMedia; locale: Locale }) {
  return (
    // A committed WebP under public/media/social/. The manifest records the
    // source pixels, so the browser is told the real size and never upscales.
    <a
      className="slot-photo-link"
      href={media.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="slot-photo"
        src={media.src}
        width={media.width}
        height={media.height}
        alt={plainText(locale, media.alt)}
        loading="lazy"
        decoding="async"
      />
      <span className="visually-hidden">
        {plainText(locale, common.photoSourceLabel)}
      </span>
    </a>
  );
}

/**
 * The honest image slot for one part of the page.
 *
 * A confirmed still renders as a photograph. A still whose origin is not
 * established renders as the redacted block instead, so the page never shows a
 * picture it cannot vouch for. A slot with nothing recorded renders nothing.
 */
export function SlotPhoto({ slot, locale }: { slot: SocialSlot; locale: Locale }) {
  const media = mediaForSlot(slot);

  if (media === null) return null;

  if (media.kind === "redacted") {
    return <RedactedPhoto locale={locale} />;
  }

  return <Shot media={media} locale={locale} />;
}

/**
 * Which still belongs to which initiative line, by the English title in
 * `content/copy.ts`. The other lines carry no confirmed still, so they render
 * without one rather than borrowing a picture that does not show them.
 */
const INITIATIVE_SLOTS: Record<string, SocialSlot> = {
  Mosques: "mosques",
  Water: "water",
  "Hunar Ghar": "hunar-ghar",
};

export function InitiativePhoto({ title, locale }: { title: string; locale: Locale }) {
  const slot = INITIATIVE_SLOTS[title];
  if (slot === undefined) return null;

  return <SlotPhoto slot={slot} locale={locale} />;
}
