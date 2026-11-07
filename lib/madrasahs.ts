import madrasahRows from "@/content/madrasahs.json";
import pakistan from "@/content/pakistan.json";

export type Madrasah = {
  id: string;
  place: string;
  city: string;
  province: string | null;
  lat: number;
  lng: number;
};

export type MadrasahGroup = {
  city: string;
  sites: Madrasah[];
};

export type MapPoint = {
  // Visitor facing marker name. The madrasah ID stays in the data and is never projected.
  label: string;
  x: number;
  y: number;
};

export const madrasahs: Madrasah[] = madrasahRows;

export const pakistanOutline = pakistan;

// Coordinates are the town or city where each madrasah operates. The record for each
// choice is content/MADRASAH-COORDINATES.md. The outline anchor is Shikarpur.
export function projectMadrasah(lat: number, lng: number) {
  const [anchorX, anchorY] = pakistan.shikarpur;
  return {
    x: anchorX + (lng - 68.64) * 35.0,
    y: anchorY - (lat - 27.96) * 42.0,
  };
}

export function groupMadrasahsByCity(rows: Madrasah[]): MadrasahGroup[] {
  const groups = new Map<string, Madrasah[]>();

  for (const row of rows) {
    const current = groups.get(row.city);
    if (current) {
      current.push(row);
    } else {
      groups.set(row.city, [row]);
    }
  }

  return Array.from(groups, ([city, sites]) => ({ city, sites }));
}

export function getMapPoints(rows: Madrasah[]): MapPoint[] {
  const placeProgress = new Map<string, number>();
  const placeCounts = new Map<string, number>();
  const cityProgress = new Map<string, number>();
  const cityCounts = new Map<string, number>();

  for (const row of rows) {
    placeCounts.set(row.place, (placeCounts.get(row.place) ?? 0) + 1);
    cityCounts.set(row.city, (cityCounts.get(row.city) ?? 0) + 1);
  }

  return rows.map((row) => {
    const placeIndex = placeProgress.get(row.place) ?? 0;
    placeProgress.set(row.place, placeIndex + 1);
    const cityIndex = cityProgress.get(row.city) ?? 0;
    cityProgress.set(row.city, cityIndex + 1);

    const point = projectMadrasah(row.lat, row.lng);
    const cityCount = cityCounts.get(row.city) ?? 1;
    const placeCount = placeCounts.get(row.place) ?? 1;
    // The marker name is the place itself. Where a place holds more than one madrasah
    // the marker is named so each keeps its own title without an internal ID.
    const label =
      placeCount === 1
        ? row.place
        : `${row.place} (${placeIndex + 1} of ${placeCount})`;

    if (cityCount === 1) {
      return { label, ...point };
    }

    // Repeated cities fan around the city point so every madrasah keeps its own marker.
    const angle = (2 * Math.PI * cityIndex) / cityCount;
    return {
      label,
      x: point.x + Math.cos(angle) * 4.6,
      y: point.y + Math.sin(angle) * 4.6,
    };
  });
}
