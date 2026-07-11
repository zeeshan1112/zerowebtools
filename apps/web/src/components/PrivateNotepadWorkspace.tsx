"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

// Helper: Compress string to bytes using browser native CompressionStream
async function compressText(text: string): Promise<Uint8Array> {
  if (typeof CompressionStream === "undefined") {
    return new TextEncoder().encode(text);
  }
  const stream = new Response(text).body?.pipeThrough(new CompressionStream("deflate"));
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

// Helper: Decompress bytes to string using browser native DecompressionStream
async function decompressText(bytes: Uint8Array): Promise<string> {
  if (typeof DecompressionStream === "undefined") {
    return new TextDecoder().decode(bytes);
  }
  const stream = new Response(new Blob([bytes as any])).body?.pipeThrough(new DecompressionStream("deflate"));
  return new Response(stream).text();
}

// Helper: Convert bytes to Hex string
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Helper: Convert Hex string to bytes
function hexToBytes(hex: string): Uint8Array {
  const matches = hex.match(/.{1,2}/g);
  if (!matches) throw new Error("Invalid hex key");
  return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
}

// Helper: Bytes to URL-safe Base64
function bytesToBase64(bytes: Uint8Array): string {
  const binStr = Array.from(bytes, b => String.fromCharCode(b)).join("");
  return btoa(binStr).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Helper: URL-safe Base64 to bytes
function base64ToBytes(base64: string): Uint8Array {
  const binStr = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) {
    bytes[i] = binStr.charCodeAt(i);
  }
  return bytes;
}

export default function PrivateNotepadWorkspace() {
  const t = useWorkspaceTranslation();
  const [noteText, setNoteText] = useState("");
  const [isDecryptedView, setIsDecryptedView] = useState(false);
  const [decryptedText, setDecryptedText] = useState("");
  const [decryptionError, setDecryptionError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedDecrypted, setCopiedDecrypted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check URL hash for shared encrypted notes
  useEffect(() => {
    async function loadSharedNote() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash || !hash.startsWith("#key=")) {
        setIsDecryptedView(false);
        return;
      }

      setIsDecryptedView(true);
      setIsProcessing(true);
      setDecryptionError("");

      try {
        // Parse #key=XXX&data=YYY
        const params = new URLSearchParams(hash.slice(1));
        const keyHex = params.get("key");
        const dataBase64 = params.get("data");

        if (!keyHex || !dataBase64) {
          throw new Error("Invalid share link format");
        }

        // Import Key
        const keyBuf = hexToBytes(keyHex);
        const cryptoKey = await window.crypto.subtle.importKey(
          "raw",
          keyBuf as any,
          { name: "AES-GCM" },
          true,
          ["decrypt"]
        );

        // Decode Data
        const combined = base64ToBytes(dataBase64);
        if (combined.length < 13) {
          throw new Error("Corrupted payload data");
        }

        // Extract IV and Ciphertext
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);

        // Decrypt
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: iv as any },
          cryptoKey,
          ciphertext as any
        );

        // Decompress
        const text = await decompressText(new Uint8Array(decryptedBuffer));
        setDecryptedText(text);
        trackToolEvent("private-notepad", "success");
      } catch (err: any) {
        console.error(err);
        setDecryptionError(err.message || "Failed to decrypt note. Ensure the link is correct.");
        trackToolEvent("private-notepad", "error", { errorMessage: err.message });
      } finally {
        setIsProcessing(false);
      }
    }

    loadSharedNote();

    window.addEventListener("hashchange", loadSharedNote);
    return () => window.removeEventListener("hashchange", loadSharedNote);
  }, []);

  const handleCreateShareLink = useCallback(async () => {
    if (!noteText.trim()) return;

    setIsProcessing(true);
    setShareUrl("");
    setCopiedShare(false);

    try {
      // 1. Generate AES key
      const cryptoKey = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      // 2. Export key as Raw bytes
      const rawKey = await window.crypto.subtle.exportKey("raw", cryptoKey);
      const keyHex = bytesToHex(new Uint8Array(rawKey));

      // 3. Compress note
      const compressedBytes = await compressText(noteText);

      // 4. Encrypt compressed bytes
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv as any },
        cryptoKey,
        compressedBytes as any
      );

      // 5. Combine IV + Ciphertext
      const combined = new Uint8Array(iv.length + ciphertext.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(ciphertext), iv.length);

      // 6. Base64 encode
      const dataBase64 = bytesToBase64(combined);

      // 7. Assemble Share URL Hash parameters
      const baseUrl = window.location.origin + window.location.pathname;
      const finalUrl = `${baseUrl}#key=${keyHex}&data=${dataBase64}`;
      
      setShareUrl(finalUrl);
      trackToolEvent("private-notepad", "success", { fileSizeBytes: noteText.length });
    } catch (err: any) {
      console.error(err);
      alert("Failed to encrypt note: " + (err.message || "Unknown error"));
      trackToolEvent("private-notepad", "error", { errorMessage: err.message });
    } finally {
      setIsProcessing(false);
    }
  }, [noteText]);

  const handleCopyShareLink = useCallback(() => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  }, [shareUrl]);

  const handleCopyDecrypted = useCallback(() => {
    if (!decryptedText) return;
    navigator.clipboard.writeText(decryptedText);
    setCopiedDecrypted(true);
    setTimeout(() => setCopiedDecrypted(false), 2000);
  }, [decryptedText]);

  const wordCount = useMemo(() => {
    return noteText.trim() === "" ? 0 : noteText.trim().split(/\s+/).length;
  }, [noteText]);

  // Read decrypted note view
  if (isDecryptedView) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border overflow-hidden bg-surface-elevated">
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-ink uppercase tracking-wider">
                Decrypted Private Note
              </span>
            </div>
            {decryptedText && (
              <button
                onClick={handleCopyDecrypted}
                className="flex items-center gap-1.5 text-xs font-medium text-ink hover:text-accent transition-colors cursor-pointer"
              >
                {copiedDecrypted ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy Note
                  </>
                )}
              </button>
            )}
          </div>

          <div className="p-4 min-h-[300px]">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center min-h-[250px] space-y-3">
                <div className="w-8 h-8 rounded-full border-3 border-zinc-200 border-t-accent animate-spin" />
                <span className="text-sm text-ink-muted">Decrypting note payload...</span>
              </div>
            ) : decryptionError ? (
              <div className="flex flex-col items-center justify-center min-h-[250px] text-center p-6">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-red-500 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-sm font-semibold text-ink mb-1">Decryption Failed</p>
                <p className="text-xs text-ink-muted max-w-sm">{decryptionError}</p>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-all font-mono text-sm text-ink leading-relaxed">
                {decryptedText}
              </pre>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-emerald-50/30 flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-emerald-600 mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-emerald-800">100% Zero-Knowledge Privacy</h4>
            <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
              This note was decrypted locally in your browser memory. The decryption key was parsed exclusively from the URL hash fragment (`#`), which browser engines never transit to the server. No trace of the decrypted text or key ever touched our web server.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              window.location.hash = "";
              setIsDecryptedView(false);
              setDecryptedText("");
              setNoteText("");
            }}
            className="text-xs font-semibold text-accent hover:underline cursor-pointer"
          >
            ← Write a New Private Note
          </button>
        </div>
      </div>
    );
  }

  // Write note view
  return (
    <div className="space-y-6">
      {/* Writing Area */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface-elevated">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50/60 border-b border-border">
          <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">Write Private Note</span>
          <div className="text-xs text-ink-muted font-mono">
            {noteText.length} chars · {wordCount} words
          </div>
        </div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Paste or write your confidential API keys, logs, passwords, or personal notes here..."
          className="w-full h-[320px] p-4 font-mono text-sm text-ink bg-transparent resize-none focus:outline-none"
          spellCheck={false}
          disabled={isProcessing}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateShareLink}
          disabled={isProcessing || !noteText.trim()}
          className="flex items-center gap-2 rounded-lg bg-accent text-white dark:text-black font-semibold text-sm px-4 py-2.5 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer shadow-sm hover:opacity-95"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white dark:border-black border-t-transparent animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              Generate Secure Link
            </>
          )}
        </button>
      </div>

      {/* Share URL Result Output */}
      {shareUrl && (
        <div className="rounded-xl border border-border p-4 bg-zinc-50/50 space-y-3">
          <label className="text-xs font-semibold text-ink uppercase tracking-wider block">
            Your Zero-Knowledge Share Link:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-white text-xs font-mono text-ink select-all focus:outline-none"
            />
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-zinc-50 active:scale-[0.97] transition-all cursor-pointer shrink-0"
            >
              {copiedShare ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy Link
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            ⚠️ <strong>Important Note:</strong> Because this link contains the decryption key inside the URL hash (#), anyone who gets this URL will have immediate access to decrypt and view the text. Share it securely with your intended recipient only.
          </p>
        </div>
      )}

      {/* Informational privacy card */}
      <div className="rounded-xl border border-border p-4 bg-zinc-50/50 flex gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-zinc-600 shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div>
          <h4 className="text-sm font-semibold text-ink">How Zero-Knowledge Sharing Works</h4>
          <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
            Your note's plain text is first compressed natively in the browser, then encrypted locally using standard 256-bit AES-GCM encryption. The resulting cipher bytes and the decryption key are loaded directly into the URL hash fragment. Because hashes are client-side only, this data is never sent to the network or stored in any database. Privacy is guaranteed mathematically.
          </p>
        </div>
      </div>
    </div>
  );
}
