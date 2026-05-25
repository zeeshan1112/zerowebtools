/**
 * Basic rules-based SVG Minifier and Cleaner.
 * Runs client-side to strip comments, metadata, unused editor namespaces, and collapses spaces.
 */
export function minifySvg(svgString: string, options: {
  removeComments?: boolean;
  removeMetadata?: boolean;
  removeEditorData?: boolean;
  collapseSpaces?: boolean;
  precisionDigits?: number; // if specified, rounds decimals in path data
} = {}): string {
  const removeComments = options.removeComments !== false;
  const removeMetadata = options.removeMetadata !== false;
  const removeEditorData = options.removeEditorData !== false;
  const collapseSpaces = options.collapseSpaces !== false;
  const precision = options.precisionDigits ?? 2;

  let cleaned = svgString;

  // 1. Remove XML/DOCTYPE declaration
  cleaned = cleaned.replace(/<\?xml[^>]*\?>/gi, "");
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, "");

  // 2. Remove comments
  if (removeComments) {
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");
  }

  // 3. Remove metadata, sodipodi, and rdf tags
  if (removeMetadata) {
    cleaned = cleaned.replace(/<metadata>[\s\S]*?<\/metadata>/gi, "");
    cleaned = cleaned.replace(/<sodipodi:namedview[\s\S]*?\/>/gi, "");
    cleaned = cleaned.replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/gi, "");
  }

  // 4. Remove editor namespace attributes and prefixes
  if (removeEditorData) {
    // Remove attributes like xmlns:sodipodi, xmlns:inkscape, inkscape:version, sodipodi:docname etc.
    cleaned = cleaned.replace(/\s(xmlns|inkscape|sodipodi):[a-z0-9-]+="[^"]*"/gi, "");
    cleaned = cleaned.replace(/\s(inkscape|sodipodi):[a-z0-9-]+='[^']*'/gi, "");
    // Remove custom namespaces from tags if any
    cleaned = cleaned.replace(/<[a-z0-9]+:[a-z0-9-]+/gi, (match) => {
      const parts = match.split(":");
      return parts[parts.length - 1];
    });
    cleaned = cleaned.replace(/<\/[a-z0-9]+:[a-z0-9-]+>/gi, (match) => {
      const parts = match.split(":");
      return parts[parts.length - 1];
    });
  }

  // 5. Round numeric path and attribute decimals
  if (precision >= 0) {
    // Round floats inside any double-quoted attribute values
    cleaned = cleaned.replace(/"([^"]*)"/g, (match, attrVal) => {
      const rounded = attrVal.replace(/[-+]?[0-9]*\.[0-9]+/g, (numStr: string) => {
        const val = parseFloat(numStr);
        if (isNaN(val)) return numStr;
        const factor = Math.pow(10, precision);
        return String(Math.round(val * factor) / factor);
      });
      return `"${rounded}"`;
    });
    // Round floats inside any single-quoted attribute values
    cleaned = cleaned.replace(/'([^']*)'/g, (match, attrVal) => {
      const rounded = attrVal.replace(/[-+]?[0-9]*\.[0-9]+/g, (numStr: string) => {
        const val = parseFloat(numStr);
        if (isNaN(val)) return numStr;
        const factor = Math.pow(10, precision);
        return String(Math.round(val * factor) / factor);
      });
      return `'${rounded}'`;
    });
  }

  // 6. Collapse spaces and linebreaks
  if (collapseSpaces) {
    cleaned = cleaned.replace(/>\s+</g, "><");
    cleaned = cleaned.replace(/\s+/g, " ");
    cleaned = cleaned.trim();
  }

  return cleaned;
}
