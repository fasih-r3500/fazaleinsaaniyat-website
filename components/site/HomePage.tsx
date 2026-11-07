import { home, common, madrasahsPage } from "@/content/copy";
import { plainText } from "@/content/copy";
import { madrasahs } from "@/lib/madrasahs";
import { pathForLocale, type Locale } from "@/lib/locale";
import { Mark } from "./Mark";
import { T } from "./BilingualText";
import { SiteMap } from "./SiteMap";
import { MadrasahSummaryTable } from "./MadrasahTables";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="hero">
        <Mark className="hero-watermark" />
        <div className="wrap">
          <div className="hero-copy">
            <h1>
              <T locale={locale} value={home.heroTitle} />
            </h1>
            <p className="lede">
              <T locale={locale} value={home.heroLede} />
            </p>
            <div className="actions">
              <a className="btn btn-solid" href={pathForLocale(locale, "give")}>
                <T locale={locale} value={common.give} /> <Arrow />
              </a>
              <a className="btn btn-ghost-light" href={pathForLocale(locale, "get-help")}>
                <T locale={locale} value={common.getHelp} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="verify" aria-labelledby="verify-heading">
        <div className="wrap">
          <h2 id="verify-heading" className="visually-hidden">
            <T locale={locale} value={home.verificationLabel} />
          </h2>
          <div className="verify-empty">
            <span className="mono">
              <T locale={locale} value={home.verificationLabel} />
            </span>
            <b>
              <T locale={locale} value={home.verificationEmpty} />
            </b>
            <p>
              <T locale={locale} value={home.verificationEmptyBody} />
            </p>
            <a href={pathForLocale(locale, "reports")}>
              <T locale={locale} value={common.readTheReports} /> <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="paths-heading">
        <div className="wrap">
          <h2 id="paths-heading" className="visually-hidden">
            <T locale={locale} value={home.pathwaysTitle} />
          </h2>
          <ul className="paths">
            {home.paths.map((path) => (
              <li key={path.href}>
                <a href={pathForLocale(locale, path.href)}>
                  <h3>
                    <T locale={locale} value={path.title} />
                  </h3>
                  <p>
                    <T locale={locale} value={path.body} />
                  </p>
                  <span className="go">
                    <T locale={locale} value={path.action} /> <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block rule" aria-labelledby="latest-heading">
        <div className="wrap">
          <div className="section-head">
            <h2 id="latest-heading">
              <T locale={locale} value={home.latestReportTitle} />
            </h2>
          </div>
          <div className="report-grid">
            <div className="report-empty">
              <p className="report-empty-title">
                <T locale={locale} value={home.latestReportEmpty} />
              </p>
              <a href={pathForLocale(locale, "reports")}>
                <T locale={locale} value={common.readTheReports} /> <Arrow />
              </a>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={home.howWeReportTitle} />
              </h3>
              <p>
                <T locale={locale} value={home.howWeReportBody} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="hbm-heading">
        <div className="wrap">
          <div className="hbm">
            <div className="hbm-copy">
              <span className="mono">
                <T locale={locale} value={home.hbmEyebrow} />
              </span>
              <h2 id="hbm-heading" className="hbm-heading">
                <T locale={locale} value={home.hbmTitle} />
              </h2>
              <p className="hbm-lead">
                <T locale={locale} value={home.hbmLead} />
              </p>
              <div className="hbm-stat">
                <b className="num">{madrasahs.length}</b>
                <span>
                  <T locale={locale} value={home.hbmStatLabel} />
                </span>
              </div>
              <p className="hbm-note">
                <T locale={locale} value={home.hbmNote} />
              </p>
              <a className="text-link" href={pathForLocale(locale, "madrasahs")}>
                <T locale={locale} value={home.hbmLink} /> <Arrow />
              </a>
            </div>
            <div className="hbm-map">
              <div className="map-wrap">
                <SiteMap
                  id="home-madrasah-map"
                  title={plainText(locale, madrasahsPage.mapAriaTitle)}
                  description={plainText(locale, madrasahsPage.mapAriaDescription)}
                />
              </div>
              <p className="map-caption">
                <T locale={locale} value={madrasahsPage.mapNote} />
              </p>
            </div>
          </div>
          <div className="hbm-table-wide">
            <MadrasahSummaryTable locale={locale} />
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="initiatives-heading">
        <div className="wrap">
          <div className="section-head">
            <h2 id="initiatives-heading">
              <T locale={locale} value={home.initiativesTitle} />
            </h2>
            <a href={pathForLocale(locale, "programmes")}>
              <T locale={locale} value={common.moreWork} /> <Arrow />
            </a>
          </div>
          <p className="section-intro">
            <T locale={locale} value={home.initiativesIntro} />
          </p>
          <ul className="initiative-grid">
            {home.initiatives.map((item, index) => (
              <li key={item.title.en}>
                <span className="mono k">{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <T locale={locale} value={item.title} />
                </h3>
                <p>
                  <T locale={locale} value={item.body} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="quote" aria-labelledby="quote-heading">
        <div className="wrap">
          <h2 id="quote-heading" className="visually-hidden">
            <T locale={locale} value={home.quoteCite} />
          </h2>
          <blockquote>
            <p>
              <T locale={locale} value={home.quoteEnglish} />
            </p>
          </blockquote>
          <p className="quote-urdu" lang="ur" dir="rtl">
            {home.quoteUrdu}
          </p>
          <cite>
            <T locale={locale} value={home.quoteCite} />
          </cite>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div>
            <h2>
              <T locale={locale} value={home.ctaTitle} />
            </h2>
            <p className="mono">
              <T locale={locale} value={home.ctaNote} />
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
