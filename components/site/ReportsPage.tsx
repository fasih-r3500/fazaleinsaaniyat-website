import { nav, reportPage, reportsPage } from "@/content/copy";
import { getPublishedReports, reportsEmptyState } from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";
import { pathForLocale, type Locale } from "@/lib/locale";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function ReportsPage({ locale }: { locale: Locale }) {
  const reports = getPublishedReports();

  return (
    <>
      <PageHead locale={locale} title={reportsPage.title} lede={reportsPage.lede} />

      <section className="block" aria-labelledby="reports-heading">
        <div className="wrap">
          <h2 id="reports-heading" className="section-title">
            <T locale={locale} value={reportsPage.listTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={reportsPage.listIntro} />
          </p>

          {reports.length === 0 ? (
            <div className="report-empty">
              <p className="report-empty-title">
                <T locale={locale} value={reportsEmptyState.title} />
              </p>
              <p>
                <T locale={locale} value={reportsEmptyState.body} />
              </p>
            </div>
          ) : (
            <ul className="report-list">
              {reports.map((report) => {
                const dir = report.language === "ur" ? "rtl" : "ltr";

                return (
                  <li key={report.slug}>
                    <span className="mono">
                      {formatDate(report.date)} /{" "}
                      <span lang={report.language} dir={dir}>
                        {report.place}
                      </span>
                    </span>
                    <h3>
                      <a
                        href={pathForLocale(locale, `reports/${report.slug}`)}
                        lang={report.language}
                        dir={dir}
                      >
                        {report.title}
                      </a>
                    </h3>
                    <ul className="facts">
                      {report.householdsServed !== null ? (
                        <li>
                          <span>
                            <T locale={locale} value={reportPage.households} />
                          </span>
                          <span className="num">{report.householdsServed}</span>
                        </li>
                      ) : null}
                      {report.cost ? (
                        <li>
                          <span>
                            <T locale={locale} value={reportPage.cost} />
                          </span>
                          <span className="num">
                            {formatMoney(report.cost.amountMinor, report.cost.currency)}
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="block rule" aria-labelledby="how-we-report-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="how-we-report-heading" className="section-title">
                <T locale={locale} value={reportsPage.howTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={reportsPage.howBody} />
              </p>
              <p className="body-copy">
                <T locale={locale} value={reportsPage.howBody2} />
              </p>
              <p className="section-note">
                <T locale={locale} value={reportsPage.holdsNote} />
              </p>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={reportsPage.holdsTitle} />
              </h3>
              <ul className="check-list">
                {reportsPage.holdsItems.map((item) => (
                  <li key={item.en}>
                    <T locale={locale} value={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="actions">
            <a className="btn btn-ghost" href={pathForLocale(locale, "transparency")}>
              <T locale={locale} value={nav.transparency} /> <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
