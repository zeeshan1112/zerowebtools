import { describe, it, expect } from "vitest";
import {
  removeDuplicateLines,
  removeEmptyLines,
  removeExtraSpaces,
  stripHtmlTags,
  sortLines,
  findAndReplace,
} from "./textCleaner";

describe("textCleaner", () => {
  it("removes duplicate lines correctly", () => {
    const input = "line 1\nline 2\nline 1\nline 3\nline 2";
    expect(removeDuplicateLines(input)).toBe("line 1\nline 2\nline 3");
  });

  it("removes empty lines", () => {
    const input = "line 1\n\n  \nline 2\n\nline 3";
    expect(removeEmptyLines(input)).toBe("line 1\nline 2\nline 3");
  });

  it("removes extra spaces", () => {
    const input = "  line   1  \n   line      2   ";
    expect(removeExtraSpaces(input)).toBe("line 1\nline 2");
  });

  it("strips HTML tags", () => {
    const input = "<div class='test'>Hello <b>World</b>!</div>";
    expect(stripHtmlTags(input)).toBe("Hello World!");
  });

  it("sorts lines alphabetically", () => {
    const input = "cherry\nbanana\napple";
    expect(sortLines(input, "alpha", "asc")).toBe("apple\nbanana\ncherry");
    expect(sortLines(input, "alpha", "desc")).toBe("cherry\nbanana\napple");
  });

  it("sorts lines numerically", () => {
    const input = "item 10\nitem 2\nitem 1";
    expect(sortLines(input, "num", "asc")).toBe("item 1\nitem 2\nitem 10");
    expect(sortLines(input, "num", "desc")).toBe("item 10\nitem 2\nitem 1");
  });

  it("sorts lines by length", () => {
    const input = "longer line\nshort\nmedium length";
    expect(sortLines(input, "length", "asc")).toBe("short\nlonger line\nmedium length");
  });

  it("performs literal find and replace", () => {
    const input = "Hello World, hello universe.";
    expect(findAndReplace(input, "hello", "hi", false, false)).toBe("Hello World, hi universe.");
    expect(findAndReplace(input, "hello", "hi", false, true)).toBe("hi World, hi universe."); // case-insensitive
  });

  it("performs regex find and replace", () => {
    const input = "cats and dogs and caterpillars";
    // Match words starting with cat
    expect(findAndReplace(input, "\\bcat\\w*", "pet", true, false)).toBe("pet and dogs and pet");
  });

  it("throws error for invalid regex", () => {
    expect(() => findAndReplace("test", "[a-z", "replace", true, false)).toThrow();
  });
});
