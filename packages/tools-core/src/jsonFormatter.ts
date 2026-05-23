/**
 * JSON Formatter - Pure, stateless JSON processing and validation.
 * Zero DOM dependencies. Zero browser state. Works in Node, browser, and extension contexts.
 */

export interface FormatJSONResult {
  success: boolean;
  data: string;
  error?: string;
}

/**
 * Validates and pretty-prints raw JSON input.
 * Returns a structured result with success state, formatted data, or error message.
 */
export function formatJSON(raw: string): FormatJSONResult {
  if (typeof raw !== "string") {
    return {
      success: false,
      data: "",
      error: "Input must be a string.",
    };
  }

  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return {
      success: false,
      data: "",
      error: "Input is empty.",
    };
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    const formatted = JSON.stringify(parsed, null, 2);
    return {
      success: true,
      data: formatted,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid JSON input.";
    return {
      success: false,
      data: "",
      error: message,
    };
  }
}

/**
 * Minifies a JSON string by removing all whitespace.
 * Returns the minified string or an error result if input is invalid.
 */
export function minifyJSON(raw: string): FormatJSONResult {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return {
      success: false,
      data: "",
      error: "Input must be a non-empty string.",
    };
  }

  try {
    const parsed: unknown = JSON.parse(raw.trim());
    const minified = JSON.stringify(parsed);
    return {
      success: true,
      data: minified,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid JSON input.";
    return {
      success: false,
      data: "",
      error: message,
    };
  }
}

/**
 * Validates whether a string is valid JSON without reformatting.
 */
export function isValidJSON(raw: string): boolean {
  if (typeof raw !== "string" || raw.trim().length === 0) return false;
  try {
    JSON.parse(raw.trim());
    return true;
  } catch {
    return false;
  }
}