import { aboutPage, common, givePage, nav } from "@/content/copy";
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

export function GivePage({ locale }: { locale: Locale }) {
  const details = [
    givePage.accountTitleLabel,
    givePage.bankLabel,
    givePage.ibanLabel,
    givePage.branchLabel,
    givePage.referenceLabel,
  ];

  return (
    <>
      <PageHead locale={locale} title={givePage.title} lede={givePage.lede} />

      <section className="block" aria-labelledby="bank-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="bank-heading" className="section-title">
                <T locale={locale} value={givePage.bankTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={givePage.bankBody} />
              </p>
              <p className="notice">
                <T locale={locale} value={givePage.safetyBody} />
              </p>
            </div>
            <ul className="facts">
              {details.map((label) => (
                <li key={label.en}>
                  <span>
                    <T locale={locale} value={label} />
                  </span>
                  <span>
                    <PlaceholderChip>
                      <T locale={locale} value={common.toBeConfirmed} />
                    </PlaceholderChip>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="funds-heading">
        <div className="wrap">
          <h2 id="funds-heading" className="section-title">
            <T locale={locale} value={givePage.fundsTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={givePage.fundsIntro} />
          </p>
          <ul className="initiative-grid fund-grid">
            {givePage.funds.map((fund, index) => (
              <li key={fund.name.en}>
                <span className="mono k">{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <T locale={locale} value={fund.name} />
                </h3>
                <p>
                  <T locale={locale} value={fund.body} />
                </p>
              </li>
            ))}
          </ul>
          <p className="section-note">
            <T locale={locale} value={givePage.fundsNote} />
          </p>
          <p className="table-note">
            <a href={pathForLocale(locale, "policies/zakat-sadaqah")}>
              <T locale={locale} value={aboutPage.policies[3]} /> <Arrow />
            </a>
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="receipts-heading">
        <div className="wrap">
          <h2 id="receipts-heading" className="section-title">
            <T locale={locale} value={givePage.receiptsTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={givePage.receiptsBody} />
          </p>
          <p className="status-line">
            <PlaceholderChip>
              <T locale={locale} value={givePage.receiptsChip} />
            </PlaceholderChip>
          </p>
          <p className="section-note">
            <T locale={locale} value={givePage.receiptsNote} />
          </p>
          <p className="table-note">
            <a href={pathForLocale(locale, "transparency")}>
              <T locale={locale} value={givePage.ledgerLink} /> <Arrow />
            </a>
            {" / "}
            <a href={pathForLocale(locale, "reports")}>
              <T locale={locale} value={givePage.reportsLink} /> <Arrow />
            </a>
            {" / "}
            <a href={pathForLocale(locale, "contact")}>
              <T locale={locale} value={nav.contact} />
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
