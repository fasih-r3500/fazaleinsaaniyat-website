import { Fragment } from "react";

// The design board's ticker: each English phrase followed by its Urdu pair,
// in the board's recorded order. The strip is decorative and shows the same
// pairs in both language trees, as the board does.
const pairs = [
  { en: "Food rations", ur: "راشن" },
  { en: "Education", ur: "تعلیم" },
  { en: "Community", ur: "کمیونٹی" },
  { en: "Dignity", ur: "وقار" },
];

function TickerGroup({ clone }: { clone: boolean }) {
  const prefix = clone ? "clone" : "live";

  return (
    <div
      className={clone ? "ticker-group ticker-group-clone" : "ticker-group"}
      aria-hidden={clone || undefined}
    >
      {pairs.map((pair, index) => (
        <Fragment key={`${prefix}-${index}`}>
          <span className="ticker-item" lang="en">
            {pair.en}
            <span className="ticker-mark" aria-hidden="true" />
          </span>
          <span className="ticker-item ticker-item-ur" lang="ur">
            <span dir="rtl">{pair.ur}</span>
            <span className="ticker-mark" aria-hidden="true" />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function HeroTicker() {
  return (
    <div className="hero-ticker" dir="ltr">
      <div className="ticker-viewport">
        <div className="ticker-track" aria-live="off">
          <TickerGroup clone={false} />
          <TickerGroup clone />
        </div>
      </div>
    </div>
  );
}
