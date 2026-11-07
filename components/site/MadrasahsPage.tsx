import { madrasahsPage, plainText } from "@/content/copy";
import { madrasahs } from "@/lib/madrasahs";
import type { Locale } from "@/lib/locale";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";
import { SiteMap } from "./SiteMap";
import { MadrasahPlaceList, MadrasahSummaryTable } from "./MadrasahTables";

export function MadrasahsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={locale}
        title={madrasahsPage.title}
        lede={madrasahsPage.lede}
      />

      <section className="block" aria-labelledby="concept-heading">
        <div className="wrap">
          <div className="concept-grid">
            <div>
              <h2 id="concept-heading" className="section-title">
                <T locale={locale} value={madrasahsPage.conceptTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={madrasahsPage.conceptBody} />
              </p>
              <ul className="check-list">
                {madrasahsPage.conceptPoints.map((point) => (
                  <li key={point.en}>
                    <T locale={locale} value={point} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="concept-stat">
              <b className="num">{madrasahs.length}</b>
              <span>
                <T locale={locale} value={madrasahsPage.statLabel} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="map-heading">
        <div className="wrap">
          <div className="section-head">
            <h2 id="map-heading">
              <T locale={locale} value={madrasahsPage.mapTitle} />
            </h2>
            <span className="mono">{madrasahs.length}</span>
          </div>
          <p className="section-intro">
            <T locale={locale} value={madrasahsPage.mapLead} />
          </p>
          <div className="map-wide">
            <div className="map-wrap">
              <SiteMap
                id="madrasahs-map"
                title={plainText(locale, madrasahsPage.mapAriaTitle)}
                description={plainText(locale, madrasahsPage.mapAriaDescription)}
              />
            </div>
            <p className="map-caption">
              <T locale={locale} value={madrasahsPage.mapNote} />
            </p>
          </div>
          <div className="hbm-table-wide">
            <MadrasahSummaryTable locale={locale} />
            <p className="table-note">
              <T locale={locale} value={madrasahsPage.countNote} />
            </p>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="every-heading">
        <div className="wrap">
          <h2 id="every-heading" className="section-title">
            <T locale={locale} value={madrasahsPage.everyTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={madrasahsPage.everyLead} />
          </p>
          <MadrasahPlaceList />
        </div>
      </section>
    </>
  );
}
