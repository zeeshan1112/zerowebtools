/**
 * Encodes a UTF-8 string into a Base64 string.
 * Handles multibyte characters safely (e.g. emojis, non-ASCII characters).
 */
export function encodeBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (err) {
    throw new Error("Failed to encode input to Base64");
  }
}

/**
 * Decodes a Base64 string back into a UTF-8 string.
 * Gracefully handles invalid padding or invalid Base64 formats.
 */
export function decodeBase64(str: string): string {
  // Strip whitespace and newlines often found in formatted Base64
  const cleaned = str.replace(/\s+/g, "");
  try {
    return decodeURIComponent(escape(atob(cleaned)));
  } catch (err) {
    throw new Error("Invalid Base64 input sequence");
  }
}

/**
 * Verifies if a string is a valid Base64 encoded sequence.
 */
export function isValidBase64(str: string): boolean {
  const cleaned = str.replace(/\s+/g, "");
  if (!cleaned) return false;
  
  // Base64 regex check for valid characters and padding
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!base64Regex.test(cleaned)) {
    return false;
  }
  
  try {
    atob(cleaned);
    return true;
  } catch (_) {
    return false;
  }
}
