import { common, plainText, type Bilingual } from "@/content/copy";
import { fieldPhotos, loadFacebookMedia } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

/**
 * The field photographs that are confirmed, with the page they came from.
 *
 * No captions: each picture carries alt text that describes what is visible and
 * nothing more, and the section says in one line where the files came from.
 */
export function FieldGallery({
  locale,
  title,
  intro,
  sourceLabel,
}: {
  locale: Locale;
  title: Bilingual;
  intro: Bilingual;
  sourceLabel: Bilingual;
}) {
  const photos = fieldPhotos();
  if (photos.length === 0) return null;

  const { source } = loadFacebookMedia();

  return (
    <section className="block rule" aria-labelledby="field-heading">
      <div className="wrap">
        <div className="section-head">
          <h2 id="field-heading">
            <T locale={locale} value={title} />
          </h2>
          {source ? (
            <a className="text-link" href={source} rel="noreferrer">
              <T locale={locale} value={sourceLabel} />
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          ) : null}
        </div>
        <p className="section-intro">
          <T locale={locale} value={intro} />
        </p>
        <ul className="field-gallery">
          {photos.map((photo) => (
            <li key={photo.src}>
              <a
                className="slot-photo-link"
                href={photo.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="slot-photo"
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={plainText(locale, photo.alt)}
                  loading="lazy"
                  decoding="async"
                />
                <span className="visually-hidden">
                  {plainText(locale, common.photoSourceLabel)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
