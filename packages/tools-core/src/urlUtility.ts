export interface UrlParam {
  id: string;
  key: string;
  value: string;
}

export interface ParsedUrl {
  baseUrl: string;
  params: UrlParam[];
}

/**
 * Encodes text or query component to standard percent-encoding.
 */
export function encodeUrlString(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (_) {
    return text;
  }
}

/**
 * Decodes standard percent-encoded URLs, converting '+' to spaces.
 */
export function decodeUrlString(text: string): string {
  try {
    return decodeURIComponent(text.replace(/\+/g, " "));
  } catch (_) {
    return text;
  }
}

/**
 * Parses a full URL or query string into a base URL and an array of key-value parameters.
 */
export function parseUrlParams(urlStr: string): ParsedUrl {
  const trimmed = urlStr.trim();
  if (!trimmed) {
    return { baseUrl: "", params: [] };
  }

  let baseUrl = trimmed;
  let queryString = "";

  const qIndex = trimmed.indexOf("?");
  if (qIndex !== -1) {
    baseUrl = trimmed.substring(0, qIndex);
    queryString = trimmed.substring(qIndex + 1);
  } else if (trimmed.includes("=") || trimmed.includes("&")) {
    // If it looks like raw parameters (e.g. "q=test&limit=10") without a base url
    baseUrl = "";
    queryString = trimmed;
  }

  const params: UrlParam[] = [];
  if (queryString) {
    const pairs = queryString.split("&");
    pairs.forEach((pair, index) => {
      if (!pair) return;
      const eqIndex = pair.indexOf("=");
      let key = pair;
      let value = "";
      if (eqIndex !== -1) {
        key = pair.substring(0, eqIndex);
        value = pair.substring(eqIndex + 1);
      }
      params.push({
        id: `param-${index}-${Math.random().toString(36).substring(2, 7)}`,
        key: decodeUrlString(key),
        value: decodeUrlString(value),
      });
    });
  }

  return { baseUrl, params };
}

/**
 * Reassembles a base URL and parameter list into a fully encoded URL.
 */
export function buildUrlString(baseUrl: string, params: { key: string; value: string }[]): string {
  const queryParts = params
    .filter((p) => p.key.trim() !== "") // Skip blank keys
    .map((p) => `${encodeUrlString(p.key)}=${encodeUrlString(p.value)}`);

  const queryString = queryParts.join("&");
  if (!queryString) {
    return baseUrl;
  }

  const base = baseUrl.trim();
  if (!base) {
    return queryString;
  }

  // Handle existing "?" in baseUrl if any
  if (base.endsWith("?")) {
    return `${base}${queryString}`;
  }
  if (base.includes("?")) {
    return `${base}&${queryString}`;
  }
  return `${base}?${queryString}`;
}
