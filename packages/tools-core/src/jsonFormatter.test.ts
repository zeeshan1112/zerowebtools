import { describe, it, expect } from "vitest";
import { formatJSON, minifyJSON, isValidJSON } from "./jsonFormatter";

describe("jsonFormatter utilities", () => {
  describe("formatJSON", () => {
    it("formats valid JSON string", () => {
      const result = formatJSON('{"a":1,"b":[2,3]}');
      expect(result.success).toBe(true);
      expect(result.data).toBe(
        JSON.stringify({ a: 1, b: [2, 3] }, null, 2)
      );
      expect(result.error).toBeUndefined();
    });

    it("returns error on invalid JSON string", () => {
      const result = formatJSON('{"a":1');
      expect(result.success).toBe(false);
      expect(result.data).toBe("");
      expect(result.error).toBeDefined();
    });

    it("returns error on empty string", () => {
      const result = formatJSON("   ");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Input is empty.");
    });
  });

  describe("minifyJSON", () => {
    it("minifies valid JSON string", () => {
      const result = minifyJSON(`{
        "a": 1,
        "b": [2, 3]
      }`);
      expect(result.success).toBe(true);
      expect(result.data).toBe('{"a":1,"b":[2,3]}');
    });

    it("returns error on invalid JSON", () => {
      const result = minifyJSON('{"a":1');
      expect(result.success).toBe(false);
      expect(result.data).toBe("");
    });
  });

  describe("isValidJSON", () => {
    it("returns true for valid JSON", () => {
      expect(isValidJSON('{"a": 1}')).toBe(true);
      expect(isValidJSON("[1, 2, 3]")).toBe(true);
      expect(isValidJSON('"hello"')).toBe(true);
    });

    it("returns false for invalid JSON", () => {
      expect(isValidJSON('{"a": 1')).toBe(false);
      expect(isValidJSON("")).toBe(false);
      expect(isValidJSON("   ")).toBe(false);
    });
  });
});
