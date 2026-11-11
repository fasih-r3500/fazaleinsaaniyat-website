import { common, nav, notFound } from "@/content/copy";
import { pathForLocale, type Locale } from "@/lib/locale";
import { Mark } from "./Mark";
import { T } from "./BilingualText";

const destinations = [
  { key: "home", label: common.home, href: "" },
  { key: "initiatives", label: nav.initiatives, href: "initiatives" },
  { key: "field-trips", label: nav.fieldTrips, href: "field-trips" },
  { key: "contact", label: nav.contact, href: "contact" },
] as const;

export function NotFoundPage({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Mark className="not-found-mark" />
          <h1>
            <T locale={locale} value={notFound.title} />
          </h1>
          <p className="lede">
            <T locale={locale} value={notFound.body} />
          </p>
        </div>
      </section>
      <section className="block">
        <div className="wrap">
          <h2 className="section-title">
            <T locale={locale} value={notFound.linksTitle} />
          </h2>
          <ul className="paths">
            {destinations.map((destination) => (
              <li key={destination.key}>
                <a href={pathForLocale(locale, destination.href)}>
                  <h3>
                    <T locale={locale} value={destination.label} />
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
