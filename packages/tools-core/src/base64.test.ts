import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64, isValidBase64 } from "./base64";

describe("base64 utilities", () => {
  describe("encodeBase64", () => {
    it("encodes standard ASCII strings", () => {
      expect(encodeBase64("hello")).toBe("aGVsbG8=");
      expect(encodeBase64("ZeroWebTools")).toBe("WmVyb1dlYlRvb2xz");
    });

    it("encodes UTF-8 multibyte strings (emojis, accents)", () => {
      expect(encodeBase64("hello 👋")).toBe("aGVsbG8g👋".replace("👋", "8J+Riw==")); // wait: hello 👋 is "aGVsbG8g8J+Riw=="
      expect(encodeBase64("hello 👋")).toBe("aGVsbG8g8J+Riw==");
      expect(encodeBase64("café")).toBe("Y2Fmw6k=");
      expect(encodeBase64("日本語")).toBe("5pel5pys6Kqe");
    });
  });

  describe("decodeBase64", () => {
    it("decodes standard Base64 strings", () => {
      expect(decodeBase64("aGVsbG8=")).toBe("hello");
      expect(decodeBase64("WmVyb1dlYlRvb2xz")).toBe("ZeroWebTools");
    });

    it("decodes UTF-8 Base64 strings", () => {
      expect(decodeBase64("aGVsbG8g8J+Riw==")).toBe("hello 👋");
      expect(decodeBase64("Y2Fmw6k=")).toBe("café");
      expect(decodeBase64("5pel5pys6Kqe")).toBe("日本語");
    });

    it("throws an error for invalid Base64 input formats", () => {
      expect(() => decodeBase64("invalid-base64-!")).toThrow();
    });
  });

  describe("isValidBase64", () => {
    it("returns true for valid Base64 sequences", () => {
      expect(isValidBase64("aGVsbG8=")).toBe(true);
      expect(isValidBase64("WmVyb1dlYlRvb2xz")).toBe(true);
      expect(isValidBase64("Y2Fmw6k=")).toBe(true);
      expect(isValidBase64("aGVsbG8g8J+Riw==")).toBe(true);
    });

    it("returns false for invalid Base64 sequences", () => {
      expect(isValidBase64("invalid-base64-!")).toBe(false);
      expect(isValidBase64("aGVsbG8")).toBe(false); // missing padding (needs 8 chars, is 7)
      expect(isValidBase64("")).toBe(false);
    });
  });
});
