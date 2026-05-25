import { describe, test, expect } from "vitest";
import { minifySvg } from "./svgMinifier";

describe("svgMinifier tests", () => {
  test("minifies comments and spaces", () => {
    const rawSvg = `
      <!-- This is a comment -->
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
    `;
    const minified = minifySvg(rawSvg);
    expect(minified).toBe('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>');
  });

  test("removes metadata and editor namespaces", () => {
    const rawSvg = `
      <svg xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" sodipodi:docname="test.svg">
        <metadata>rdf data here</metadata>
        <sodipodi:namedview id="base" />
        <rect x="0" y="0" width="10" height="10" />
      </svg>
    `;
    const minified = minifySvg(rawSvg, { removeMetadata: true, removeEditorData: true });
    expect(minified).toBe('<svg><rect x="0" y="0" width="10" height="10" /></svg>');
  });

  test("rounds decimals in path data", () => {
    const rawSvg = `<svg><path d="M 10.1234 20.5678 L 30.9876 40.1111" /></svg>`;
    const minified = minifySvg(rawSvg, { precisionDigits: 2 });
    expect(minified).toBe('<svg><path d="M 10.12 20.57 L 30.99 40.11" /></svg>');
  });
});
