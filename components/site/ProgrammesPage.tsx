import { programmesPage, common } from "@/content/copy";
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

export function ProgrammesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead
        locale={locale}
        title={programmesPage.title}
        lede={programmesPage.lede}
      />

      <section className="block" aria-labelledby="work-heading">
        <div className="wrap">
          <h2 id="work-heading" className="section-title">
            <T locale={locale} value={programmesPage.title2} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={programmesPage.intro} />
          </p>
          <ul className="initiative-grid initiative-grid-rows">
            {programmesPage.items.map((item, index) => (
              <li key={item.title.en}>
                <span className="mono k">{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <T locale={locale} value={item.title} />
                </h3>
                <p>
                  <T locale={locale} value={item.body} />
                </p>
              </li>
            ))}
          </ul>
          <p className="section-note">
            <T locale={locale} value={programmesPage.noNumbers} />
          </p>
        </div>
      </section>

      <section className="block rule" aria-labelledby="collaboration-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="collaboration-heading" className="section-title">
                <T locale={locale} value={programmesPage.collaborationTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={programmesPage.collaborationBody} />
              </p>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={programmesPage.hbmTitle} />
              </h3>
              <p>
                <T locale={locale} value={programmesPage.hbmBody} />
              </p>
              <a className="text-link" href={pathForLocale(locale, "madrasahs")}>
                <T locale={locale} value={programmesPage.hbmLink} /> <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div>
            <h2>
              <T locale={locale} value={common.give} />
            </h2>
            <p className="mono">
              <T locale={locale} value={programmesPage.ctaNote} />
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-solid" href={pathForLocale(locale, "give")}>
              <T locale={locale} value={common.give} /> <Arrow />
            </a>
            <a className="btn btn-ghost-light" href={pathForLocale(locale, "get-help")}>
              <T locale={locale} value={common.getHelp} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
