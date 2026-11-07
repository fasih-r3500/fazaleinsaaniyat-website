import { common, nav, reportPage } from "@/content/copy";
import type { Report } from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";
import { pathForLocale, type Locale } from "@/lib/locale";
import { T } from "./BilingualText";
import { ReportBody } from "./ReportBody";

export function ReportPage({
  locale,
  report,
}: {
  locale: Locale;
  report: Report;
}) {
  const dir = report.language === "ur" ? "rtl" : "ltr";

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={pathForLocale(locale, "")}>
              <T locale={locale} value={common.home} />
            </a>
            <span aria-hidden="true"> / </span>
            <a href={pathForLocale(locale, "reports")}>
              <T locale={locale} value={nav.reports} />
            </a>
            <span aria-hidden="true"> / </span>
            <span>
              <T locale={locale} value={reportPage.crumb} compact />
            </span>
          </nav>
          <p className="mono page-head-meta">{formatDate(report.date)}</p>
          <h1 lang={report.language} dir={dir}>
            {report.title}
          </h1>
        </div>
      </div>

      <section className="block" aria-labelledby="report-facts-heading">
        <div className="wrap">
          <div className="split">
            <div>
              {report.language !== locale ? (
                <p className="notice">
                  <T
                    locale={locale}
                    value={
                      report.language === "en"
                        ? reportPage.languageNoteEnglish
                        : reportPage.languageNoteUrdu
                    }
                  />
                </p>
              ) : null}
              <div className="prose" lang={report.language} dir={dir}>
                <ReportBody body={report.body} locale={locale} />
              </div>
            </div>

            <aside className="panel">
              <h2 id="report-facts-heading" className="panel-heading">
                <T locale={locale} value={reportPage.factsTitle} />
              </h2>
              <ul className="facts">
                <li>
                  <span>
                    <T locale={locale} value={reportPage.place} />
                  </span>
                  <span lang={report.language} dir={dir}>
                    {report.place}
                  </span>
                </li>
                <li>
                  <span>
                    <T locale={locale} value={reportPage.published} />
                  </span>
                  <span className="num">{formatDate(report.date)}</span>
                </li>
                <li>
                  <span>
                    <T locale={locale} value={reportPage.households} />
                  </span>
                  <span className="num">
                    {report.householdsServed ?? (
                      <T locale={locale} value={reportPage.notRecorded} />
                    )}
                  </span>
                </li>
                <li>
                  <span>
                    <T locale={locale} value={reportPage.cost} />
                  </span>
                  <span className="num">
                    {report.cost ? (
                      formatMoney(report.cost.amountMinor, report.cost.currency)
                    ) : (
                      <T locale={locale} value={reportPage.notRecorded} />
                    )}
                  </span>
                </li>
              </ul>

              {report.dataFile ? (
                <div className="data-file">
                  <h3 className="panel-subheading">
                    <T locale={locale} value={reportPage.dataFile} />
                  </h3>
                  <a href={report.dataFile.url} download>
                    <T locale={locale} value={reportPage.download} />
                  </a>
                  <p className="table-note">
                    <T locale={locale} value={reportPage.dataFileNote} />
                  </p>
                </div>
              ) : null}

              <p className="table-note">
                <a href={pathForLocale(locale, "reports")}>
                  <T locale={locale} value={reportPage.backToReports} />
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
