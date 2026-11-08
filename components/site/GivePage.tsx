import { common, givePage, nav, plainText, policyPages } from "@/content/copy";
import { whatsappLink } from "@/lib/contact";
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

export function GivePage({ locale }: { locale: Locale }) {
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
            </div>
            <div>
              <h3 className="sub-heading">
                <T locale={locale} value={givePage.safetyTitle} />
              </h3>
              <p className="body-copy">
                <T locale={locale} value={givePage.safetyBody} />
              </p>
            </div>
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
              <T locale={locale} value={policyPages["zakat-sadaqah"].title} /> <Arrow />
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
          <div className="actions">
            <a
              className="btn btn-solid"
              href={whatsappLink(plainText(locale, givePage.receiptsMessage))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${plainText(locale, givePage.receiptsWhatsApp)} (${plainText(locale, common.opensInNewTab)})`}
            >
              <T locale={locale} value={givePage.receiptsWhatsApp} /> <Arrow />
            </a>
          </div>
          <p className="section-note">
            <T locale={locale} value={givePage.receiptsNote} />
          </p>
          <p className="table-note">
            <a href={pathForLocale(locale, "transparency")}>
              <T locale={locale} value={givePage.ledgerLink} /> <Arrow />
            </a>
            {" / "}
            <a href={pathForLocale(locale, "field-trips")}>
              <T locale={locale} value={givePage.fieldTripsLink} /> <Arrow />
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
