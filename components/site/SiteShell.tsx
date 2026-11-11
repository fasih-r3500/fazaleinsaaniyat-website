import type { ReactNode } from "react";
import { preload } from "react-dom";
import {
  footer,
  common,
  nav,
  plainText,
  site,
} from "@/content/copy";
import { contact, socialOrder, socialProfiles } from "@/lib/contact";
import {
  dirForLocale,
  otherLocale,
  pathForLocale,
  type Locale,
} from "@/lib/locale";
import { Mark } from "./Mark";
import { T } from "./BilingualText";

type NavKey =
  | "madrasahs"
  | "initiatives"
  | "field-trips"
  | "transparency"
  | "about"
  | "contact";

const navItems: { key: NavKey; label: typeof nav.madrasahs; href: string }[] = [
  { key: "madrasahs", label: nav.madrasahs, href: "madrasahs" },
  { key: "initiatives", label: nav.initiatives, href: "initiatives" },
  { key: "field-trips", label: nav.fieldTrips, href: "field-trips" },
  { key: "transparency", label: nav.transparency, href: "transparency" },
  { key: "about", label: nav.about, href: "about" },
  { key: "contact", label: nav.contact, href: "contact" },
];

function NavLinks({
  locale,
  current,
}: {
  locale: Locale;
  current: NavKey | null;
}) {
  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.key}>
          <a
            href={pathForLocale(locale, item.href)}
            aria-current={current === item.key ? "page" : undefined}
            className={current === item.key ? "on" : undefined}
          >
            <T locale={locale} value={item.label} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Lockup({ locale }: { locale: Locale }) {
  const dir = dirForLocale(locale);
  return (
    <a className="lockup" href={pathForLocale(locale, "")} aria-label={locale === "ur" ? site.name.ur ?? site.name.en : site.name.en}>
      <Mark className="mk" />
      <span
        className="lockup-text"
        lang={locale === "ur" ? "ur" : "en"}
        dir={dir}
      >
        <b>{locale === "ur" ? site.shortName.ur : site.shortName.en}</b>
        <i>{locale === "ur" ? site.charityWorks.ur : site.charityWorks.en}</i>
      </span>
    </a>
  );
}

function LanguageSwitch({ locale, path }: { locale: Locale; path: string }) {
  const other = otherLocale(locale);
  const label = other === "ur" ? "اردو" : "English";
  return (
    <a
      href={pathForLocale(other, path)}
      hrefLang={other}
      lang={other}
      dir={dirForLocale(other)}
      className="lang-switch"
    >
      {label}
    </a>
  );
}

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-brand">
            <Lockup locale={locale} />
            <h2 className="footer-heading footer-social-heading">
              <T locale={locale} value={footer.followHeading} />
            </h2>
            <ul className="footer-social">
              {socialOrder.map((key) => {
                const profile = socialProfiles[key];
                const label = footer[key];
                return (
                  <li key={key}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${plainText(locale, label)} ${profile.handle} (${plainText(locale, common.opensInNewTab)})`}
                    >
                      <T locale={locale} value={label} />
                      <span className="footer-handle" dir="ltr">
                        {profile.handle}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">
              <T locale={locale} value={footer.registrationHeading} />
            </h2>
            <ul>
              <li className="footer-registration">
                <T locale={locale} value={footer.ukCio} />
              </li>
              <li className="footer-registration">
                <T locale={locale} value={footer.pakistanNgo} />
              </li>
              <li className="footer-address-row">
                <span className="footer-address-label">
                  <T locale={locale} value={footer.address} />
                </span>
                <span className="footer-address" dir="ltr">
                  {contact.address}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">
              <T locale={locale} value={footer.explore} />
            </h2>
            <ul>
              <li>
                <a href={pathForLocale(locale, "field-trips")}>
                  <T locale={locale} value={footer.fieldTrips} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "madrasahs")}>
                  <T locale={locale} value={footer.madrasahs} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "initiatives")}>
                  <T locale={locale} value={footer.initiatives} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "transparency")}>
                  <T locale={locale} value={footer.transparency} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "about")}>
                  <T locale={locale} value={footer.about} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "give")}>
                  <T locale={locale} value={common.give} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "get-help")}>
                  <T locale={locale} value={common.getHelp} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">
              <T locale={locale} value={footer.policies} />
            </h2>
            <ul>
              <li>
                <a href={pathForLocale(locale, "policies")}>
                  <T locale={locale} value={footer.allPolicies} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "policies/privacy")}>
                  <T locale={locale} value={footer.privacy} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "policies/terms")}>
                  <T locale={locale} value={footer.terms} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "policies/safeguarding")}>
                  <T locale={locale} value={footer.safeguarding} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "policies/complaints")}>
                  <T locale={locale} value={footer.complaints} />
                </a>
              </li>
              <li>
                <a href={pathForLocale(locale, "policies/zakat-sadaqah")}>
                  <T locale={locale} value={footer.zakat} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>
            <T locale={locale} value={footer.copyright} />
          </span>
          <span>
            <T locale={locale} value={footer.lastUpdated} />{" "}
            <T locale={locale} value={footer.lastUpdatedDate} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({
  locale,
  current,
  path,
  children,
}: {
  locale: Locale;
  current: NavKey | null;
  path: string;
  children: ReactNode;
}) {
  const dir = dirForLocale(locale);

  // Poppins is self-hosted. Only the weights the first screen paints are
  // preloaded; the rest arrive through font-display: swap.
  preload("/fonts/site/Poppins-800.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  preload("/fonts/site/Poppins-400.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html lang={locale} dir={dir}>
      <body className={`site-body lang-${locale}`}>
        <a className="skip-link" href="#main">
          <T locale={locale} value={common.skip} />
        </a>
        <header className="site-header">
          <div className="wrap">
            <Lockup locale={locale} />
            <nav className="primary-nav" aria-label={locale === "ur" ? common.mainNav.ur ?? common.mainNav.en : common.mainNav.en}>
              <NavLinks locale={locale} current={current} />
            </nav>
            <div className="header-actions">
              <LanguageSwitch locale={locale} path={path} />
              <a className="btn btn-solid header-give" href={pathForLocale(locale, "give")}>
                <T locale={locale} value={common.give} />
              </a>
            </div>
            <details className="mobile-menu">
              <summary>
                <T locale={locale} value={common.menu} />
              </summary>
              <nav aria-label={locale === "ur" ? common.mainNav.ur ?? common.mainNav.en : common.mainNav.en}>
                <NavLinks locale={locale} current={current} />
                <div className="menu-lang">
                  <LanguageSwitch locale={locale} path={path} />
                </div>
              </nav>
            </details>
          </div>
        </header>
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
