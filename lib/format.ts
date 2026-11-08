/**
 * Shared formatting for dates and money read from `content/`.
 *
 * Everything here is pure and locale fixed, so the same record renders the same
 * way at build time and on the server. No page formats an amount on its own.
 */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const URDU_MONTHS = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر",
];

/** Format a `YYYY-MM-DD` date as `5 January 2026`. */
export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = MONTHS[month - 1];

  if (!monthName) return isoDate;

  return `${day} ${monthName} ${year}`;
}

/**
 * Format an initiative start or end date written as `YYYY-MM-DD` or `YYYY-MM`
 * for the given page language. English renders `14 March 2024` / `March 2024`;
 * Urdu renders the month names in Urdu script. Returns `null` when the value is
 * not a recognised month or date, so the caller can omit the fact.
 */
export function formatMonthOrDate(
  value: string,
  locale: "en" | "ur",
): string | null {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = match[3] === undefined ? null : Number(match[3]);

  if (month < 1 || month > 12) return null;
  if (day !== null) {
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }
  }

  const monthName = (locale === "ur" ? URDU_MONTHS : MONTHS)[month - 1];
  if (!monthName) return null;

  const dayText = day === null ? "" : `${day} `;
  return `${dayText}${monthName} ${year}`;
}

/**
 * Format an amount held in minor units, for example `4500000` and `PKR` become
 * `PKR 45,000`. Two decimal places are shown only when the amount needs them.
 */
export function formatMoney(amountMinor: number, currency: string): string {
  const amount = amountMinor / 100;
  const hasMinorUnits = Math.round(amountMinor) % 100 !== 0;
  const digits = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: hasMinorUnits ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${currency} ${digits}`;
}
