import { aboutPage } from "@/content/copy";
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

export function AboutPage({ locale }: { locale: Locale }) {
  const facts = [
    [aboutPage.basedIn, aboutPage.basedInValue],
    [aboutPage.runBy, aboutPage.runByValue],
  ] as const;

  return (
    <>
      <PageHead locale={locale} title={aboutPage.title} lede={aboutPage.lede} />

      <section className="block" aria-labelledby="statement-heading">
        <div className="wrap">
          <h2 id="statement-heading" className="visually-hidden">
            <T locale={locale} value={aboutPage.title} />
          </h2>
          <div className="statement">
            <div className="statement-body">
              <p>
                <T locale={locale} value={aboutPage.statement} />
              </p>
            </div>
            <ul className="facts">
              {facts.map(([label, value]) => (
                <li key={label.en}>
                  <span>
                    <T locale={locale} value={label} />
                  </span>
                  <span>
                    <T locale={locale} value={value} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="how-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="how-heading" className="section-title">
                <T locale={locale} value={aboutPage.howWeWorkTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={aboutPage.howWeWorkBody} />
              </p>
              <p className="body-copy">
                <T locale={locale} value={aboutPage.howWeWorkBody2} />
              </p>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={aboutPage.fieldTripTitle} />
              </h3>
              <p>
                <T locale={locale} value={aboutPage.fieldTripBody} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="governance-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="governance-heading" className="section-title">
                <T locale={locale} value={aboutPage.governanceTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={aboutPage.governanceBody} />
              </p>
              <div className="actions">
                <a className="btn btn-ghost" href={pathForLocale(locale, "transparency")}>
                  <T locale={locale} value={aboutPage.governanceLink} /> <Arrow />
                </a>
              </div>
            </div>
            <div>
              <h3 className="sub-heading">
                <T locale={locale} value={aboutPage.policyTitle} />
              </h3>
              <ul className="policy-list">
                {aboutPage.policies.map((policy) => (
                  <li key={policy.en}>
                    <T locale={locale} value={policy} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
