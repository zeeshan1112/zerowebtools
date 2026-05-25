import { describe, it, expect } from "vitest";
import { markdownToHtml, htmlToMarkdown } from "./markdown";

describe("Markdown Converter Core Utilities", () => {
  describe("markdownToHtml", () => {
    it("converts headers correctly", () => {
      expect(markdownToHtml("# Heading 1")).toContain("<h1>Heading 1</h1>");
      expect(markdownToHtml("## Heading 2")).toContain("<h2>Heading 2</h2>");
    });

    it("converts bold and italic text correctly", () => {
      expect(markdownToHtml("**bold text**")).toContain("<strong>bold text</strong>");
      expect(markdownToHtml("*italic text*")).toContain("<em>italic text</em>");
    });

    it("converts code blocks and links correctly", () => {
      expect(markdownToHtml("`inline code`")).toContain("<code>inline code</code>");
      expect(markdownToHtml("[Google](https://google.com)")).toContain('<a href="https://google.com"');
    });

    it("converts blockquotes and lists correctly", () => {
      expect(markdownToHtml("> A quote")).toContain("<blockquote>A quote</blockquote>");
      expect(markdownToHtml("- Item 1\n- Item 2")).toContain("<li>Item 1</li>");
    });
  });

  describe("htmlToMarkdown", () => {
    it("converts simple headers correctly", () => {
      expect(htmlToMarkdown("<h1>Heading 1</h1>")).toBe("# Heading 1");
    });

    it("converts bold, italics and links correctly", () => {
      expect(htmlToMarkdown("<strong>bold</strong>")).toBe("**bold**");
      expect(htmlToMarkdown("<em>italic</em>")).toBe("*italic*");
      expect(htmlToMarkdown('<a href="https://site.com">Site</a>')).toBe("[Site](https://site.com)");
    });

    it("converts lists correctly", () => {
      expect(htmlToMarkdown("<ul><li>Item 1</li><li>Item 2</li></ul>")).toContain("- Item 1\n- Item 2");
    });
  });
});
