"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { encodeBase64, decodeBase64, isValidBase64 } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const BASE64_STEPS = [
  "Reading binary stream data...",
  "Executing Base64 byte-mapping...",
  "Compiling MIME-type header...",
  "Packaging output Data URL...",
];

export default function Base64Workspace() {
  const [mode, setMode] = useState<"encode" | "decode" | "file">("encode");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Clipboard copied status
  const [copied, setCopied] = useState(false);

  // File processing state
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live conversion for text modes
  useEffect(() => {
    if (mode === "file") return;
    setError(null);
    if (!inputText) {
      setOutputText("");
      return;
    }

    try {
      if (mode === "encode") {
        setOutputText(encodeBase64(inputText));
      } else {
        if (isValidBase64(inputText)) {
          setOutputText(decodeBase64(inputText));
        } else {
          setOutputText("");
          setError("Invalid Base64 sequence detected");
        }
      }
    } catch (err: any) {
      setOutputText("");
      setError(err.message || "Failed to process text");
    }
  }, [inputText, mode]);

  const handleCopy = () => {
    const textToCopy = mode === "file" ? fileBase64 : outputText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setFile(null);
    setFileBase64("");
    setError(null);
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const convertFile = useCallback(() => {
    if (!file) return;
    setIsConverting(true);
    setShowProcessingOverlay(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setFileBase64(result);
      } else {
        setError("Failed to read file binary stream");
      }
    };
    reader.onerror = () => {
      setError("An error occurred reading the file");
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleProcessingFinished = useCallback(() => {
    setIsConverting(false);
    setShowProcessingOverlay(false);
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* Switcher Rail */}
      <div className="flex border-b border-border/40 select-none">
        {(["encode", "decode", "file"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              handleClear();
            }}
            className={`px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer min-h-[44px] ${
              mode === m
                ? "border-accent text-accent"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            {m === "encode"
              ? "Text to Base64"
              : m === "decode"
              ? "Base64 to Text"
              : "File to Base64"}
          </button>
        ))}
      </div>

      {mode !== "file" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Input Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center select-none">
              <label htmlFor="text-input" className="text-xs font-bold text-ink uppercase tracking-wider">
                {mode === "encode" ? "Raw UTF-8 Text" : "Base64 Code"}
              </label>
              {inputText && (
                <span className="text-[10px] text-ink-muted font-mono font-bold">
                  {inputText.length} chars
                </span>
              )}
            </div>
            <textarea
              id="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Type or paste UTF-8 text here..."
                  : "Paste Base64 encoded string here..."
              }
              className="w-full h-64 p-4 rounded-xl border border-border bg-surface-elevated text-sm font-mono text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all"
            />
          </div>

          {/* RIGHT: Output Area */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center select-none">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">
                Result
              </span>
              {outputText && (
                <span className="text-[10px] text-ink-muted font-mono font-bold">
                  {outputText.length} chars
                </span>
              )}
            </div>

            <div className="relative h-64 w-full rounded-xl border border-border bg-surface-elevated p-4 overflow-y-auto font-mono text-sm text-ink select-all">
              {outputText ? (
                <pre className="whitespace-pre-wrap break-all pr-12">{outputText}</pre>
              ) : (
                <span className="text-ink-muted/40 italic">Result will update dynamically...</span>
              )}

              {/* Action Buttons floated in the output card */}
              {outputText && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 select-none">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg border border-border/80 bg-surface/90 hover:bg-surface text-ink hover:text-accent transition-colors shadow-sm cursor-pointer"
                    title="Copy Result"
                  >
                    {copied ? (
                      <span className="text-xs font-bold text-emerald-500 px-1">Copied!</span>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 font-bold font-mono text-[11px] mt-1.5 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FILE TO BASE64 MODE */
        <div className="space-y-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer p-6 transition-all ${
              isDragging
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/40 bg-surface-elevated/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="p-3.5 bg-surface rounded-xl border border-border/80 shadow-sm text-ink-muted">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            {file ? (
              <div className="text-center mt-3 space-y-1">
                <p className="text-sm font-bold text-ink truncate max-w-xs">{file.name}</p>
                <p className="text-[11px] text-ink-muted">{file.type || "unknown type"} • {(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="text-center mt-3 space-y-1 select-none">
                <p className="text-sm font-bold text-ink">Drag and drop file here, or click to browse</p>
                <p className="text-[11px] text-ink-muted">Supports any file type up to 15MB</p>
              </div>
            )}
          </div>

          {file && !fileBase64 && (
            <div className="flex justify-center select-none">
              <button
                onClick={convertFile}
                className="px-6 py-3 bg-ink hover:bg-ink/90 border border-ink text-surface font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md transition-all active:scale-[0.98]"
              >
                Encode File to Base64
              </button>
            </div>
          )}

          {fileBase64 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center select-none">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Base64 Data URL ({file?.name})
                </span>
                <span className="text-[10px] text-ink-muted font-mono font-bold">
                  {fileBase64.length} characters
                </span>
              </div>

              <div className="relative h-64 w-full rounded-xl border border-border bg-surface-elevated p-4 overflow-y-auto font-mono text-sm text-ink select-all">
                <pre className="whitespace-pre-wrap break-all pr-12">{fileBase64}</pre>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 select-none">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg border border-border/80 bg-surface/90 hover:bg-surface text-ink hover:text-accent transition-colors shadow-sm cursor-pointer"
                    title="Copy Data URL"
                  >
                    {copied ? (
                      <span className="text-xs font-bold text-emerald-500 px-1">Copied!</span>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Control Actions footer */}
      {(inputText || file) && (
        <div className="flex justify-end select-none">
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border text-ink hover:text-red-500 rounded-lg text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            Clear Content
          </button>
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={BASE64_STEPS}
        loadingText="Encoding your file..."
        duration={1500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}
