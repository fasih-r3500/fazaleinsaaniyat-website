import type { ReactNode } from "react";
import type { Bilingual } from "@/content/copy";
import type { Locale } from "@/lib/locale";

export function UrduPending({
  source,
  compact = false,
}: {
  source: string;
  compact?: boolean;
}) {
  const title = `Urdu copy pending native review. English source: ${source}`;

  if (compact) {
    return (
      <span className="ur-pending ur-pending-compact" lang="en" dir="ltr">
        <span className="ur-pending-source">{source}</span>
        <span className="ph ph-small" title={title}>
          UR
        </span>
      </span>
    );
  }

  return (
    <span className="ur-pending" lang="en" dir="ltr">
      <span className="ph ph-small" title={title}>
        Urdu pending
      </span>{" "}
      <span className="ur-pending-source">{source}</span>
    </span>
  );
}

export function T({
  locale,
  value,
  compact = false,
}: {
  locale: Locale;
  value: Bilingual;
  compact?: boolean;
}) {
  if (locale === "en") {
    return <>{value.en}</>;
  }

  if (value.ur) {
    return <>{value.ur}</>;
  }

  return <UrduPending source={value.en} compact={compact} />;
}

export function PlaceholderChip({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <span className="ph" title={title}>
      {children}
    </span>
  );
}
