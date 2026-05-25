/**
 * Removes duplicate lines from a text block, keeping the first occurrence.
 */
export function removeDuplicateLines(text: string): string {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const uniqueLines = lines.filter((line) => {
    if (seen.has(line)) {
      return false;
    }
    seen.add(line);
    return true;
  });
  return uniqueLines.join("\n");
}

/**
 * Removes completely empty lines or lines with only whitespace.
 */
export function removeEmptyLines(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .join("\n");
}

/**
 * Strips leading/trailing spaces from each line, and collapses multiple spaces into a single space.
 */
export function removeExtraSpaces(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("\n");
}

/**
 * Removes HTML tags from text.
 */
export function stripHtmlTags(text: string): string {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Sorts lines based on alphabetical, numerical, or length criteria.
 */
export function sortLines(
  text: string,
  criteria: "alpha" | "num" | "length",
  direction: "asc" | "desc"
): string {
  const lines = text.split(/\r?\n/);

  lines.sort((a, b) => {
    let comparison = 0;

    if (criteria === "alpha") {
      comparison = a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    } else if (criteria === "num") {
      // Parse numbers from strings
      const numA = parseFloat(a.match(/-?\d+(\.\d+)?/)?.[0] ?? "0");
      const numB = parseFloat(b.match(/-?\d+(\.\d+)?/)?.[0] ?? "0");
      comparison = numA - numB;
      // Fallback to alphabetical if numeric matches are identical
      if (comparison === 0) {
        comparison = a.localeCompare(b);
      }
    } else if (criteria === "length") {
      comparison = a.length - b.length;
      if (comparison === 0) {
        comparison = a.localeCompare(b);
      }
    }

    return direction === "asc" ? comparison : -comparison;
  });

  return lines.join("\n");
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Performs find and replace operation. Supports literal or regex lookups, and case sensitivity flags.
 */
export function findAndReplace(
  text: string,
  findText: string,
  replaceText: string,
  isRegex: boolean,
  caseInsensitive: boolean
): string {
  if (!findText) {
    return text;
  }

  let regex: RegExp;

  if (isRegex) {
    const flags = "g" + (caseInsensitive ? "i" : "");
    try {
      regex = new RegExp(findText, flags);
    } catch (err: any) {
      throw new Error(`Invalid regular expression: ${err.message}`);
    }
  } else {
    const flags = "g" + (caseInsensitive ? "i" : "");
    regex = new RegExp(escapeRegExp(findText), flags);
  }

  return text.replace(regex, replaceText);
}
