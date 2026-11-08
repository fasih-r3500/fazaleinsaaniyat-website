import {
  contactPage,
  footer,
  plainText,
  policyPage,
  policyPages,
  transparencyPage,
  type PolicySlug,
} from "@/content/copy";
import { policyDocuments, policySectionId } from "@/content/policy-documents";
import { contact, contactLinks } from "@/lib/contact";
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

/**
 * The contact channels a reader needs to ask for a copy or a deletion. The
 * values come from `lib/contact`, so a phone or address change is one edit.
 */
function ContactFacts({ locale }: { locale: Locale }) {
  return (
    <ul className="facts channel-list policy-contacts">
      <li>
        <span>
          <T locale={locale} value={contactPage.phoneLabel} />
        </span>
        <span className="channel-value">
          <a href={contactLinks.phone} dir="ltr">
            {contact.phone}
          </a>
        </span>
      </li>
      <li>
        <span>
          <T locale={locale} value={contactPage.emailLabel} />
        </span>
        <span className="channel-value">
          <a href={contactLinks.email} dir="ltr">
            {contact.email}
          </a>
        </span>
      </li>
      <li>
        <span>
          <T locale={locale} value={contactPage.addressLabel} />
        </span>
        <span className="channel-value">
          <span dir="ltr">{contact.address}</span>
        </span>
      </li>
    </ul>
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
  const document = policyDocuments[slug];

  return (
    <>
      <PageHead locale={locale} title={policy.title} lede={policy.lede} />

      <section className="block" aria-label={plainText(locale, policy.title)}>
        <div className="wrap">
          <nav
            className="policy-contents"
            aria-labelledby="policy-contents-title"
          >
            <h2 id="policy-contents-title" className="contents-title">
              <T locale={locale} value={policyPage.contentsTitle} />
            </h2>
            <ol className="contents-list">
              {document.sections.map((section, index) => (
                <li key={section.heading.en}>
                  <a href={`#${policySectionId(section.heading)}`}>
                    <span className="contents-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="contents-label">
                      <T locale={locale} value={section.heading} />
                    </span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose policy-document">
            {document.sections.map((section) => (
              <section key={section.heading.en}>
                <h2 id={policySectionId(section.heading)}>
                  <T locale={locale} value={section.heading} />
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.en}>
                    <T locale={locale} value={paragraph} />
                  </p>
                ))}
                {section.contact ? <ContactFacts locale={locale} /> : null}
              </section>
            ))}
          </div>
          <p className="section-note">
            <T locale={locale} value={footer.lastUpdated} />{" "}
            <T locale={locale} value={footer.lastUpdatedDate} />
          </p>
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
            {slug === "privacy" || slug === "terms" ? (
              <>
                {" / "}
                <a
                  href={pathForLocale(
                    locale,
                    slug === "privacy" ? "policies/terms" : "policies/privacy",
                  )}
                >
                  <T
                    locale={locale}
                    value={
                      slug === "privacy"
                        ? policyPages.terms.title
                        : policyPages.privacy.title
                    }
                  />{" "}
                  <Arrow />
                </a>
              </>
            ) : null}
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
