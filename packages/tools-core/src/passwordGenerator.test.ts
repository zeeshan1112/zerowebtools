import { describe, test, expect } from "vitest";
import { generatePassword, calculatePasswordStrength } from "./passwordGenerator";

describe("passwordGenerator tests", () => {
  test("generates passwords of exact length and constraints", () => {
    const pwd = generatePassword({
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });
    expect(pwd.length).toBe(12);
    expect(/[A-Z]/.test(pwd)).toBe(true);
    expect(/[a-z]/.test(pwd)).toBe(true);
    expect(/[0-9]/.test(pwd)).toBe(true);
    expect(/[^a-zA-Z0-9]/.test(pwd)).toBe(true);
  });

  test("calculates password entropy strength correctly", () => {
    const statsWeak = calculatePasswordStrength("1234");
    expect(statsWeak.strength).toBe("Very Weak");

    const statsStrong = calculatePasswordStrength("A3d$F9g!K2h@S7");
    expect(statsStrong.strength).toBe("Strong");
  });
});
