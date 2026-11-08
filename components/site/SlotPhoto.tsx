import { common, plainText } from "@/content/copy";
import { mediaForSlot, type PhotoMedia, type SocialPost } from "@/lib/content";
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

function PostShot({ post, locale }: { post: SocialPost; locale: Locale }) {
  return (
    // A committed WebP poster from the social manifest. The post is the source,
    // so the link credits the original rather than a re-hosted copy.
    <a
      className="slot-photo-link"
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="slot-photo"
        src={post.posterUrl}
        alt={post.alt}
        loading="lazy"
        decoding="async"
      />
      <span className="visually-hidden">
        {plainText(locale, common.postSourceLabel)}
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
 * Which still belongs to which initiative line, by the stable slug from
 * `content/initiatives/`.
 *
 * Mosques and Water have a confirmed still from the charity's public page.
 * Hunar Ghar has no confirmed photograph, so its own designed poster for the
 * teacher salary reel stands in, described as a poster. The remaining lines
 * have no still that honestly shows them, so each one holds its tile with the
 * redacted block instead of borrowing a picture of something else.
 */
const INITIATIVE_SLOTS: Record<string, SocialSlot> = {
  mosques: "mosques",
  water: "water",
};

const HUNAR_GHAR_POST = "https://www.instagram.com/fazaleinsaaniyat/reel/DfR-G3xssDQ/";

export function InitiativePhoto({
  slug,
  locale,
  posts,
}: {
  slug: string;
  locale: Locale;
  posts: SocialPost[];
}) {
  if (slug === "hunar-ghar") {
    const post = posts.find((entry) => entry.url === HUNAR_GHAR_POST);
    if (post !== undefined) {
      return <PostShot post={post} locale={locale} />;
    }
  }

  const slot = INITIATIVE_SLOTS[slug];
  if (slot === undefined) {
    return <RedactedPhoto locale={locale} />;
  }

  return <SlotPhoto slot={slot} locale={locale} />;
}
