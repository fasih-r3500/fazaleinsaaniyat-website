import type { Money } from "./content/types";

const WHOLE_NUMBER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Format an amount for the page. Amounts are stored in minor units, so this is
 * the one place that turns them back into rupees. The code is printed before
 * the number, which reads correctly in both language trees.
 */
export function formatMoney(money: Money): string {
  return `${money.currency} ${WHOLE_NUMBER.format(money.amountMinor / 100)}`;
}
