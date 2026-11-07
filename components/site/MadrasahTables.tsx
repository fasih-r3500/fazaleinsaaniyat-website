import type { Locale } from "@/lib/locale";
import { groupMadrasahsByCity, madrasahs } from "@/lib/madrasahs";
import { madrasahsPage } from "@/content/copy";
import { T } from "./BilingualText";

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
          <th scope="col">
            <T locale={locale} value={madrasahsPage.tableIds} />
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr key={group.city}>
            <th scope="row">{group.city}</th>
            <td className="n num">{group.sites.length}</td>
            <td className="ids">{group.sites.map((site) => site.id).join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MadrasahPlaceList() {
  const groups = groupMadrasahsByCity(madrasahs);

  return (
    <div className="place-list">
      {groups.map((group) => (
        <section key={group.city} className="place-group" aria-labelledby={`place-${group.city.replace(/\s+/g, "-").toLowerCase()}`}>
          <h3 id={`place-${group.city.replace(/\s+/g, "-").toLowerCase()}`}>
            {group.city}
            <span className="place-count num">{group.sites.length}</span>
          </h3>
          <dl className="site-rows">
            {group.sites.map((site) => (
              <div key={site.id} className="site-row">
                <dt>
                  <span className="num">{site.id}</span>
                </dt>
                <dd>
                  <span>{site.place}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
