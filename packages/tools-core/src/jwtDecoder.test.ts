import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { decodeJwtToken } from "./jwtDecoder";

describe("jwtDecoder", () => {
  // Mock JWT pieces
  // Header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022,"exp":1716239022} -> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9
  // Signature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("decodes valid JWT tokens correctly", () => {
    // Set time to before exp (1716239022 seconds -> 1716239022000 ms)
    vi.setSystemTime(new Date(1700000000000));
    
    const result = decodeJwtToken(validToken);
    
    expect(result.validFormat).toBe(true);
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload.sub).toBe("1234567890");
    expect(result.payload.name).toBe("John Doe");
    expect(result.signature).toBe("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    expect(result.isExpired).toBe(false);
    expect(result.expiresAt).toBe(new Date(1716239022000).toISOString());
    expect(result.issuedAt).toBe(new Date(1516239022000).toISOString());
    expect(result.error).toBeUndefined();
  });

  it("correctly identifies expired tokens", () => {
    // Set time to after exp (1716239022000 ms)
    vi.setSystemTime(new Date(1800000000000));

    const result = decodeJwtToken(validToken);
    expect(result.isExpired).toBe(true);
  });

  it("handles malformed/invalid token formats gracefully", () => {
    const result = decodeJwtToken("invalid-token-string");
    expect(result.validFormat).toBe(false);
    expect(result.error).toContain("consist of 3 parts");

    const result2 = decodeJwtToken("part1.part2");
    expect(result2.validFormat).toBe(false);
    expect(result2.error).toContain("consist of 3 parts");
  });

  it("handles invalid JSON content inside JWT base64 segments", () => {
    // Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // Payload: invalid base64 json -> "not-json" -> b3QtanNvbg== -> b3QtanNvbg (base64url)
    const badJsonToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.b3QtanNvbg.signature";
    const result = decodeJwtToken(badJsonToken);
    expect(result.validFormat).toBe(false);
    expect(result.error).toContain("parse JWT segments as JSON");
  });
});
