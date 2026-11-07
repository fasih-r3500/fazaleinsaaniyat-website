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
