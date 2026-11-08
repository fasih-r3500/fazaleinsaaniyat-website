import { common, footer, home, plainText } from "@/content/copy";
import type { SocialPost } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

const INSTAGRAM_PROFILE = "https://www.instagram.com/fazaleinsaaniyat/";

function formatTakenAt(locale: Locale, takenAt: string): string {
  return new Intl.DateTimeFormat(locale === "ur" ? "ur-PK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(takenAt));
}

function postLabel(locale: Locale, post: SocialPost): string {
  const collaborator = post.collaborator
    ? ` with @${post.collaborator}`
    : "";
  const newTab = plainText(locale, common.opensInNewTab);

  return `${plainText(locale, home.socialPostLabel)} @${post.owner}${collaborator}, ${formatTakenAt(locale, post.takenAt)}. ${post.alt} (${newTab})`;
}

/**
 * The home social strip. It renders nothing when the manifest is missing or
 * empty, so the page never shows an empty shell. Every tile is a link to the
 * original post and shows a committed WebP poster. No video is committed or
 * played, so the strip adds no autoplay and no third-party request.
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
        <div className="section-head">
          <h2 id="social-heading">
            <T locale={locale} value={home.socialTitle} />
          </h2>
          <a
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
          {posts.map((post, index) => (
            <li
              key={post.url}
              className={
                index === 0 ? "social-tile social-tile--wide" : "social-tile"
              }
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={postLabel(locale, post)}
              >
                {/* A plain image keeps the site static and avoids an image
                    optimiser request at runtime. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.posterUrl}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="social-tile__badge" aria-hidden="true">
                  {plainText(locale, footer.instagram)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
