import type { ReactNode } from "react";
import { parseMarkdown } from "@/lib/markdown";

/**
 * Inline Markdown: **bold**, *italic*, `code` and [links](https://example.org).
 * The pattern is tried in that order so the double markers win over single.
 */
const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|_[^_\n]+_|`[^`]+`|\[[^\]]+\]\([^()\s]+\))/g;

const LINK_PATTERN = /^\[([^\]]+)\]\(([^()\s]+)\)$/;

/**
 * Only link targets the site itself would write are allowed. Anything else is
 * shown as literal text, so a content file cannot introduce a scheme the
 * Content Security Policy does not expect.
 */
function safeHref(href: string): string | null {
  if (href.startsWith("/")) return href;
  if (href.startsWith("https://")) return href;
  if (href.startsWith("http://")) return href;
  if (href.startsWith("mailto:")) return href;
  return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const start = match.index ?? 0;
    const token = match[0];

    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

    const key = `${keyPrefix}-inline-${index}`;
    index += 1;

    if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const link = LINK_PATTERN.exec(token);
      const href = link ? safeHref(link[2]) : null;
      if (link && href) {
        nodes.push(
          <a key={key} href={href}>
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    lastIndex = start + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}

/**
 * Render Markdown prose with the site's typography. No HTML is passed through:
 * every value is a React text node or an element this component builds.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = parseMarkdown(source);

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const key = `block-${blockIndex}`;

        if (block.type === "heading") {
          const children = renderInline(block.text, key);
          if (block.level === 2) return <h2 key={key}>{children}</h2>;
          if (block.level === 3) return <h3 key={key}>{children}</h3>;
          return <h4 key={key}>{children}</h4>;
        }

        if (block.type === "list") {
          const items = block.items.map((item, itemIndex) => (
            <li key={`${key}-item-${itemIndex}`}>
              {renderInline(item, `${key}-item-${itemIndex}`)}
            </li>
          ));

          return block.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
        }

        return <p key={key}>{renderInline(block.text, key)}</p>;
      })}
    </>
  );
}
