"use client";

import React, { useState } from "react";
import ProcessingOverlay from "./ProcessingOverlay";

const HASH_STEPS = [
  "Reading file into memory buffer...",
  "Running cryptographic digest streams...",
  "Validating check block alignments...",
  "Rebuilding hexadecimal hash strings...",
];

// Compact MD5 implementation for client-side files
function md5Buffer(buf: ArrayBuffer): string {
  const K = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ]);

  const r = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
  ];

  // Convert buffer to 8-bit bytes
  const bytes = new Uint8Array(buf);
  const len = bytes.length;
  
  // Pad the bytes
  const numBlocks = (((len + 8) >> 6) + 1);
  const words = new Uint32Array(numBlocks * 16);
  
  for (let i = 0; i < len; i++) {
    words[i >> 2] |= bytes[i] << ((i % 4) * 8);
  }
  words[len >> 2] |= 0x80 << ((len % 4) * 8);
  
  const lenBits = len * 8;
  words[words.length - 2] = lenBits & 0xffffffff;
  words[words.length - 1] = Math.floor(lenBits / 0x100000000);

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;

  const rotateLeft = (x: number, n: number) => (x << n) | (x >>> (32 - n));

  for (let i = 0; i < words.length; i += 16) {
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;

    for (let j = 0; j < 64; j++) {
      let f = 0;
      let g = 0;

      if (j < 16) {
        f = (b & c) | (~b & d);
        g = j;
      } else if (j < 32) {
        f = (d & b) | (~d & c);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        f = b ^ c ^ d;
        g = (3 * j + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * j) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      b = (b + rotateLeft(a + f + K[j] + words[i + g], r[j])) | 0;
      a = temp;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
  }

  const toHex = (n: number) => {
    let s = "";
    for (let i = 0; i < 4; i++) {
      s += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    }
    return s;
  };

  return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3);
}

export default function FileHasherWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [showProcessing, setShowProcessing] = useState(false);

  // Hash outputs
  const [md5Hash, setMd5Hash] = useState("");
  const [sha1Hash, setSha1Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const [sha512Hash, setSha512Hash] = useState("");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Reset hashes
      setMd5Hash("");
      setSha1Hash("");
      setSha256Hash("");
      setSha512Hash("");
    }
  };

  const handleClear = () => {
    setFile(null);
    setMd5Hash("");
    setSha1Hash("");
    setSha256Hash("");
    setSha512Hash("");
  };

  const handleCalculateHashes = async () => {
    if (!file) return;
    setShowProcessing(true);
  };

  const executeHashesDigest = async () => {
    try {
      const buffer = await file!.arrayBuffer();

      // 1. Calculate MD5 via JS algorithm
      const md5 = md5Buffer(buffer);
      setMd5Hash(md5);

      // 2. Calculate SHA-1, SHA-256, SHA-512 via native Web Crypto API
      const sha1Buffer = await crypto.subtle.digest("SHA-1", buffer);
      setSha1Hash(bufferToHex(sha1Buffer));

      const sha256Buffer = await crypto.subtle.digest("SHA-256", buffer);
      setSha256Hash(bufferToHex(sha256Buffer));

      const sha512Buffer = await crypto.subtle.digest("SHA-512", buffer);
      setSha512Hash(bufferToHex(sha512Buffer));
    } catch (err) {
      console.error("Failed to calculate digests:", err);
    } finally {
      setShowProcessing(false);
    }
  };

  function bufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleCopy = (hashText: string, key: string) => {
    navigator.clipboard.writeText(hashText).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload Zone */}
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-3xl p-12 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors flex flex-col items-center justify-center text-center select-none cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-12 h-12 text-ink-muted/60 mb-4" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span className="text-sm font-bold text-ink mb-1">Click or Drag File to Calculate Hashes</span>
          <span className="text-xs text-ink-muted">All hashing algorithms run 100% locally in browser</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">File Details</h3>
              <div className="text-xs space-y-2 text-ink-secondary">
                <p><span className="font-bold text-ink-muted">Name:</span> {file.name}</p>
                <p><span className="font-bold text-ink-muted">Size:</span> {formatSize(file.size)}</p>
                <p><span className="font-bold text-ink-muted">Type:</span> {file.type || "unknown"}</p>
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-border/50">
                <button
                  onClick={handleClear}
                  className="flex-1 py-2.5 border border-border text-ink hover:text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                  Clear File
                </button>
                <button
                  onClick={handleCalculateHashes}
                  className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white dark:text-black text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
                >
                  Generate Hashes
                </button>
              </div>
            </div>
          </div>

          {/* Hashes Output List */}
          <div className="lg:col-span-8 space-y-4">
            {md5Hash ? (
              <div className="space-y-3.5">
                {/* MD5 */}
                <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">MD5 Checksum</span>
                    <button
                      onClick={() => handleCopy(md5Hash, "md5")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copiedKey === "md5" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-ink select-all break-all bg-zinc-950/20 p-2.5 rounded-lg border border-border/30">
                    {md5Hash}
                  </pre>
                </div>

                {/* SHA-1 */}
                <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">SHA-1 Checksum</span>
                    <button
                      onClick={() => handleCopy(sha1Hash, "sha1")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copiedKey === "sha1" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-ink select-all break-all bg-zinc-950/20 p-2.5 rounded-lg border border-border/30">
                    {sha1Hash}
                  </pre>
                </div>

                {/* SHA-256 */}
                <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">SHA-256 Checksum</span>
                    <button
                      onClick={() => handleCopy(sha256Hash, "sha256")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copiedKey === "sha256" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-ink select-all break-all bg-zinc-950/20 p-2.5 rounded-lg border border-border/30">
                    {sha256Hash}
                  </pre>
                </div>

                {/* SHA-512 */}
                <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">SHA-512 Checksum</span>
                    <button
                      onClick={() => handleCopy(sha512Hash, "sha512")}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copiedKey === "sha512" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-ink select-all break-all bg-zinc-950/20 p-2.5 rounded-lg border border-border/30">
                    {sha512Hash}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-64 border border-dashed border-border/80 rounded-2xl bg-surface-elevated/20 flex items-center justify-center italic text-xs text-ink-muted/40">
                Click &apos;Generate Hashes&apos; above to calculate checksum digests...
              </div>
            )}
          </div>
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={HASH_STEPS}
        loadingText="Generating checksum digests..."
        duration={1500}
        onFinished={executeHashesDigest}
      />
    </div>
  );
}
