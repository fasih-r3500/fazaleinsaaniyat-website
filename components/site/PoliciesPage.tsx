import {
  plainText,
  policiesIndex,
  policyPages,
  policySlugs,
} from "@/content/copy";
import { pathForLocale, type Locale } from "@/lib/locale";
import { firstSentence } from "@/lib/text";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function PoliciesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={locale}
        title={policiesIndex.title}
        lede={policiesIndex.lede}
      />

      <section className="block">
        <div className="wrap">
          <nav aria-label={plainText(locale, policiesIndex.listLabel)}>
            <ul className="policy-index">
              {policySlugs.map((slug) => {
                const policy = policyPages[slug];
                return (
                  <li key={slug}>
                    <a
                      className="policy-index-row"
                      href={pathForLocale(locale, `policies/${slug}`)}
                    >
                      <div>
                        <h2>
                          <T locale={locale} value={policy.title} />
                        </h2>
                        <p className="policy-index-summary">
                          {firstSentence(plainText(locale, policy.lede))}
                        </p>
                      </div>
                      <Arrow />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
