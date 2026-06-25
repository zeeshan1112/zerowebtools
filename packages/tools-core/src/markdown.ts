import { Marked } from "marked";
import TurndownService from "turndown";
// @ts-ignore
import { tables } from "turndown-plugin-gfm";

const markedInstance = new Marked();

// Override the default link renderer to apply target="_blank" and utility CSS classes
markedInstance.use({
  renderer: {
    link({ href, title, text }) {
      return `<a href="${href}"${title ? ` title="${title}"` : ""} target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">${text}</a>`;
    }
  }
});

/**
 * Converts Markdown markup to HTML string.
 */
export function markdownToHtml(md: string): string {
  if (!md) return "";
  // marked.parse is synchronous when no async callbacks are provided
  return markedInstance.parse(md) as string;
}

/**
 * Converts HTML markup back to Markdown.
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return "";
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*"
  });
  turndownService.use(tables);
  return turndownService.turndown(html);
}
