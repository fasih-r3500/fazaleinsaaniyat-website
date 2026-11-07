export type ContentIssue = {
  /** Repository relative path of the file with the problem. */
  file: string;
  /** One plain sentence naming the file field and what is wrong with it. */
  message: string;
};

/**
 * Thrown when a content file cannot be read as a valid record. The message lists
 * every problem found, grouped by file, so a build stops with a readable report
 * instead of rendering a broken page.
 */
export class ContentError extends Error {
  readonly issues: ContentIssue[];

  constructor(issues: ContentIssue[]) {
    super(formatContentError(issues));
    this.name = "ContentError";
    this.issues = issues;
  }
}

export function formatContentError(issues: ContentIssue[]): string {
  const byFile = new Map<string, string[]>();

  for (const issue of issues) {
    const messages = byFile.get(issue.file);
    if (messages) {
      messages.push(issue.message);
    } else {
      byFile.set(issue.file, [issue.message]);
    }
  }

  const count = issues.length;
  const lines = [
    `Content validation failed with ${count} ${count === 1 ? "problem" : "problems"}.`,
    "",
  ];

  for (const [file, messages] of byFile) {
    lines.push(file);
    for (const message of messages) {
      lines.push(`  - ${message}`);
    }
    lines.push("");
  }

  lines.push("Fix the file and run the build again. See docs/CONTENT.md.");

  return lines.join("\n");
}

export function dedupeIssues(issues: ContentIssue[]): ContentIssue[] {
  const seen = new Set<string>();
  const unique: ContentIssue[] = [];

  for (const issue of issues) {
    const key = `${issue.file}\u0000${issue.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(issue);
  }

  return unique;
}
