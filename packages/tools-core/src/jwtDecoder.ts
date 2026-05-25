import { decodeBase64 } from "./base64";

export interface DecodedJwt {
  header: any;
  payload: any;
  signature: string;
  isExpired: boolean;
  issuedAt?: string;
  expiresAt?: string;
  validFormat: boolean;
  error?: string;
}

function base64UrlToBase64(base64url: string): string {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return base64;
}

function safeJsonParse(str: string): any {
  try {
    return JSON.parse(str);
  } catch (_) {
    return null;
  }
}

/**
 * Decodes a JWT token string into Header, Payload, and Signature.
 * Performs client-side validation on expiration (exp) and issue date (iat).
 */
export function decodeJwtToken(token: string): DecodedJwt {
  const cleanedToken = token.trim();
  const parts = cleanedToken.split(".");

  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      isExpired: false,
      validFormat: false,
      error: "Invalid JWT format. A token must consist of 3 parts separated by dots.",
    };
  }

  try {
    const [headerB64, payloadB64, signature] = parts;

    const decodedHeaderStr = decodeBase64(base64UrlToBase64(headerB64));
    const decodedPayloadStr = decodeBase64(base64UrlToBase64(payloadB64));

    const header = safeJsonParse(decodedHeaderStr);
    const payload = safeJsonParse(decodedPayloadStr);

    if (!header || !payload) {
      return {
        header,
        payload,
        signature,
        isExpired: false,
        validFormat: false,
        error: "Failed to parse JWT segments as JSON.",
      };
    }

    // Expiry check
    let isExpired = false;
    let expiresAt: string | undefined;
    let issuedAt: string | undefined;

    if (payload.exp && typeof payload.exp === "number") {
      const expMs = payload.exp * 1000;
      isExpired = Date.now() > expMs;
      expiresAt = new Date(expMs).toISOString();
    }

    if (payload.iat && typeof payload.iat === "number") {
      issuedAt = new Date(payload.iat * 1000).toISOString();
    }

    return {
      header,
      payload,
      signature,
      isExpired,
      expiresAt,
      issuedAt,
      validFormat: true,
    };
  } catch (err: any) {
    return {
      header: null,
      payload: null,
      signature: parts[2] || "",
      isExpired: false,
      validFormat: false,
      error: err.message || "Failed to decode JWT base64 segments.",
    };
  }
}
