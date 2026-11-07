import { common, contactPage, getHelpPage } from "@/content/copy";
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

export function ContactPage({ locale }: { locale: Locale }) {
  const channels = [
    contactPage.phoneLabel,
    contactPage.whatsappLabel,
    contactPage.emailLabel,
    contactPage.postLabel,
    contactPage.hoursLabel,
  ];

  return (
    <>
      <PageHead locale={locale} title={contactPage.title} lede={contactPage.lede} />

      <section className="block" aria-labelledby="channels-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="channels-heading" className="section-title">
                <T locale={locale} value={contactPage.channelsTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={contactPage.channelsIntro} />
              </p>
              <p className="notice">
                <T locale={locale} value={contactPage.channelsNote} />
              </p>
            </div>
            <ul className="facts">
              {channels.map((label) => (
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

      <section className="block rule" aria-labelledby="volunteer-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="volunteer-heading" className="section-title">
                <T locale={locale} value={contactPage.volunteerTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={contactPage.volunteerBody} />
              </p>
              <p className="body-copy">
                <T locale={locale} value={contactPage.volunteerBody2} />
              </p>
            </div>
            <div className="panel">
              <p className="mono">
                <T locale={locale} value={contactPage.volunteerTitle} />
              </p>
              <p>
                <PlaceholderChip>
                  <T locale={locale} value={contactPage.volunteerChip} />
                </PlaceholderChip>
              </p>
              <p className="table-note">
                <a href={pathForLocale(locale, "get-help")}>
                  <T locale={locale} value={getHelpPage.title} /> <Arrow />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block rule" aria-labelledby="complaints-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="complaints-heading" className="section-title">
                <T locale={locale} value={contactPage.complaintsTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={contactPage.complaintsBody} />
              </p>
              <p className="table-note">
                <a href={pathForLocale(locale, "policies/complaints")}>
                  <T locale={locale} value={contactPage.complaintsLink} /> <Arrow />
                </a>
              </p>
            </div>
            <div>
              <h2 id="collaboration-heading" className="section-title">
                <T locale={locale} value={contactPage.collabTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={contactPage.collabBody} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
