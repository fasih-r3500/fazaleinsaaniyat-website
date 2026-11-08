/**
 * A small Markdown reader for the prose below a content file's front matter.
 *
 * It understands paragraphs, hyphen lists and `#` headings only. Nothing is
 * passed through as raw HTML, so a content file cannot inject markup.
 */

export type MarkdownBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "heading"; text: string };

export function parseMarkdown(body: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
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
 * The first paragraph of a write-up, used as the short summary on an index
 * card. Returns null when the body has no prose, only headings or lists.
 */
export function firstParagraph(body: string): string | null {
  const block = parseMarkdown(body).find((item) => item.kind === "paragraph");
  return block?.kind === "paragraph" ? block.text : null;
}
