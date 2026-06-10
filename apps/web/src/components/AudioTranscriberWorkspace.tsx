"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

const SUPPORTED_LANGUAGES = [
  { code: "auto", name: "Auto-Detect Language" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "fr", name: "French (Français)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "ar", name: "Arabic (العربية)" },
];

interface WhisperChunk {
  timestamp: [number, number];
  text: string;
}

interface WhisperResult {
  text: string;
  chunks: WhisperChunk[];
}

export default function AudioTranscriberWorkspace() {
  const t = useWorkspaceTranslation();

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "resampling" | "loading_model" | "downloading" | "transcribing" | "done" | "error"
  >("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Options
  const [modelName, setModelName] = useState("Xenova/whisper-tiny.en");
  const [language, setLanguage] = useState("auto");
  const [timestampFormat, setTimestampFormat] = useState<"[MM:SS]" | "[HH:MM:SS]">("[MM:SS]");
  const [activeTab, setActiveTab] = useState<"paragraphs" | "timestamps">("paragraphs");

  // Output Results
  const [results, setResults] = useState<WhisperResult | null>(null);
  const [editedParagraphs, setEditedParagraphs] = useState("");
  const [editedChunks, setEditedChunks] = useState<WhisperChunk[]>([]);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Format seconds to timestamps
  const formatTime = useCallback((time: number, format: "[MM:SS]" | "[HH:MM:SS]") => {
    if (isNaN(time) || time === null) return "[00:00]";
    const hh = Math.floor(time / 3600);
    const mm = Math.floor((time % 3600) / 60);
    const ss = Math.floor(time % 60);
    if (format === "[HH:MM:SS]") {
      return `[${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}]`;
    }
    return `[${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}]`;
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      setFile(droppedFile);
      setStatus("idle");
      setResults(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setResults(null);
    }
  };

  const startTranscription = async () => {
    if (!file) return;

    setStatus("resampling");
    setErrorMsg("");

    try {
      trackToolEvent("audio-transcriber", "start", { fileSizeBytes: file.size });

      // Resample Audio to 16kHz Float32 mono array
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);

          const targetSampleRate = 16000;
          const offlineCtx = new OfflineAudioContext(
            1, // mono channel
            decodedBuffer.duration * targetSampleRate,
            targetSampleRate
          );

          const source = offlineCtx.createBufferSource();
          source.buffer = decodedBuffer;
          source.connect(offlineCtx.destination);
          source.start();

          const resampledBuffer = await offlineCtx.startRendering();
          const float32Data = resampledBuffer.getChannelData(0);

          // Launch Worker & Transcribe
          if (workerRef.current) {
            workerRef.current.terminate();
          }

          workerRef.current = new Worker(new URL("./transcriber.worker.ts", import.meta.url));

          workerRef.current.onmessage = (event) => {
            const msg = event.data;
            switch (msg.status) {
              case "loading":
                setStatus("loading_model");
                break;
              case "download_progress":
                setStatus("downloading");
                setDownloadProgress(Math.round(msg.progress));
                break;
              case "download_ready":
                setStatus("loading_model");
                break;
              case "transcribing":
                setStatus("transcribing");
                break;
              case "done":
                setStatus("done");
                const res: WhisperResult = msg.result;
                setResults(res);
                setEditedParagraphs(res.text || "");
                setEditedChunks(res.chunks || []);
                trackToolEvent("audio-transcriber", "success", { fileSizeBytes: file.size });
                break;
              case "error":
                setStatus("error");
                setErrorMsg(msg.error || "Failed running transcription model.");
                trackToolEvent("audio-transcriber", "error", { errorMessage: msg.error });
                break;
            }
          };

          workerRef.current.postMessage({
            audio: float32Data,
            modelName,
            language: language === "auto" ? null : language,
          });
        } catch (err: any) {
          console.error("Audio resampling/decoding error:", err);
          setStatus("error");
          setErrorMsg(
            t("audio_transcriber.error_audio_decode", "Failed to decode audio file. Try MP3 or WAV.")
          );
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err: any) {
      console.error("Audio initialization error:", err);
      setStatus("error");
      setErrorMsg(err.message || "Could not initialize web audio components.");
    }
  };

  const handleCopy = () => {
    let copyText = "";
    if (activeTab === "paragraphs") {
      copyText = editedParagraphs;
    } else {
      copyText = editedChunks
        .map((c) => `${formatTime(c.timestamp[0], timestampFormat)} ${c.text}`)
        .join("\n");
    }

    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    let downloadText = "";
    if (activeTab === "paragraphs") {
      downloadText = editedParagraphs;
    } else {
      downloadText = editedChunks
        .map((c) => `${formatTime(c.timestamp[0], timestampFormat)} ${c.text}`)
        .join("\n");
    }

    const blob = new Blob([downloadText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(/\.[^/.]+$/, "") || "transcript"}-transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChunkChange = (index: number, newText: string) => {
    setEditedChunks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], text: newText };
      return next;
    });
  };

  const clearAll = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setFile(null);
    setStatus("idle");
    setDownloadProgress(0);
    setErrorMsg("");
    setResults(null);
    setEditedParagraphs("");
    setEditedChunks([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Drag-and-drop & Settings */}
        <div className="lg:col-span-5 space-y-4">
          {/* File Upload card */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-6 text-center transition-all bg-surface-elevated select-none ${
              file
                ? "border-accent/40"
                : "border-border hover:border-accent/30 cursor-pointer"
            }`}
            onClick={!file ? () => fileInputRef.current?.click() : undefined}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  file ? "bg-accent/10 text-accent" : "bg-neutral-100 dark:bg-neutral-800 text-zinc-400"
                }`}
              >
                <svg className="w-6 h-6" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>

              {file ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-ink truncate max-w-xs mx-auto">{file.name}</p>
                  <p className="text-[10px] text-ink-muted">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAll();
                    }}
                    className="text-[10px] text-red-500 hover:text-red-600 font-bold block mx-auto pt-2 cursor-pointer"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-ink">
                    {t("audio_transcriber.drop_zone_prompt", "Drop an audio file here or click to browse")}
                  </p>
                  <p className="text-[10px] text-ink-muted leading-normal px-4">
                    {t(
                      "audio_transcriber.drop_zone_prompt_sub",
                      "Supports MP3, WAV, M4A, OGG, WEBM — 100% private client-side transcription"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Model Settings Card */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm select-none">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              {t("audio_transcriber.model_selection", "Select Whisper Model")}
            </h3>

            {/* Model Toggle */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setModelName("Xenova/whisper-tiny.en")}
                  disabled={status !== "idle" && status !== "done" && status !== "error"}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    modelName === "Xenova/whisper-tiny.en"
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/20 text-ink-secondary"
                  }`}
                >
                  English Only
                </button>
                <button
                  onClick={() => setModelName("Xenova/whisper-tiny")}
                  disabled={status !== "idle" && status !== "done" && status !== "error"}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    modelName === "Xenova/whisper-tiny"
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/20 text-ink-secondary"
                  }`}
                >
                  Multilingual
                </button>
              </div>
              <p className="text-[10px] text-ink-muted leading-relaxed">
                {modelName === "Xenova/whisper-tiny.en"
                  ? t(
                      "audio_transcriber.model_desc_tiny_en",
                      "Whisper Tiny (English-only, ~75MB) — Fast and highly accurate for English."
                    )
                  : t(
                      "audio_transcriber.model_desc_tiny",
                      "Whisper Tiny (Multilingual, ~75MB) — Supports 90+ languages. Auto-detects speech language."
                    )}
              </p>
            </div>

            {/* Language Selection */}
            {modelName === "Xenova/whisper-tiny" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-muted uppercase block">
                  {t("audio_transcriber.language_label", "Audio Language")}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={status !== "idle" && status !== "done" && status !== "error"}
                  className="w-full bg-zinc-50 dark:bg-zinc-950/20 border border-border/70 rounded-xl px-3 py-2.5 text-xs font-semibold text-ink focus:outline-none"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Timestamp Formatting */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-ink-muted uppercase block">
                {t("audio_transcriber.timestamp_format", "Timestamp Format")}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimestampFormat("[MM:SS]")}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                    timestampFormat === "[MM:SS]"
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/10 text-ink-secondary"
                  }`}
                >
                  {t("audio_transcriber.format_mm_ss", "[MM:SS]")}
                </button>
                <button
                  onClick={() => setTimestampFormat("[HH:MM:SS]")}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                    timestampFormat === "[HH:MM:SS]"
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/10 text-ink-secondary"
                  }`}
                >
                  {t("audio_transcriber.format_hh_mm_ss", "[HH:MM:SS]")}
                </button>
              </div>
            </div>

            {/* Warning Initial Download */}
            <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-ink leading-relaxed">
              {t(
                "audio_transcriber.warning_initial_download",
                "⚠️ First run will download the ~75MB AI model to your browser's local cache. Subsequent runs are instant."
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={startTranscription}
              disabled={
                !file || (status !== "idle" && status !== "done" && status !== "error")
              }
              className="w-full py-3 bg-accent hover:bg-accent-hover text-white dark:text-black disabled:opacity-40 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-accent/10"
            >
              {status === "idle" || status === "done" || status === "error" ? (
                <>
                  <svg className="w-4 h-4" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                  {t("audio_transcriber.transcribe_btn", "Transcribe Audio")}
                </>
              ) : (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  {t("audio_transcriber.transcribing", "Transcribing...")}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Process Indicator & Results Workspace */}
        <div className="lg:col-span-7 flex flex-col h-[520px]">
          {/* Working / Progress States */}
          {status !== "idle" && status !== "done" && status !== "error" ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-border rounded-2xl bg-surface-elevated p-8 space-y-4 shadow-sm">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-neutral-100 dark:border-neutral-800" />
                <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                {status === "downloading" && (
                  <span className="text-[10px] font-mono font-bold text-accent">{downloadProgress}%</span>
                )}
              </div>

              <div className="text-center space-y-1 select-none">
                <p className="text-xs font-bold text-ink uppercase tracking-wider">
                  {status === "resampling" && t("audio_transcriber.resampling_audio", "Decoding Audio...")}
                  {status === "downloading" &&
                    t("audio_transcriber.download_progress", "Downloading Model: {progress}%").replace(
                      "{progress}",
                      String(downloadProgress)
                    )}
                  {status === "loading_model" && t("audio_transcriber.loading_model", "Loading Whisper AI Model...")}
                  {status === "transcribing" && t("audio_transcriber.running_inference", "Running Transcription...")}
                </p>
                <p className="text-[10px] text-ink-muted px-4">
                  {status === "resampling" && "Converting audio file to standard 16kHz mono format on CPU."}
                  {status === "downloading" && "Whisper AI weights are loading. This happens once."}
                  {status === "loading_model" && "Initializing automatic speech recognition WebAssembly pipeline."}
                  {status === "transcribing" && "Running Whisper acoustic audio-to-text inference chunks."}
                </p>
              </div>
            </div>
          ) : status === "error" ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-red-500/10 rounded-2xl bg-surface-elevated p-8 space-y-4 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="space-y-1 select-none">
                <p className="text-xs font-bold text-ink uppercase tracking-wider">Failed to Transcribe</p>
                <p className="text-xs text-red-500 max-w-sm px-4 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          ) : results === null ? (
            // Idle Placeholder
            <div className="flex-1 flex flex-col items-center justify-center border border-border rounded-2xl bg-surface-elevated p-8 space-y-4 shadow-sm text-center select-none">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-zinc-400 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xs text-ink-muted max-w-xs font-bold uppercase tracking-wider">
                {t("audio_transcriber.empty_prompt", "Upload an audio file to begin.")}
              </p>
            </div>
          ) : (
            // Results Displayed
            <div className="flex-1 flex flex-col border border-border rounded-2xl bg-surface-elevated overflow-hidden shadow-sm h-full">
              {/* Header Tab Bar */}
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink flex justify-between items-center select-none shrink-0">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("paragraphs")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === "paragraphs"
                        ? "bg-zinc-200 dark:bg-zinc-800 text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t("audio_transcriber.tab_paragraphs", "Paragraphs")}
                  </button>
                  <button
                    onClick={() => setActiveTab("timestamps")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === "timestamps"
                        ? "bg-zinc-200 dark:bg-zinc-800 text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t("audio_transcriber.tab_timestamps", "Timestamps View")}
                  </button>
                </div>

                <div className="flex gap-3 text-[10px] text-accent">
                  <button onClick={handleCopy} className="hover:text-accent-hover font-bold cursor-pointer">
                    {copied ? t("common.copied", "Copied!") : t("audio_transcriber.copy_btn", "Copy")}
                  </button>
                  <button onClick={clearAll} className="hover:text-accent-hover font-bold cursor-pointer">
                    {t("audio_transcriber.clear_btn", "Clear")}
                  </button>
                  <button onClick={handleDownload} className="hover:text-accent-hover font-bold cursor-pointer">
                    {t("audio_transcriber.download_btn", "Download")}
                  </button>
                </div>
              </div>

              {/* Workspace Editing area */}
              <div className="flex-1 overflow-auto p-4 bg-zinc-950/20">
                {activeTab === "paragraphs" ? (
                  <textarea
                    value={editedParagraphs}
                    onChange={(e) => setEditedParagraphs(e.target.value)}
                    className="w-full h-full border-none outline-none bg-transparent font-mono text-sm leading-relaxed text-ink resize-none focus:ring-0 focus:outline-none"
                    spellCheck={false}
                  />
                ) : (
                  <div className="space-y-3 font-mono text-xs text-ink h-full">
                    {editedChunks.map((chunk, index) => (
                      <div key={index} className="flex gap-3 items-start group">
                        <span className="text-accent font-bold select-none shrink-0 pt-1">
                          {formatTime(chunk.timestamp[0], timestampFormat)}
                        </span>
                        <textarea
                          rows={1}
                          value={chunk.text}
                          onChange={(e) => handleChunkChange(index, e.target.value)}
                          className="flex-1 border-none outline-none bg-transparent text-ink leading-relaxed resize-none focus:ring-0 focus:outline-none p-0"
                          style={{ height: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
