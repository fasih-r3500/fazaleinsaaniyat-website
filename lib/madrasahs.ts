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
  const progress = new Map<string, number>();
  const counts = new Map<string, number>();

  for (const row of rows) {
    counts.set(row.city, (counts.get(row.city) ?? 0) + 1);
  }

  return rows.map((row) => {
    const index = progress.get(row.city) ?? 0;
    progress.set(row.city, index + 1);

    const point = projectMadrasah(row.lat, row.lng);
    const groupSize = counts.get(row.city) ?? 1;
    // The marker name is the place itself. Where a city holds more than one madrasah the
    // position is named so each marker keeps its own title without an internal ID.
    const label =
      groupSize === 1 ? row.place : `${row.place} (${index + 1} of ${groupSize})`;

    if (groupSize === 1) {
      return { label, ...point };
    }

    // Repeated cities fan around the city point so every madrasah keeps its own marker.
    const angle = (2 * Math.PI * index) / groupSize;
    return {
      label,
      x: point.x + Math.cos(angle) * 4.6,
      y: point.y + Math.sin(angle) * 4.6,
    };
  });
}
