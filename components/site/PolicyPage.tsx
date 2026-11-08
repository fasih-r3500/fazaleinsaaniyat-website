import {
  contactPage,
  footer,
  policyPage,
  policyPages,
  transparencyPage,
  type PolicySlug,
} from "@/content/copy";
import { policyDocuments } from "@/content/policy-documents";
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
  const document =
    slug === "privacy" || slug === "terms" ? policyDocuments[slug] : null;

  return (
    <>
      <PageHead locale={locale} title={policy.title} lede={policy.lede} />

      {document ? (
        <section className="block" aria-label={policy.title.en}>
          <div className="wrap">
            <div className="prose policy-document">
              {document.sections.map((section) => (
                <section key={section.heading.en}>
                  <h2>
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
      ) : (
        <>
          <section className="block" aria-labelledby="covers-heading">
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
        </>
      )}

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
