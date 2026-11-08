import { fieldTripPage } from "@/content/copy";
import { parseMarkdown } from "@/lib/markdown";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

/**
 * Render a field trip write-up. Headings all render as h2 so a write-up can
 * never skip a heading level under its h1, and nothing is passed through as raw
 * HTML.
 */
export function FieldTripBody({
  body,
  locale,
}: {
  body: string;
  locale: Locale;
}) {
  const blocks = parseMarkdown(body);

  if (blocks.length === 0) {
    return (
      <p>
        <T locale={locale} value={fieldTripPage.emptyBody} />
      </p>
    );
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === "heading") {
          return <h2 key={index}>{block.text}</h2>;
        }

        if (block.kind === "list") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </>
  );
}
