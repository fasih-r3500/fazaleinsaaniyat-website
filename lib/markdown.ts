/**
 * A very small Markdown reader for content prose.
 *
 * Volunteers write write-ups as plain Markdown. Only the constructs a write-up
 * needs are recognised: headings, paragraphs and bullet or numbered lists.
 * Anything else stays literal text, so a stray character never turns into
 * markup or HTML. Inline bold, italic, code and links are handled by the
 * renderer in `components/site/Markdown.tsx`.
 */

export type MarkdownBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;
const BULLET_PATTERN = /^[-*+]\s+(.*)$/;
const NUMBERED_PATTERN = /^\d+[.)]\s+(.*)$/;

/** Split Markdown prose into headings, paragraphs and lists. */
export function parseMarkdown(source: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };

  const flushList = () => {
    if (list === null) return;
    blocks.push({ type: "list", ordered: list.ordered, items: list.items });
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = HEADING_PATTERN.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      // The page title is the h1, so the first two hashes both start at h2 and
      // deeper levels stop at h4 to keep the document outline in order.
      const hashes = Math.min(Math.max(heading[1].length, 2), 4);
      blocks.push({
        type: "heading",
        level: hashes as 2 | 3 | 4,
        text: heading[2].trim(),
      });
      continue;
    }

    const bullet = BULLET_PATTERN.exec(line);
    const numbered = bullet ? null : NUMBERED_PATTERN.exec(line);
    const item = bullet?.[1] ?? numbered?.[1];

    if (item !== undefined) {
      flushParagraph();
      const ordered = bullet === null;
      if (list === null || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(item.trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

/**
 * The first paragraph of a write-up, used as the short summary on an index
 * card. Returns null when the body has no prose, only headings or lists.
 */
export function firstParagraph(source: string): string | null {
  const block = parseMarkdown(source).find((item) => item.type === "paragraph");
  return block?.type === "paragraph" ? block.text : null;
}
