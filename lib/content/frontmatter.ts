import { parse as parseYaml } from "yaml";
import { ContentError } from "./errors";
import { isPlainObject, readFileText } from "./validate";

const FRONT_MATTER_DELIMITER = "---";

export type ParsedMarkdownFile = {
  data: Record<string, unknown>;
  body: string;
};

/**
 * Read one Markdown file with a YAML front matter block and split it into the
 * structured fields and the prose body.
 *
 * The file must start with a `---` line and close the block with another `---`
 * line. A problem with the block throws a ContentError naming the file.
 */
export function parseMarkdownFile(
  projectRoot: string,
  relativePath: string,
): ParsedMarkdownFile {
  const source = readFileText(projectRoot, relativePath).replace(/^\uFEFF/, "");
  const lines = source.split(/\r?\n/);

  if (lines[0]?.trimEnd() !== FRONT_MATTER_DELIMITER) {
    throw new ContentError([
      {
        file: relativePath,
        message: `front matter is missing; the file must start with a "${FRONT_MATTER_DELIMITER}" line, then the fields, then another "${FRONT_MATTER_DELIMITER}" line`,
      },
    ]);
  }

  const closingLine = lines.findIndex(
    (line, index) => index > 0 && line.trimEnd() === FRONT_MATTER_DELIMITER,
  );

  if (closingLine === -1) {
    throw new ContentError([
      {
        file: relativePath,
        message: `front matter is not closed; add a "${FRONT_MATTER_DELIMITER}" line after the last field`,
      },
    ]);
  }

  const frontMatter = lines.slice(1, closingLine).join("\n");
  const body = lines.slice(closingLine + 1).join("\n").trim();

  let parsed: unknown;
  try {
    parsed = parseYaml(frontMatter, { prettyErrors: true });
  } catch (error) {
    const detail =
      error instanceof Error ? error.message.split("\n")[0] : String(error);
    throw new ContentError([
      {
        file: relativePath,
        message: `front matter is not valid YAML: ${detail}`,
      },
    ]);
  }

  if (!isPlainObject(parsed)) {
    throw new ContentError([
      {
        file: relativePath,
        message: `front matter must be a list of "field: value" lines, starting with "title:"`,
      },
    ]);
  }

  return { data: parsed, body };
}
