import {
  aboutPage,
  common,
  home,
  nav,
  programmesPage,
  site,
  type Bilingual,
} from "@/content/copy";
import { dirForLocale, type Locale } from "@/lib/locale";

// Only phrases that already exist in content/copy.ts, so the strip claims
// nothing new. Urdu pages show the phrases that have approved Urdu copy and
// skip the ones still waiting on native review.
const phraseCandidates: Bilingual[] = [
  site.name,
  site.description,
  home.hbmTitle,
  ...programmesPage.items.map((item) => item.title),
  common.give,
  common.getHelp,
  nav.work,
  nav.fieldTrips,
  nav.about,
  home.heroTitle,
  home.paths[0].title,
  home.paths[1].title,
  aboutPage.title,
];

export function HeroTicker({ locale }: { locale: Locale }) {
  const phrases = phraseCandidates
    .map((phrase) => (locale === "ur" ? phrase.ur : phrase.en))
    .filter((phrase): phrase is string => Boolean(phrase));

  if (phrases.length === 0) {
    return null;
  }

  const group = (clone: boolean) => (
    <div
      className={clone ? "ticker-group ticker-group-clone" : "ticker-group"}
      aria-hidden={clone || undefined}
    >
      {phrases.map((phrase, index) => (
        <span
          className="ticker-item"
          key={`${clone ? "clone" : "live"}-${index}`}
          dir={dirForLocale(locale)}
          lang={locale}
        >
          {phrase}
          <span className="ticker-mark" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="hero-ticker">
      <div className="ticker-viewport">
        <div className="ticker-track" aria-live="off">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
