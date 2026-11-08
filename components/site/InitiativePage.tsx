import { common, initiativesPage, type Bilingual } from "@/content/copy";
import { INITIATIVE_CONTENT_LANGUAGE, type Initiative } from "@/lib/content";
import { pathForLocale, dirForLocale, type Locale } from "@/lib/locale";
import { formatMoney, formatMonthOrDate } from "@/lib/format";
import { Markdown } from "./Markdown";
import { StatusChip } from "./InitiativeStatus";
import { T } from "./BilingualText";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

/**
 * The content inside an initiative file is written in one language. Set it on
 * the element so the text sits correctly inside either language tree.
 */
const contentLang = INITIATIVE_CONTENT_LANGUAGE;
const contentDir = contentLang === "ur" ? "rtl" : "ltr";

type Fact = {
  label: Bilingual;
  value: string;
  numeric: boolean;
  pageLang?: boolean;
};

export function InitiativePage({
  initiative,
  locale,
}: {
  initiative: Initiative;
  locale: Locale;
}) {
  const facts: Fact[] = [];

  if (initiative.locations.length > 0) {
    facts.push({
      label:
        initiative.locations.length > 1
          ? initiativesPage.locations
          : initiativesPage.location,
      value: initiative.locations.join(", "),
      numeric: false,
    });
  }

  const startDate = initiative.startDate === null ? null : formatMonthOrDate(initiative.startDate, locale);
  if (startDate !== null) {
    facts.push({
      label: initiativesPage.started,
      value: startDate,
      numeric: true,
      pageLang: true,
    });
  }

  const endDate = initiative.endDate === null ? null : formatMonthOrDate(initiative.endDate, locale);
  if (endDate !== null) {
    facts.push({
      label: initiativesPage.ended,
      value: endDate,
      numeric: true,
      pageLang: true,
    });
  }

  if (initiative.householdsServed !== null) {
    facts.push({
      label: initiativesPage.householdsServed,
      value: String(initiative.householdsServed),
      numeric: true,
    });
  }

  if (initiative.cost !== null) {
    facts.push({
      label: initiativesPage.cost,
      value: formatMoney(initiative.cost.amountMinor, initiative.cost.currency),
      numeric: true,
    });
  }

  if (initiative.costCovers !== null) {
    facts.push({
      label: initiativesPage.costCovers,
      value: initiative.costCovers,
      numeric: false,
    });
  }

  const hasSide = initiative.peopleServed.length > 0 || initiative.partners.length > 0;
  const hasDetails = facts.length > 0 || hasSide;

  return (
    <article>
      <header className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={pathForLocale(locale, "")}>
              <T locale={locale} value={common.home} />
            </a>
            <span aria-hidden="true"> / </span>
            <a href={pathForLocale(locale, "initiatives")}>
              <T locale={locale} value={initiativesPage.title} />
            </a>
            <span aria-hidden="true"> / </span>
            <span lang={contentLang} dir={contentDir}>
              {initiative.title}
            </span>
          </nav>
          <h1 lang={contentLang} dir={contentDir}>
            {initiative.title}
          </h1>
          <p className="lede" lang={contentLang} dir={contentDir}>
            {initiative.summary}
          </p>
          <ul className="initiative-meta">
            <li>
              <StatusChip status={initiative.status} locale={locale} />
            </li>
            <li className="tag" lang={contentLang} dir={contentDir}>
              {initiative.category}
            </li>
          </ul>
        </div>
      </header>

      {initiative.stats.length > 0 ? (
        <section className="block" aria-labelledby="initiative-stats">
          <div className="wrap">
            <h2 id="initiative-stats" className="visually-hidden">
              <T locale={locale} value={initiativesPage.statsLabel} />
            </h2>
            <ul className="stat-tiles" lang={contentLang} dir={contentDir}>
              {initiative.stats.map((stat, index) => (
                <li key={`${stat.label}-${index}`}>
                  <b className={stat.numeric ? "num" : undefined}>{stat.value}</b>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {initiative.body ? (
        <section className="block rule" aria-labelledby="initiative-about">
          <div className="wrap">
            <h2 id="initiative-about" className="visually-hidden">
              <T locale={locale} value={initiativesPage.about} />
            </h2>
            <div
              className="initiative-body"
              lang={contentLang}
              dir={contentDir}
            >
              <Markdown source={initiative.body} />
            </div>
          </div>
        </section>
      ) : null}

      {hasDetails ? (
        <section className="block rule" aria-labelledby="initiative-details">
          <div className="wrap">
            <h2 id="initiative-details" className="section-title">
              <T locale={locale} value={initiativesPage.details} />
            </h2>
            <div className={hasSide ? "split initiative-details" : "initiative-details"}>
              {facts.length > 0 ? (
                <ul className="facts">
                  {facts.map((fact) => (
                    <li key={fact.label.en}>
                      <span>
                        <T locale={locale} value={fact.label} />
                      </span>
                      <span
                        className={fact.numeric ? "num" : undefined}
                        lang={fact.pageLang ? locale : contentLang}
                        dir={fact.pageLang ? dirForLocale(locale) : contentDir}
                      >
                        {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasSide ? (
                <div className="initiative-aside">
                  {initiative.peopleServed.length > 0 ? (
                    <div className="panel">
                      <h3>
                        <T locale={locale} value={initiativesPage.peopleServed} />
                      </h3>
                      <ul className="tag-list" lang={contentLang} dir={contentDir}>
                        {initiative.peopleServed.map((group) => (
                          <li key={group} className="chip">
                            {group}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {initiative.partners.length > 0 ? (
                    <div className="panel">
                      <h3>
                        <T locale={locale} value={initiativesPage.partners} />
                      </h3>
                      <ul className="partner-list" lang={contentLang} dir={contentDir}>
                        {initiative.partners.map((partner) => (
                          <li key={partner}>{partner}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {initiative.photos.length > 0 ? (
        <section className="block rule" aria-labelledby="initiative-photos">
          <div className="wrap">
            <h2 id="initiative-photos" className="section-title">
              <T locale={locale} value={initiativesPage.photos} />
            </h2>
            <ul className="initiative-photos">
              {initiative.photos.map((photo) => (
                <li key={photo.path}>
                  {/* Content photos carry no stored dimensions, so next/image has
                      nothing to reserve space with. A plain img keeps the file
                      as written and the alt text as the only description. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.alt} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="initiative-foot">
        <div className="wrap">
          <a className="text-link" href={pathForLocale(locale, "initiatives")}>
            <T locale={locale} value={initiativesPage.backToInitiatives} /> <Arrow />
          </a>
        </div>
      </section>
    </article>
  );
}
