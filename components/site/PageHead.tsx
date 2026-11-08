import { common, type Bilingual } from "@/content/copy";
import { pathForLocale, type Locale } from "@/lib/locale";
import { T } from "./BilingualText";

export function PageHead({
  locale,
  title,
  lede,
}: {
  locale: Locale;
  title: Bilingual;
  lede: Bilingual;
}) {
  return (
    <div className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={pathForLocale(locale, "")}>
            <T locale={locale} value={common.home} />
          </a>
          <span aria-hidden="true"> / </span>
          <span>
            <T locale={locale} value={title} />
          </span>
        </nav>
        <h1>
          <T locale={locale} value={title} />
        </h1>
        <p className="lede">
          <T locale={locale} value={lede} />
        </p>
      </div>
    </div>
  );
}
