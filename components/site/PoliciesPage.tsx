import { aboutPage, policiesIndex, policyPages, type PolicySlug } from "@/content/copy";
import { pathForLocale, type Locale } from "@/lib/locale";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";

const slugs: PolicySlug[] = ["privacy", "safeguarding", "complaints", "zakat-sadaqah"];

export function PoliciesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={locale}
        title={policiesIndex.title}
        lede={policiesIndex.lede}
      />

      <section className="block" aria-labelledby="policies-heading">
        <div className="wrap">
          <h2 id="policies-heading" className="section-title">
            <T locale={locale} value={aboutPage.policyTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={policiesIndex.intro} />
          </p>
          <ul className="policy-list">
            {slugs.map((slug) => (
              <li key={slug}>
                <a href={pathForLocale(locale, `policies/${slug}`)}>
                  <T locale={locale} value={policyPages[slug].title} />
                </a>
                <span className="policy-status">
                  <T locale={locale} value={policiesIndex.status} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
