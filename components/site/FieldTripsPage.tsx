import Image from "next/image";
import { fieldTripsPage, nav } from "@/content/copy";
import {
  fieldTripsEmptyState,
  getPublishedFieldTrips,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { firstParagraph } from "@/lib/markdown";
import { pathForLocale, type Locale } from "@/lib/locale";
import { FieldGallery } from "./FieldGallery";
import { PageHead } from "./PageHead";
import { T } from "./BilingualText";

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function FieldTripsPage({ locale }: { locale: Locale }) {
  const fieldTrips = getPublishedFieldTrips();

  return (
    <>
      <PageHead
        locale={locale}
        title={fieldTripsPage.title}
        lede={fieldTripsPage.lede}
      />

      <section className="block" aria-labelledby="field-trips-heading">
        <div className="wrap">
          <h2 id="field-trips-heading" className="section-title">
            <T locale={locale} value={fieldTripsPage.listTitle} />
          </h2>
          <p className="section-intro">
            <T locale={locale} value={fieldTripsPage.listIntro} />
          </p>

          {fieldTrips.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">
                <T locale={locale} value={fieldTripsEmptyState.title} />
              </p>
              <p>
                <T locale={locale} value={fieldTripsEmptyState.body} />
              </p>
            </div>
          ) : (
            <ul className="trip-list">
              {fieldTrips.map((fieldTrip) => {
                const dir = fieldTrip.language === "ur" ? "rtl" : "ltr";
                const cover = fieldTrip.photos[0];
                const summary = firstParagraph(fieldTrip.body);

                return (
                  <li key={fieldTrip.slug}>
                    <a
                      className="trip-card"
                      href={pathForLocale(
                        locale,
                        `field-trips/${fieldTrip.slug}`,
                      )}
                    >
                      {cover ? (
                        <div className="trip-card-media">
                          <Image
                            src={cover.url}
                            alt={cover.caption ?? ""}
                            fill
                            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          />
                        </div>
                      ) : null}
                      <div className="trip-card-body">
                        <span className="mono">
                          {formatDate(fieldTrip.date)} /{" "}
                          <span lang={fieldTrip.language} dir={dir}>
                            {fieldTrip.place}
                          </span>
                        </span>
                        <h3 lang={fieldTrip.language} dir={dir}>
                          {fieldTrip.title}
                        </h3>
                        {summary ? (
                          <p
                            className="trip-card-summary"
                            lang={fieldTrip.language}
                            dir={dir}
                          >
                            {summary}
                          </p>
                        ) : null}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <FieldGallery
        locale={locale}
        title={fieldTripsPage.fieldTitle}
        intro={fieldTripsPage.fieldIntro}
        sourceLabel={fieldTripsPage.fieldSource}
      />

      <section className="block rule" aria-labelledby="how-we-trip-heading">
        <div className="wrap">
          <div className="split">
            <div>
              <h2 id="how-we-trip-heading" className="section-title">
                <T locale={locale} value={fieldTripsPage.howTitle} />
              </h2>
              <p className="body-copy">
                <T locale={locale} value={fieldTripsPage.howBody} />
              </p>
            </div>
            <div className="panel">
              <h3>
                <T locale={locale} value={fieldTripsPage.holdsTitle} />
              </h3>
              <ul className="check-list">
                {fieldTripsPage.holdsItems.map((item) => (
                  <li key={item.en}>
                    <T locale={locale} value={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="actions">
            <a className="btn btn-ghost" href={pathForLocale(locale, "transparency")}>
              <T locale={locale} value={nav.transparency} />{" "}
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
