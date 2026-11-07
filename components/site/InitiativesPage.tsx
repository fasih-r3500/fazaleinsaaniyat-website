import { common, initiativesPage } from "@/content/copy";
import { getPublishedInitiatives, initiativesEmptyState } from "@/lib/content";
import { INITIATIVE_CONTENT_LANGUAGE } from "@/lib/content";
import { pathForLocale, type Locale } from "@/lib/locale";
import { madrasahs } from "@/lib/madrasahs";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";
import { StatusChip } from "./InitiativeStatus";

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

export function InitiativesPage({ locale }: { locale: Locale }) {
  const initiatives = getPublishedInitiatives();

  return (
    <>
      <PageHead
        locale={locale}
        title={initiativesPage.title}
        lede={initiativesPage.lede}
      />

      <section className="block" aria-labelledby="initiatives-heading">
        <div className="wrap">
          <h2 id="initiatives-heading" className="section-title">
            <T locale={locale} value={initiativesPage.indexHeading} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={initiativesPage.indexIntro} />
          </p>

          {initiatives.length === 0 ? (
            <div className="report-empty">
              <p className="report-empty-title">
                <T locale={locale} value={initiativesEmptyState.title} />
              </p>
              <p>
                <T locale={locale} value={initiativesEmptyState.body} />
              </p>
            </div>
          ) : (
            <ul className="initiative-list">
              {initiatives.map((initiative) => (
                <li key={initiative.slug}>
                  <a href={pathForLocale(locale, `initiatives/${initiative.slug}`)}>
                    <span className="initiative-card-meta">
                      <StatusChip status={initiative.status} locale={locale} />
                      <span className="tag" lang={contentLang} dir={contentDir}>
                        {initiative.category}
                      </span>
                    </span>
                    <h3 lang={contentLang} dir={contentDir}>
                      {initiative.title}
                    </h3>
                    <p lang={contentLang} dir={contentDir}>
                      {initiative.summary}
                    </p>
                    {initiative.locations.length > 0 ? (
                      <span
                        className="initiative-card-place"
                        lang={contentLang}
                        dir={contentDir}
                      >
                        {initiative.locations.join(", ")}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {locale === "ur" ? (
            <p className="section-note">
              <T locale={locale} value={initiativesPage.urduPendingNote} />
            </p>
          ) : null}

          <p className="section-note">
            <T locale={locale} value={initiativesPage.noNumbers} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="signature-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="signature-heading" className="section-title">
                <T locale={locale} value={initiativesPage.hbmTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={initiativesPage.hbmBody} />
              </p>
              <a className="text-link" href={pathForLocale(locale, "madrasahs")}>
                <T locale={locale} value={initiativesPage.hbmLink} /> <Arrow />
              </a>
            </div>
            <div className="panel">
              <span className="hbm-stat">
                <b className="num">{madrasahs.length}</b>
                <span>
                  <T locale={locale} value={initiativesPage.hbmStatLabel} />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div>
            <h2>
              <T locale={locale} value={common.give} />
            </h2>
            <p className="mono">
              <T locale={locale} value={initiativesPage.ctaNote} />
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-solid" href={pathForLocale(locale, "give")}>
              <T locale={locale} value={common.give} /> <Arrow />
            </a>
            <a className="btn btn-ghost-light" href={pathForLocale(locale, "get-help")}>
              <T locale={locale} value={common.getHelp} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
