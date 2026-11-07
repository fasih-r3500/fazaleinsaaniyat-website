import { notFound } from "@/content/copy";
import { pathForLocale, type Locale } from "@/lib/locale";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";

export function NotFoundPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHead locale={locale} title={notFound.title} lede={notFound.body} />
      <section className="block">
        <div className="wrap">
          <a className="btn btn-solid" href={pathForLocale(locale, "")}>
            <T locale={locale} value={notFound.backHome} />
          </a>
        </div>
      </section>
    </>
  );
}
