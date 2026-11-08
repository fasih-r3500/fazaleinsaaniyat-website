import {
  contactPage,
  footer,
  policyPage,
  policyPages,
  transparencyPage,
  type PolicySlug,
} from "@/content/copy";
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

export function PolicyPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: PolicySlug;
}) {
  const policy = policyPages[slug];

  return (
    <>
      <PageHead locale={locale} title={policy.title} lede={policy.lede} />

      <section className="block" aria-labelledby="status-heading">
        <div className="wrap">
          <h2 id="status-heading" className="section-title">
            <T locale={locale} value={policyPage.statusTitle} />
          </h2>
          <p className="body-copy">
            <T locale={locale} value={policy.status} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="covers-heading">
        <div className="wrap">
          <h2 id="covers-heading" className="section-title">
            <T locale={locale} value={policyPage.coversTitle} />
          </h2>
          <ul className="check-list">
            {policy.covers.map((item) => (
              <li key={item.en}>
                <T locale={locale} value={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block rule" aria-labelledby="now-heading">
        <div className="wrap">
          <h2 id="now-heading" className="section-title">
            <T locale={locale} value={policyPage.nowTitle} />
          </h2>
          <ul className="check-list">
            {policy.now.map((item) => (
              <li key={item.en}>
                <T locale={locale} value={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block rule" aria-labelledby="meanwhile-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="meanwhile-heading" className="section-title">
                <T locale={locale} value={policyPage.meanwhileTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={policy.help} />
              </p>
            </div>
            <div className="actions">
              <a className="btn btn-ghost" href={pathForLocale(locale, "contact")}>
                <T locale={locale} value={contactPage.title} /> <Arrow />
              </a>
            </div>
          </div>
          <p className="table-note">
            <a href={pathForLocale(locale, "policies")}>
              <T locale={locale} value={footer.allPolicies} /> <Arrow />
            </a>
            {slug === "zakat-sadaqah" ? (
              <>
                {" / "}
                <a href={pathForLocale(locale, "transparency")}>
                  <T locale={locale} value={transparencyPage.title} /> <Arrow />
                </a>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </>
  );
}
