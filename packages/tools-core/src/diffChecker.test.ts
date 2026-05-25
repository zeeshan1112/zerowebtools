import { describe, it, expect } from "vitest";
import { computeLineDiff, diffWords } from "./diffChecker";

describe("diffChecker utilities", () => {
  it("handles identical texts cleanly", () => {
    const text = "Hello world\nThis is a test\nGood day";
    const rows = computeLineDiff(text, text);

    expect(rows.length).toBe(3);
    rows.forEach((row, index) => {
      expect(row.left).toBeDefined();
      expect(row.right).toBeDefined();
      expect(row.left?.type).toBe("unchanged");
      expect(row.right?.type).toBe("unchanged");
      expect(row.left?.lineNum).toBe(index + 1);
      expect(row.right?.lineNum).toBe(index + 1);
    });
  });

  it("handles deletions cleanly", () => {
    const original = "Hello world\nDeleted line\nEnd line";
    const modified = "Hello world\nEnd line";
    const rows = computeLineDiff(original, modified);

    // Should output 3 rows: hello, deleted, end.
    // The deleted line should show on left, but right is empty.
    expect(rows.length).toBe(3);
    expect(rows[0].left?.type).toBe("unchanged");
    expect(rows[1].left?.type).toBe("removed");
    expect(rows[1].right).toBeUndefined();
    expect(rows[2].left?.type).toBe("unchanged");
  });

  it("handles additions cleanly", () => {
    const original = "Hello world\nEnd line";
    const modified = "Hello world\nAdded line\nEnd line";
    const rows = computeLineDiff(original, modified);

    // Should output 3 rows: hello, added, end.
    // The added line should show on right, but left is empty.
    expect(rows.length).toBe(3);
    expect(rows[0].left?.type).toBe("unchanged");
    expect(rows[1].right?.type).toBe("added");
    expect(rows[1].left).toBeUndefined();
    expect(rows[2].left?.type).toBe("unchanged");
  });

  it("pairs up adjacent deletions and additions (modified lines)", () => {
    const original = "Hello world\nOld value here\nEnd line";
    const modified = "Hello world\nNew value here\nEnd line";
    const rows = computeLineDiff(original, modified);

    // The old/new lines should align on the SAME row!
    expect(rows.length).toBe(3);
    expect(rows[1].left?.content).toBe("Old value here");
    expect(rows[1].left?.type).toBe("removed");
    expect(rows[1].right?.content).toBe("New value here");
    expect(rows[1].right?.type).toBe("added");
  });

  it("enforces safety line limits to prevent tab crash", () => {
    const longText = Array(3501).fill("line").join("\n");
    expect(() => computeLineDiff(longText, "test")).toThrow("limit text blocks to 3,000 lines");
  });

  it("calculates fine-grained token-level differences", () => {
    const original = "Original title value";
    const modified = "Modified title value";

    const { left, right } = diffWords(original, modified);

    // Left tokens: Original (removed), ' ', 'title', ' ', 'value'
    const leftRemoved = left.find(t => t.type === "removed");
    expect(leftRemoved).toBeDefined();
    expect(leftRemoved?.value).toBe("Original");

    // Right tokens: Modified (added), ' ', 'title', ' ', 'value'
    const rightAdded = right.find(t => t.type === "added");
    expect(rightAdded).toBeDefined();
    expect(rightAdded?.value).toBe("Modified");

    // Common tokens
    const commonTitle = left.find(t => t.value === "title");
    expect(commonTitle?.type).toBe("unchanged");
  });
});
