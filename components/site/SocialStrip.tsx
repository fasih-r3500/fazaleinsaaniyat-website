import { common, footer, home, plainText } from "@/content/copy";
import type { SocialPost } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

const INSTAGRAM_PROFILE = "https://www.instagram.com/fazaleinsaaniyat/";

function formatPostDate(locale: Locale, takenAt: string): string {
  return new Intl.DateTimeFormat(locale === "ur" ? "ur-PK" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(takenAt));
}

/**
 * The home social wall.
 *
 * It renders nothing when the manifest is missing or empty, so the page never
 * shows an empty shell. Posts keep manifest order, newest first, and the first
 * one becomes the focal tile. Every tile links to its original post and shows
 * the committed WebP poster. Video is never downloaded or played here, so the
 * wall adds no autoplay, no player and no third-party request.
 */
export function SocialStrip({
  locale,
  posts,
}: {
  locale: Locale;
  posts: SocialPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="block rule social-strip" aria-labelledby="social-heading">
      <div className="wrap">
        <div className="section-head social-strip__head">
          <div className="social-strip__title">
            <span className="mono social-strip__eyebrow">
              {plainText(locale, footer.instagram)}
            </span>
            <h2 id="social-heading">
              <T locale={locale} value={home.socialTitle} />
            </h2>
          </div>
          <a
            className="social-strip__link"
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${plainText(locale, home.socialLink)} (${plainText(locale, common.opensInNewTab)})`}
          >
            <T locale={locale} value={home.socialLink} />{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <p className="section-intro">
          <T locale={locale} value={home.socialIntro} />
        </p>
        <ul className="social-mosaic">
          {posts.map((post, index) => {
            const isFocal = index === 0;

            return (
              <li
                key={post.url}
                className={
                  isFocal ? "social-tile social-tile--focal" : "social-tile"
                }
              >
                <a
                  className="social-tile__link"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-tile__media">
                    {/* A plain image keeps the site static and avoids an image
                        optimiser request at runtime. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="social-tile__img"
                      src={post.posterUrl}
                      alt={post.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    {isFocal ? (
                      <span className="social-tile__latest">
                        <T locale={locale} value={home.socialLatest} />
                      </span>
                    ) : null}
                  </span>
                  <span className="social-tile__meta">
                    <span className="social-tile__platform">
                      {plainText(locale, footer.instagram)}
                    </span>
                    <time
                      className="social-tile__date"
                      dateTime={post.takenAt}
                    >
                      {formatPostDate(locale, post.takenAt)}
                    </time>
                    <span className="social-tile__arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="visually-hidden">
                      {plainText(locale, common.opensInNewTab)}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
