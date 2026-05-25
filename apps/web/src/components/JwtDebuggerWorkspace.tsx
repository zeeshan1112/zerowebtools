"use client";

import React, { useState, useEffect } from "react";
import { decodeJwtToken, DecodedJwt } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const JWT_STEPS = [
  "Validating token dot notation...",
  "Decoding Base64Url segments...",
  "Formatting JSON header & payload...",
  "Extracting standard claims & timestamps...",
];

export default function JwtDebuggerWorkspace() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [copied, setCopied] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);

  // Default JWT sample data
  const loadExample = () => {
    // A standard JWT with HS256, user details, issue and expiration (valid for 10 years so it doesn't show as expired)
    const exampleHeader = { alg: "HS256", typ: "JWT" };
    const examplePayload = {
      sub: "1234567890",
      name: "Alice Vance",
      admin: true,
      roles: ["editor", "publisher"],
      iat: Math.floor(Date.now() / 1000) - 60,
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 365, // 1 year expiry
      iss: "zerowebtools.com"
    };

    // Helper to base64url encode
    const b64Url = (obj: any) => {
      const str = JSON.stringify(obj);
      const b64 = btoa(unescape(encodeURIComponent(str)));
      return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };

    const t = `${b64Url(exampleHeader)}.${b64Url(examplePayload)}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    setToken(t);
  };

  useEffect(() => {
    if (!token.trim()) {
      setDecoded(null);
      return;
    }
    const result = decodeJwtToken(token);
    setDecoded(result);
  }, [token]);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const handleClear = () => {
    setToken("");
    setDecoded(null);
  };

  // Helper to format timestamps nicely
  const formatDate = (isoStr?: string) => {
    if (!isoStr) return "N/A";
    const date = new Date(isoStr);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6 relative">
      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="px-4 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer"
          >
            Load Example
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
        <span className="text-[10px] text-ink-muted font-bold font-mono">
          100% Client-Side Processing
        </span>
      </div>

      {/* Editor & Decoded Output Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Pane */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          <div className="flex justify-between items-center select-none">
            <label htmlFor="jwt-input" className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
              Encoded Token (Paste JWT)
            </label>
            {token && (
              <button
                onClick={() => handleCopy(token, "jwt")}
                className="text-[10px] text-accent font-bold"
              >
                {copied === "jwt" ? "Copied!" : "Copy Token"}
              </button>
            )}
          </div>
          <textarea
            id="jwt-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT encoded string here (e.g. xxxxx.yyyyy.zzzzz)..."
            className="w-full h-[32rem] p-4 rounded-2xl border border-border bg-surface-elevated/50 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed break-all"
          />
        </div>

        {/* Right Output Pane */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <label className="text-xs font-bold text-ink-secondary uppercase tracking-wider select-none">
            Decoded Results
          </label>

          {decoded ? (
            <div className="space-y-4">
              {/* Validation Status & Timestamps */}
              <div className="rounded-2xl border border-border bg-surface-elevated p-4 space-y-3.5 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-muted">Token Status</span>
                  {decoded.validFormat ? (
                    decoded.isExpired ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                        Expired
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        Valid Signature Format
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                      Invalid Format
                    </span>
                  )}
                </div>

                {decoded.error && (
                  <p className="text-xs text-red-500 leading-relaxed font-semibold bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                    {decoded.error}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-ink-muted block font-semibold text-[10px] uppercase">Issued At (iat)</span>
                    <span className="font-mono font-bold text-ink">{formatDate(decoded.issuedAt)}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted block font-semibold text-[10px] uppercase">Expires At (exp)</span>
                    <span className={`font-mono font-bold ${decoded.isExpired ? "text-red-500" : "text-ink"}`}>
                      {formatDate(decoded.expiresAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Segment */}
              <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-[10px] font-extrabold text-ink-secondary uppercase tracking-wider flex justify-between items-center select-none">
                  <span>Header: Algorithm & Token Type</span>
                  {decoded.header && (
                    <button
                      onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), "header")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold"
                    >
                      {copied === "header" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
                <pre className="p-4 overflow-auto max-h-40 font-mono text-xs text-ink bg-zinc-950/40 select-text leading-relaxed">
                  {decoded.header ? JSON.stringify(decoded.header, null, 2) : "// Invalid Header JSON"}
                </pre>
              </div>

              {/* Payload Segment */}
              <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-[10px] font-extrabold text-ink-secondary uppercase tracking-wider flex justify-between items-center select-none">
                  <span>Payload: Claims & Custom Parameters</span>
                  {decoded.payload && (
                    <button
                      onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold"
                    >
                      {copied === "payload" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
                <pre className="p-4 overflow-auto max-h-64 font-mono text-xs text-ink bg-zinc-950/40 select-text leading-relaxed">
                  {decoded.payload ? JSON.stringify(decoded.payload, null, 2) : "// Invalid Payload JSON"}
                </pre>
              </div>

              {/* Signature Segment */}
              <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-[10px] font-extrabold text-ink-secondary uppercase tracking-wider flex justify-between items-center select-none">
                  <span>Signature Checksum</span>
                  {decoded.signature && (
                    <button
                      onClick={() => handleCopy(decoded.signature, "sig")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold"
                    >
                      {copied === "sig" ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
                <div className="p-4 font-mono text-xs text-ink bg-zinc-950/40 select-text break-all">
                  {decoded.signature ? decoded.signature : "// No signature segment detected"}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-dashed border-border rounded-2xl bg-surface-elevated/20 text-ink-muted text-xs italic select-none">
              Please paste an encoded JWT string on the left to inspect its structure...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
