import { describe, it, expect } from "vitest";
import { encodeUrlString, decodeUrlString, parseUrlParams, buildUrlString } from "./urlUtility";

describe("urlUtility", () => {
  it("encodes string to URL percent-encoding", () => {
    expect(encodeUrlString("hello world!")).toBe("hello%20world!");
    expect(encodeUrlString("hello/world?q=1")).toBe("hello%2Fworld%3Fq%3D1");
  });

  it("decodes URL percent-encoding", () => {
    expect(decodeUrlString("hello%20world%21")).toBe("hello world!");
    expect(decodeUrlString("hello+world")).toBe("hello world"); // Converts + to space
    expect(decodeUrlString("hello%2Fworld%3Fq%3D1")).toBe("hello/world?q=1");
  });

  it("parses full URL query parameters correctly", () => {
    const url = "https://zerowebtools.com/search?q=apple+pie&category=food&active=true";
    const parsed = parseUrlParams(url);

    expect(parsed.baseUrl).toBe("https://zerowebtools.com/search");
    expect(parsed.params).toHaveLength(3);
    
    expect(parsed.params[0].key).toBe("q");
    expect(parsed.params[0].value).toBe("apple pie");
    
    expect(parsed.params[1].key).toBe("category");
    expect(parsed.params[1].value).toBe("food");

    expect(parsed.params[2].key).toBe("active");
    expect(parsed.params[2].value).toBe("true");
  });

  it("parses raw query parameters without base URL", () => {
    const query = "a=1&b=2&c=3";
    const parsed = parseUrlParams(query);
    
    expect(parsed.baseUrl).toBe("");
    expect(parsed.params).toHaveLength(3);
    expect(parsed.params[0].key).toBe("a");
    expect(parsed.params[0].value).toBe("1");
  });

  it("handles URLs without any query parameters", () => {
    const url = "https://zerowebtools.com/tools/url-encoder";
    const parsed = parseUrlParams(url);

    expect(parsed.baseUrl).toBe("https://zerowebtools.com/tools/url-encoder");
    expect(parsed.params).toEqual([]);
  });

  it("builds URL string from base and parameters list", () => {
    const base = "https://example.com/api";
    const params = [
      { key: "q", value: "next js" },
      { key: "limit", value: "10" },
      { key: "offset", value: "" }, // Keep empty value
    ];

    const result = buildUrlString(base, params);
    expect(result).toBe("https://example.com/api?q=next%20js&limit=10&offset=");
  });

  it("skips parameters with empty keys when building URL", () => {
    const base = "https://example.com/api";
    const params = [
      { key: "", value: "val1" },
      { key: "k2", value: "val2" },
    ];

    const result = buildUrlString(base, params);
    expect(result).toBe("https://example.com/api?k2=val2");
  });

  it("handles base URLs that already end with ? or contain ?", () => {
    expect(buildUrlString("example.com?", [{ key: "a", value: "1" }])).toBe("example.com?a=1");
    expect(buildUrlString("example.com?existing=true", [{ key: "a", value: "1" }])).toBe("example.com?existing=true&a=1");
  });
});
