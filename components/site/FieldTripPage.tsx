import Image from "next/image";
import type { ReactNode } from "react";
import {
  common,
  fieldTripPage,
  nav,
  plainText,
} from "@/content/copy";
import type { FieldTrip } from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";
import { pathForLocale, type Locale } from "@/lib/locale";
import { FieldTripBody } from "./FieldTripBody";
import { T } from "./BilingualText";

type Tile = {
  key: string;
  label: ReactNode;
  value: ReactNode;
};

export function FieldTripPage({
  locale,
  fieldTrip,
}: {
  locale: Locale;
  fieldTrip: FieldTrip;
}) {
  const dir = fieldTrip.language === "ur" ? "rtl" : "ltr";

  const tiles: Tile[] = fieldTrip.stats.map((stat, index) => ({
    key: `stat-${index}`,
    label: stat.label,
    value: stat.value,
  }));

  if (fieldTrip.householdsServed !== null) {
    tiles.push({
      key: "households",
      label: <T locale={locale} value={fieldTripPage.households} />,
      value: fieldTrip.householdsServed,
    });
  }

  if (fieldTrip.cost) {
    tiles.push({
      key: "cost",
      label: <T locale={locale} value={fieldTripPage.cost} />,
      value: formatMoney(fieldTrip.cost.amountMinor, fieldTrip.cost.currency),
    });
  }

  const hasDetails =
    fieldTrip.organiser !== null ||
    fieldTrip.peopleMet.length > 0 ||
    fieldTrip.partners.length > 0 ||
    fieldTrip.dataFile !== null;

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={pathForLocale(locale, "")}>
              <T locale={locale} value={common.home} />
            </a>
            <span aria-hidden="true"> / </span>
            <a href={pathForLocale(locale, "field-trips")}>
              <T locale={locale} value={nav.fieldTrips} />
            </a>
            <span aria-hidden="true"> / </span>
            <span>
              <T locale={locale} value={fieldTripPage.crumb} />
            </span>
          </nav>
          <p className="mono page-head-meta">
            {formatDate(fieldTrip.date)} /{" "}
            <span lang={fieldTrip.language} dir={dir}>
              {fieldTrip.place}
            </span>
          </p>
          <h1 lang={fieldTrip.language} dir={dir}>
            {fieldTrip.title}
          </h1>
        </div>
      </div>

      <div className="block">
        <div className="wrap">
          {fieldTrip.language !== locale ? (
            <p className="notice">
              <T
                locale={locale}
                value={
                  fieldTrip.language === "en"
                    ? fieldTripPage.languageNoteEnglish
                    : fieldTripPage.languageNoteUrdu
                }
              />
            </p>
          ) : null}

          {tiles.length > 0 ? (
            <ul
              className="trip-stats"
              aria-label={plainText(locale, fieldTripPage.statsLabel)}
            >
              {tiles.map((tile) => (
                <li key={tile.key} className="trip-stat">
                  <b className="num">{tile.value}</b>
                  <span>{tile.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className={hasDetails ? "split" : undefined}>
            <div className="prose" lang={fieldTrip.language} dir={dir}>
              <FieldTripBody body={fieldTrip.body} locale={locale} />
            </div>

            {hasDetails ? (
              <aside
                className="panel trip-details"
                aria-labelledby="trip-details-heading"
              >
                <h2 id="trip-details-heading" className="panel-heading">
                  <T locale={locale} value={fieldTripPage.detailsTitle} />
                </h2>

                {fieldTrip.organiser ? (
                  <ul className="facts">
                    <li>
                      <span>
                        <T locale={locale} value={fieldTripPage.organiser} />
                      </span>
                      <span>{fieldTrip.organiser}</span>
                    </li>
                  </ul>
                ) : null}

                {fieldTrip.peopleMet.length > 0 ? (
                  <div className="trip-people">
                    <h3 className="panel-subheading">
                      <T locale={locale} value={fieldTripPage.peopleMet} />
                    </h3>
                    <ul>
                      {fieldTrip.peopleMet.map((person, index) => (
                        <li key={`${person}-${index}`}>{person}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {fieldTrip.partners.length > 0 ? (
                  <div className="trip-people">
                    <h3 className="panel-subheading">
                      <T locale={locale} value={fieldTripPage.partners} />
                    </h3>
                    <ul>
                      {fieldTrip.partners.map((partner, index) => (
                        <li key={`${partner}-${index}`}>{partner}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {fieldTrip.dataFile ? (
                  <div className="data-file">
                    <h3 className="panel-subheading">
                      <T locale={locale} value={fieldTripPage.dataFile} />
                    </h3>
                    <a href={fieldTrip.dataFile.url} download>
                      <T locale={locale} value={fieldTripPage.download} />
                    </a>
                    <p className="table-note">
                      <T locale={locale} value={fieldTripPage.dataFileNote} />
                    </p>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>

          {fieldTrip.photos.length > 0 ? (
            <section
              className="trip-photos"
              aria-labelledby="trip-photos-heading"
            >
              <h2 id="trip-photos-heading" className="sub-heading">
                <T locale={locale} value={fieldTripPage.photosTitle} />
              </h2>
              <div className="trip-photo-grid">
                {fieldTrip.photos.map((photo, index) => (
                  <figure className="trip-photo" key={`${photo.url}-${index}`}>
                    <div className="trip-photo-media">
                      <Image
                        src={photo.url}
                        alt={photo.caption ?? ""}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                      />
                    </div>
                    {photo.caption ? (
                      <figcaption>{photo.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <p className="table-note trip-back">
            <a href={pathForLocale(locale, "field-trips")}>
              <span className="arrow" aria-hidden="true">
                ←
              </span>{" "}
              <T locale={locale} value={fieldTripPage.backToFieldTrips} />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
