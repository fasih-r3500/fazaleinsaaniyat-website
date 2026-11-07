import { reportPage } from "@/content/copy";
import type { Locale } from "@/lib/locale";
import { T } from "./BilingualText";

type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "heading"; text: string };

/** Plain Markdown, split into paragraphs, hyphen lists and section headings. */
function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  const chunks = body.replace(/\r\n/g, "\n").split(/\n{2,}/);

  for (const chunk of chunks) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) continue;

    if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({
        kind: "list",
        items: lines.map((line) => line.slice(2).trim()),
      });
      continue;
    }

    const heading = lines.length === 1 ? /^#{1,6}\s+(.*)$/.exec(lines[0]) : null;
    if (heading) {
      blocks.push({ kind: "heading", text: heading[1] });
      continue;
    }

    blocks.push({ kind: "paragraph", text: lines.join(" ") });
  }

  return blocks;
}

/**
 * Render a report body. Headings all render as h2 so a report can never skip a
 * heading level under its h1, and nothing is passed through as raw HTML.
 */
export function ReportBody({
  body,
  locale,
}: {
  body: string;
  locale: Locale;
}) {
  const blocks = parseBody(body);

  if (blocks.length === 0) {
    return (
      <p>
        <T locale={locale} value={reportPage.emptyBody} />
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
