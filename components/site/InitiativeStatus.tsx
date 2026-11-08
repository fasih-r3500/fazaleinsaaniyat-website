import type { InitiativeStatus } from "@/lib/content";
import { initiativesPage } from "@/content/copy";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

/**
 * A small label for an initiative status. The colour carries the meaning, so
 * the word is always shown as well and the chip is never colour alone.
 */
export function StatusChip({
  status,
  locale,
}: {
  status: InitiativeStatus;
  locale: Locale;
}) {
  return (
    <span className={`status status-${status}`}>
      <T locale={locale} value={initiativesPage.statusLabels[status]} />
    </span>
  );
}
