import { aboutPage, common } from "@/content/copy";
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

export function AboutPage({ locale }: { locale: Locale }) {
  const facts = [
    [aboutPage.founded, aboutPage.foundedValue],
    [aboutPage.basedIn, aboutPage.basedInValue],
    [aboutPage.runBy, aboutPage.runByValue],
    [aboutPage.trusteesFact, aboutPage.trusteesFactValue],
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
              <p className="body-copy">
                <T locale={locale} value={aboutPage.howWeWorkBody3} />
              </p>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={aboutPage.reportTitle} />
              </h3>
              <p>
                <T locale={locale} value={aboutPage.reportBody} />
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
                    <span>
                      <T locale={locale} value={policy} />
                    </span>
                    <span className="ph">
                      <T locale={locale} value={common.toBePublished} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="trustees-heading">
        <div className="wrap">
          <div className="trustees">
            <h2 id="trustees-heading">
              <T locale={locale} value={aboutPage.trusteesTitle} />
            </h2>
            <p className="mono">
              <T locale={locale} value={aboutPage.trusteesNote} />
            </p>
            <ul>
              {[1, 2, 3].map((slot) => (
                <li key={slot}>
                  <PlaceholderChip>
                    <span lang="en" dir="ltr">
                      {aboutPage.trusteeName.en}
                    </span>
                  </PlaceholderChip>
                  <span className="mono">
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
    </>
  );
}
