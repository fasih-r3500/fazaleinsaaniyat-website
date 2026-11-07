import type { Locale } from "@/lib/locale";
import { groupMadrasahsByCity, madrasahs } from "@/lib/madrasahs";
import { madrasahsPage } from "@/content/copy";
import { T } from "./BilingualText";

function citySlug(city: string) {
  return city.replace(/\s+/g, "-").toLowerCase();
}

export function MadrasahSummaryTable({ locale }: { locale: Locale }) {
  const groups = groupMadrasahsByCity(madrasahs);

  return (
    <table className="ledger sites">
      <caption>
        <T locale={locale} value={madrasahsPage.tableCaption} />
      </caption>
      <thead>
        <tr>
          <th scope="col">
            <T locale={locale} value={madrasahsPage.tablePlace} />
          </th>
          <th scope="col" className="n">
            <T locale={locale} value={madrasahsPage.tableCount} />
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr key={group.city}>
            <th scope="row">{group.city}</th>
            <td className="n num">{group.sites.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// The madrasah identifiers are internal keys and never reach the page. Each place is named
// once per city, and a place that holds more than one madrasah carries its count so the
// repetition stays visible without an ID.
export function MadrasahPlaceList() {
  const groups = groupMadrasahsByCity(madrasahs).map((group) => {
    const places = new Map<string, number>();
    for (const site of group.sites) {
      places.set(site.place, (places.get(site.place) ?? 0) + 1);
    }

    return {
      city: group.city,
      total: group.sites.length,
      places: Array.from(places, ([place, count]) => ({ place, count })),
    };
  });

  return (
    <div className="place-list">
      {groups.map((group) => (
        <section
          key={group.city}
          className="place-group"
          aria-labelledby={`place-${citySlug(group.city)}`}
        >
          <h3 id={`place-${citySlug(group.city)}`}>
            {group.city}
            <span className="place-count num">{group.total}</span>
          </h3>
          <ul className="site-rows">
            {group.places.map((place) => (
              <li key={place.place} className="site-row">
                <span>{place.place}</span>
                {place.count > 1 ? (
                  <span className="place-count num">{place.count}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
