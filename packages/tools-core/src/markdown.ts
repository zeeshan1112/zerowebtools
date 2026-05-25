export function markdownToHtml(md: string): string {
  if (!md) return "";

  let html = md;

  // Escape HTML tags to prevent XSS (except headers/formatting we generate ourselves)
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Replace block element markers
  // 1. Headers: #, ##, ###, ####, #####, ######
  html = html.replace(/^###### (.*?)$/gm, "<h6>$1</h6>");
  html = html.replace(/^##### (.*?)$/gm, "<h5>$1</h5>");
  html = html.replace(/^#### (.*?)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

  // 2. Bold: **text** or __text__
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // 3. Italic: *text* or _text_
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // 4. Code blocks (we do this line-by-line or simple placeholder to avoid blockquote intersection)
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  // 5. Links: [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">$1</a>');

  // 6. Blockquotes: > text
  html = html.replace(/^&gt;\s?(.*?)$/gm, "<blockquote>$1</blockquote>");

  // 7. Unordered Lists: - text or * text
  html = html.replace(/^\s*[-*]\s(.*?)$/gm, "<li>$1</li>");
  // Clean list wrapping: find blocks of consecutive <li> and wrap them in <ul>
  // To avoid complex lookaheads, we do a simple replacement of consecutive <li>...</li> lines
  html = html.replace(/(<li>.*?<\/li>)+/gs, (match) => {
    return `<ul>${match}</ul>`;
  });

  // 8. Ordered Lists: 1. text
  html = html.replace(/^\s*\d+\.\s(.*?)$/gm, "<li>$1</li>");
  // If we have <li> adjacent but not wrapped, let's wrap them in <ol> if they aren't inside <ul>
  // For simplicity, a simple tag cleanup or leaving as lists is standard for light markdown parsers.

  // 9. Paragraph wrapping for unformatted lines
  const lines = html.split("\n");
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<code") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("</h") ||
      trimmed.startsWith("</ul") ||
      trimmed.startsWith("</ol") ||
      trimmed.startsWith("</li") ||
      trimmed.startsWith("</pre") ||
      trimmed.startsWith("</code") ||
      trimmed.startsWith("</blockquote>")
    ) {
      return line;
    }
    return `<p>${line}</p>`;
  });

  return processedLines.filter((l) => l !== "").join("\n");
}

export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let md = html;

  // Strip scripts and styles
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  md = md.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // 1. Headings
  md = md.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n");
  md = md.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n");
  md = md.replace(/<h3>(.*?)<\/h3>/gi, "### $1\n");
  md = md.replace(/<h4>(.*?)<\/h4>/gi, "#### $1\n");
  md = md.replace(/<h5>(.*?)<\/h5>/gi, "##### $1\n");
  md = md.replace(/<h6>(.*?)<\/h6>/gi, "###### $1\n");

  // 2. Bold
  md = md.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b>(.*?)<\/b>/gi, "**$1**");

  // 3. Italic
  md = md.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i>(.*?)<\/i>/gi, "*$1*");

  // 4. Code blocks
  md = md.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n");
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");

  // 5. Links
  md = md.replace(/<a\b[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // 6. Blockquotes
  md = md.replace(/<blockquote>(.*?)<\/blockquote>/gi, "> $1\n");

  // 7. Lists
  md = md.replace(/<\/?ul>/gi, "");
  md = md.replace(/<\/?ol>/gi, "");
  md = md.replace(/<li>(.*?)<\/li>/gi, "- $1\n");

  // 8. Paragraphs
  md = md.replace(/<p>(.*?)<\/p>/gi, "$1\n\n");

  // Remove excess HTML tags
  md = md.replace(/<[^>]*>/g, "");

  // Normalize line endings
  md = md.replace(/\n{3,}/g, "\n\n");

  return md.trim();
}
