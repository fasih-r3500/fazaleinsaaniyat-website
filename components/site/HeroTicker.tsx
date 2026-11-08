import {
  aboutPage,
  common,
  home,
  nav,
  site,
  type Bilingual,
} from "@/content/copy";
import { getPublishedInitiatives } from "@/lib/content";
import { dirForLocale, type Locale } from "@/lib/locale";

// Only phrases that already exist in content/copy.ts, so the strip claims
// nothing new. Urdu pages show the phrases that have approved Urdu copy and
// skip the ones still waiting on native review.
const copyPhrases: Bilingual[] = [
  site.name,
  site.description,
  home.hbmTitle,
  common.give,
  common.getHelp,
  nav.initiatives,
  nav.fieldTrips,
  nav.about,
  home.heroTitle,
  home.paths[0].title,
  home.paths[1].title,
  aboutPage.title,
];

export function HeroTicker({ locale }: { locale: Locale }) {
  // Initiative titles come from content/initiatives files and are written in
  // English for now, so they are shown as written in both language trees.
  const initiativePhrases: Bilingual[] = getPublishedInitiatives().map(
    (initiative) => ({ en: initiative.title, ur: null }),
  );

  const phrases = [...copyPhrases, ...initiativePhrases]
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
