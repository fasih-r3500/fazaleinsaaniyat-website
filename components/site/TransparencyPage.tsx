import { aboutPage, common, policiesIndex, transparencyPage } from "@/content/copy";
import {
  figuresEmptyState,
  getFigures,
  getLedger,
  getLedgerTotals,
  ledgerEmptyState,
} from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";
import { pathForLocale, type Locale } from "@/lib/locale";
import { PageHead } from "./PageHead";
import { PlaceholderChip, T } from "./BilingualText";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function TransparencyPage({ locale }: { locale: Locale }) {
  const entries = getLedger();
  const totals = getLedgerTotals();
  const figures = getFigures();

  return (
    <>
      <PageHead locale={locale} title={transparencyPage.title} lede={transparencyPage.lede} />

      <section className="block" aria-labelledby="registration-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="registration-heading" className="section-title">
                <T locale={locale} value={transparencyPage.registrationTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={transparencyPage.registrationBody} />
              </p>
              <p className="notice">
                <T locale={locale} value={transparencyPage.registrationNote} />
              </p>
            </div>
            <div>
              <ul className="facts">
                <li>
                  <span>
                    <T locale={locale} value={transparencyPage.ukCioLabel} />
                  </span>
                  <span>
                    <PlaceholderChip>
                      <T locale={locale} value={transparencyPage.inProgress} />
                    </PlaceholderChip>
                  </span>
                </li>
                <li>
                  <span>
                    <T locale={locale} value={transparencyPage.pakistanNgoLabel} />
                  </span>
                  <span>
                    <PlaceholderChip>
                      <T locale={locale} value={transparencyPage.inProgress} />
                    </PlaceholderChip>
                  </span>
                </li>
                <li>
                  <span>
                    <T locale={locale} value={transparencyPage.addressLabel} />
                  </span>
                  <span>
                    <PlaceholderChip>
                      <T locale={locale} value={common.toBeConfirmed} />
                    </PlaceholderChip>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="trustees-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="trustees-heading" className="section-title">
                <T locale={locale} value={transparencyPage.trusteesTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={transparencyPage.trusteesBody} />
              </p>
            </div>
            <ul className="facts">
              {[1, 2, 3].map((slot) => (
                <li key={slot}>
                  <span>
                    <PlaceholderChip>
                      <span lang="en" dir="ltr">
                        {aboutPage.trusteeName.en}
                      </span>
                    </PlaceholderChip>
                  </span>
                  <span>
                    <PlaceholderChip>
                      <span lang="en" dir="ltr">
                        {aboutPage.trusteeRole.en}
                      </span>
                    </PlaceholderChip>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="governance-heading">
        <div className="wrap">
          <h2 id="governance-heading" className="section-title">
            <T locale={locale} value={transparencyPage.governanceTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={transparencyPage.governanceBody} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="money-heading">
        <div className="wrap">
          <h2 id="money-heading" className="section-title">
            <T locale={locale} value={transparencyPage.moneyTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={transparencyPage.moneyIntro} />
          </p>
          <ul className="check-list">
            {transparencyPage.moneyLines.map((line) => (
              <li key={line.en}>
                <T locale={locale} value={line} />
              </li>
            ))}
          </ul>
          <p className="section-note">
            <T locale={locale} value={transparencyPage.moneyNote} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="ledger-heading">
        <div className="wrap">
          <h2 id="ledger-heading" className="section-title">
            <T locale={locale} value={transparencyPage.ledgerTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={transparencyPage.ledgerIntro} />
          </p>

          {entries.length === 0 ? (
            <div className="report-empty">
              <p className="report-empty-title">
                <T locale={locale} value={ledgerEmptyState.title} />
              </p>
              <p>
                <T locale={locale} value={ledgerEmptyState.body} />
              </p>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table className="ledger">
                  <caption>
                    <T locale={locale} value={transparencyPage.ledgerTitle} />
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">
                        <T locale={locale} value={transparencyPage.tableDate} />
                      </th>
                      <th scope="col">
                        <T locale={locale} value={transparencyPage.tableDescription} />
                      </th>
                      <th scope="col">
                        <T locale={locale} value={transparencyPage.tableCategory} />
                      </th>
                      <th scope="col" className="n">
                        <T locale={locale} value={transparencyPage.tableAmount} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="num">{formatDate(entry.date)}</td>
                        <td lang="en" dir="ltr">
                          {entry.description}
                          {entry.reportSlug ? (
                            <>
                              {" "}
                              <a href={pathForLocale(locale, `reports/${entry.reportSlug}`)}>
                                <T locale={locale} value={transparencyPage.reportLink} />
                              </a>
                            </>
                          ) : null}
                        </td>
                        <td lang="en" dir="ltr">
                          <span className="mono ledger-kind">
                            {entry.kind === "income" ? (
                              <T locale={locale} value={transparencyPage.kindIncome} />
                            ) : (
                              <T locale={locale} value={transparencyPage.kindExpenditure} />
                            )}
                          </span>
                          {entry.category}
                        </td>
                        <td className="n num">
                          {entry.kind === "income" ? "+" : ""}
                          {formatMoney(entry.amountMinor, entry.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="sub-heading ledger-totals-heading">
                <T locale={locale} value={transparencyPage.totalsTitle} />
              </h3>
              <ul className="facts totals">
                {totals.map((total) => (
                  <li key={total.currency}>
                    <span>
                      <span lang="en" dir="ltr">
                        {total.currency}
                      </span>{" "}
                      <T locale={locale} value={transparencyPage.totalReceived} />
                    </span>
                    <span className="num">
                      {formatMoney(total.incomeMinor, total.currency)}
                    </span>
                  </li>
                ))}
                {totals.map((total) => (
                  <li key={`${total.currency}-spent`}>
                    <span>
                      <span lang="en" dir="ltr">
                        {total.currency}
                      </span>{" "}
                      <T locale={locale} value={transparencyPage.totalSpent} />
                    </span>
                    <span className="num">
                      {formatMoney(total.expenditureMinor, total.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="block rule" aria-labelledby="figures-heading">
        <div className="wrap">
          <h2 id="figures-heading" className="section-title">
            <T locale={locale} value={transparencyPage.figuresTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={transparencyPage.figuresIntro} />
          </p>

          {figures.length === 0 ? (
            <div className="report-empty">
              <p className="report-empty-title">
                <T locale={locale} value={figuresEmptyState.title} />
              </p>
              <p>
                <T locale={locale} value={figuresEmptyState.body} />
              </p>
            </div>
          ) : (
            <ul className="facts">
              {figures.map((figure) => (
                <li key={figure.id}>
                  <span>
                    <T locale={locale} value={figure.label} />{" "}
                    <span className="table-note">
                      <T locale={locale} value={transparencyPage.figureAsOf} />{" "}
                      <span className="num">{formatDate(figure.asOf)}</span>
                    </span>
                  </span>
                  <span className="num">
                    {figure.value} <span lang="en" dir="ltr">{figure.unit}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="block rule" aria-labelledby="ask-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="ask-heading" className="section-title">
                <T locale={locale} value={transparencyPage.askTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={transparencyPage.askBody} />
              </p>
            </div>
            <div className="actions">
              <a className="btn btn-ghost" href={pathForLocale(locale, "contact")}>
                <T locale={locale} value={transparencyPage.askContact} /> <Arrow />
              </a>
            </div>
          </div>
          <p className="table-note">
            <a href={pathForLocale(locale, "reports")}>
              <T locale={locale} value={common.readTheReports} /> <Arrow />
            </a>
            {" / "}
            <a href={pathForLocale(locale, "policies")}>
              <T locale={locale} value={policiesIndex.title} /> <Arrow />
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
