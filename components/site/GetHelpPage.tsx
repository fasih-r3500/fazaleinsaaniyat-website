import { getHelpPage, policyPages } from "@/content/copy";
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

export function GetHelpPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead locale={locale} title={getHelpPage.title} lede={getHelpPage.lede} />

      <section className="block" aria-labelledby="ask-heading">
        <div className="wrap">
          <h2 id="ask-heading" className="section-title">
            <T locale={locale} value={getHelpPage.askTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={getHelpPage.askBody} />
          </p>
          <ol className="step-list">
            {getHelpPage.steps.map((step) => (
              <li key={step.en}>
                <T locale={locale} value={step} />
              </li>
            ))}
          </ol>
          <p className="notice">
            <T locale={locale} value={getHelpPage.channelsNote} />
          </p>
          <p className="table-note">
            <a href={pathForLocale(locale, "contact")}>
              <T locale={locale} value={getHelpPage.contactLink} /> <Arrow />
            </a>
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="ask-about-heading">
        <div className="wrap">
          <h2 id="ask-about-heading" className="section-title">
            <T locale={locale} value={getHelpPage.askAboutTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={getHelpPage.askAboutIntro} />
          </p>
          <ul className="fact-list">
            {getHelpPage.askAboutItems.map((item) => (
              <li key={item.en}>
                <T locale={locale} value={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block rule" aria-labelledby="stored-heading">
        <div className="wrap">
          <h2 id="stored-heading" className="section-title">
            <T locale={locale} value={getHelpPage.storedTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={getHelpPage.storedBody} />
          </p>
          <p className="body-copy">
            <T locale={locale} value={getHelpPage.storedBody2} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="retention-heading">
        <div className="wrap">
          <h2 id="retention-heading" className="section-title">
            <T locale={locale} value={getHelpPage.retentionTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={getHelpPage.retentionBody} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="not-asked-heading">
        <div className="wrap">
          <h2 id="not-asked-heading" className="section-title">
            <T locale={locale} value={getHelpPage.notAskedTitle} />
          </h2>
          <ul className="fact-list">
            {getHelpPage.notAskedItems.map((item) => (
              <li key={item.en}>
                <T locale={locale} value={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block rule">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="danger-heading" className="section-title">
                <T locale={locale} value={getHelpPage.dangerTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={getHelpPage.dangerBody} />
              </p>
            </div>
            <div>
              <h2 id="limit-heading" className="section-title">
                <T locale={locale} value={getHelpPage.limitTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={getHelpPage.limitBody} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div>
            <h2>
              <T locale={locale} value={getHelpPage.title} />
            </h2>
            <p className="mono">
              <T locale={locale} value={getHelpPage.askTitle} />
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-solid" href={pathForLocale(locale, "contact")}>
              <T locale={locale} value={getHelpPage.contactLink} /> <Arrow />
            </a>
            <a
              className="btn btn-ghost-light"
              href={pathForLocale(locale, "policies/privacy")}
            >
              <T locale={locale} value={policyPages.privacy.title} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
