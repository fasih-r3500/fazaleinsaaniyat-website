import {
  getMapPoints,
  madrasahs,
  pakistanOutline,
} from "@/lib/madrasahs";

export function SiteMap({
  title,
  description,
  id = "madrasah-map",
}: {
  title: string;
  description: string;
  id?: string;
}) {
  const points = getMapPoints(madrasahs);

  return (
    <svg
      className="map map-pakistan"
      viewBox={`0 0 ${pakistanOutline.w} ${pakistanOutline.h}`}
      role="img"
      aria-label={title}
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <path className="map-land" d={pakistanOutline.d} />
      {points.map((point) => (
        <circle
          key={point.id}
          className="map-site"
          cx={point.x}
          cy={point.y}
          r={3.4}
        >
          <title>{`${point.id} ${point.place}`}</title>
        </circle>
      ))}
    </svg>
  );
}
