import { describe, it, expect } from "vitest";
import { shuffleList, pickWinners } from "./randomPicker";

describe("Random Picker Core Utilities", () => {
  describe("shuffleList", () => {
    it("preserves elements while changing order", () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const shuffled = shuffleList(items);
      expect(shuffled.length).toBe(items.length);
      expect(shuffled).toEqual(expect.arrayContaining(items));
    });
  });

  describe("pickWinners", () => {
    it("returns correct count of items", () => {
      const items = ["a", "b", "c", "d"];
      const winners = pickWinners(items, 2);
      expect(winners.length).toBe(2);
      expect(items).toEqual(expect.arrayContaining(winners));
    });

    it("caps count at array length", () => {
      const items = ["a", "b"];
      const winners = pickWinners(items, 5);
      expect(winners.length).toBe(2);
    });

    it("returns empty array for empty inputs", () => {
      expect(pickWinners([], 2)).toEqual([]);
    });
  });
});
