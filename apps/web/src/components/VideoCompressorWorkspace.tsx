"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

type CompressionPreset = "original" | "1080p" | "720p" | "480p";

export default function VideoCompressorWorkspace() {
  const t = useWorkspaceTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [preset, setPreset] = useState<CompressionPreset>("720p");
  const [videoBitrate, setVideoBitrate] = useState<number>(1500); // kbps
  const [muteAudio, setMuteAudio] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string>("");
  const [meta, setMeta] = useState<{
    width: number;
    height: number;
    duration: number;
    type: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Clean up Object URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [videoUrl, compressedUrl]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    setFile(selected);
    setVideoUrl(URL.createObjectURL(selected));
    setCompressedBlob(null);
    setCompressedUrl("");
    setProgress(0);
    setMeta(null);
  }, [videoUrl, compressedUrl]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setMeta({
      width: video.videoWidth,
      height: video.videoHeight,
      duration: video.duration,
      type: file?.type || "video/mp4"
    });
  }, [file]);

  const handleCompress = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !meta) return;

    setIsProcessing(true);
    setProgress(0);
    setCompressedBlob(null);
    setCompressedUrl("");

    // Determine target dimensions
    let targetWidth = meta.width;
    let targetHeight = meta.height;

    if (preset === "1080p" && meta.height > 1080) {
      targetWidth = Math.round((meta.width * 1080) / meta.height);
      targetHeight = 1080;
    } else if (preset === "720p" && meta.height > 720) {
      targetWidth = Math.round((meta.width * 720) / meta.height);
      targetHeight = 720;
    } else if (preset === "480p" && meta.height > 480) {
      targetWidth = Math.round((meta.width * 480) / meta.height);
      targetHeight = 480;
    }

    // Ensure dimensions are even (required by some encoders)
    targetWidth = targetWidth % 2 === 0 ? targetWidth : targetWidth - 1;
    targetHeight = targetHeight % 2 === 0 ? targetHeight : targetHeight - 1;

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create stream from Canvas
    const canvasStream = canvas.captureStream(24); // 24 FPS target
    const combinedTracks: MediaStreamTrack[] = [canvasStream.getVideoTracks()[0]];

    // Connect Audio if not muted
    let audioDest: MediaStreamAudioDestinationNode | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;

    if (!muteAudio) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioCtxRef.current = audioCtx;

        audioSource = audioCtx.createMediaElementSource(video);
        audioDest = audioCtx.createMediaStreamDestination();

        // Connect source to destination node AND browser speaker output
        audioSource.connect(audioDest);
        audioSource.connect(audioCtx.destination);

        const audioTrack = audioDest.stream.getAudioTracks()[0];
        if (audioTrack) combinedTracks.push(audioTrack);
      } catch (err) {
        console.warn("Failed to capture audio stream: ", err);
      }
    }

    const outputStream = new MediaStream(combinedTracks);

    // Determine supported MediaRecorder mimeType codecs
    let mimeType = "video/webm;codecs=vp9,opus";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/webm;codecs=vp8,opus";
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/webm";
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/mp4;codecs=avc1";
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = ""; // Fallback to browser default
    }

    const options = {
      mimeType,
      videoBitsPerSecond: videoBitrate * 1000, // Convert to bps
      audioBitsPerSecond: 128 * 1000 // 128 kbps
    };

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(outputStream, options);
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      // 1. Revoke active animations
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // 2. Disconnect and close audio context
      if (audioSource && audioDest) {
        audioSource.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }

      // 3. Assemble compressed Blob
      const resultBlob = new Blob(chunks, { type: mimeType || "video/webm" });
      setCompressedBlob(resultBlob);
      setCompressedUrl(URL.createObjectURL(resultBlob));
      setIsProcessing(false);
      setProgress(100);

      trackToolEvent("video-compressor", "success", {
        fileSizeBytes: file?.size || 0
      });
    };

    // Begin drawing loop
    video.currentTime = 0;
    video.muted = true; // Mute element to avoid double playback sounds

    const drawFrame = () => {
      if (video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
      
      // Update progress bar
      const pct = Math.min(99, Math.round((video.currentTime / meta.duration) * 100));
      setProgress(pct);

      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    video.onplay = () => {
      drawFrame();
    };

    // Play video at normal speed to allow MediaRecorder recording
    video.playbackRate = 1.0;
    
    // Start recording
    recorder.start();
    await video.play();

    // Stop recording once video ends
    video.onended = () => {
      recorder.stop();
    };
  }, [meta, preset, videoBitrate, muteAudio, file]);

  const handleCancel = useCallback(() => {
    const video = videoRef.current;
    if (video) video.pause();

    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }

    setIsProcessing(false);
    setProgress(0);
  }, []);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const compressionRatio = useMemo(() => {
    if (!file || !compressedBlob) return 0;
    return Math.round((1 - compressedBlob.size / file.size) * 100);
  }, [file, compressedBlob]);

  return (
    <div className="space-y-6">
      {/* Upload Drag & Drop Box */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border hover:border-accent hover:bg-zinc-50/50 rounded-xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px]"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
          />
          <svg
            className="w-12 h-12 text-zinc-400 mb-4"
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <h3 className="text-sm font-semibold text-ink mb-1">Select Video File</h3>
          <p className="text-xs text-ink-muted max-w-xs leading-normal">
            Upload MP4, WebM, or MOV files. Files are processed entirely locally in your browser cache.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel: Original Video Preview & Settings */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border overflow-hidden bg-black aspect-video relative flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-contain"
                controls
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {meta && (
              <div className="rounded-xl border border-border p-4 bg-zinc-50/50 space-y-2">
                <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">Video Metadata</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-ink-secondary">
                  <div>Dimension: {meta.width} × {meta.height}</div>
                  <div>Duration: {meta.duration.toFixed(1)}s</div>
                  <div>Size: {formatSize(file.size)}</div>
                  <div>Format: {file.type.split("/")[1]?.toUpperCase() || "MP4"}</div>
                </div>
              </div>
            )}

            {/* Config panel */}
            <div className="rounded-xl border border-border p-4 space-y-4 bg-white">
              <h3 className="text-sm font-semibold text-ink">Compression Settings</h3>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink uppercase tracking-wider block">Resolution Preset</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["original", "1080p", "720p", "480p"] as CompressionPreset[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPreset(p)}
                      disabled={isProcessing}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        preset === p
                          ? "bg-accent border-accent text-white dark:text-black"
                          : "border-border text-ink hover:bg-zinc-50"
                      }`}
                    >
                      {p === "original" ? "Original" : p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Bitrate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-ink uppercase tracking-wider">
                  <span>Video Bitrate Target</span>
                  <span className="font-mono font-normal normal-case">{videoBitrate} kbps</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="8000"
                  step="100"
                  value={videoBitrate}
                  onChange={(e) => setVideoBitrate(Number(e.target.value))}
                  disabled={isProcessing}
                  className="w-full accent-accent bg-zinc-200 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
                <span className="text-[10px] text-ink-muted block">
                  Lower bitrates result in smaller file sizes, but may reduce image clarity.
                </span>
              </div>

              {/* Mute Audio Option */}
              <label className="flex items-center gap-2 text-xs font-semibold text-ink uppercase tracking-wider cursor-pointer">
                <input
                  type="checkbox"
                  checked={muteAudio}
                  onChange={(e) => setMuteAudio(e.target.checked)}
                  disabled={isProcessing}
                  className="rounded border-border text-accent focus:ring-accent/20 cursor-pointer"
                />
                Mute Audio Track
              </label>

              {/* Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => {
                    handleCancel();
                    setFile(null);
                  }}
                  disabled={isProcessing}
                  className="flex-1 py-2 text-xs font-semibold text-ink border border-border rounded-lg hover:bg-zinc-50 transition-all cursor-pointer"
                >
                  Choose New File
                </button>
                {isProcessing ? (
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Cancel Compressing
                  </button>
                ) : (
                  <button
                    onClick={handleCompress}
                    className="flex-1 py-2 text-xs font-semibold text-white dark:text-black bg-accent rounded-lg active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:opacity-95"
                  >
                    Compress Video
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: Processing / Results Output */}
          <div className="flex flex-col justify-between border border-border rounded-xl p-6 bg-zinc-50/20 min-h-[300px]">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-200 border-t-accent animate-spin" />
                  <span className="text-sm font-semibold font-mono text-ink">{progress}%</span>
                </div>
                <div className="text-center space-y-1">
                  <h4 className="text-sm font-semibold text-ink">Re-encoding Video</h4>
                  <p className="text-xs text-ink-muted max-w-xs leading-normal">
                    Processing canvas stream frames and mixing audio tracks. Keep this tab open.
                  </p>
                </div>
              </div>
            ) : compressedBlob ? (
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-ink uppercase tracking-wider">Compression Successful</span>
                  </div>

                  <div className="rounded-xl border border-border overflow-hidden bg-black aspect-video">
                    <video src={compressedUrl} className="w-full h-full object-contain" controls />
                  </div>

                  <div className="rounded-xl border border-border p-4 bg-white grid grid-cols-2 gap-4 text-xs font-mono text-ink-secondary">
                    <div>Original Size: {formatSize(file.size)}</div>
                    <div>Output Size: {formatSize(compressedBlob.size)}</div>
                    <div>Saved Space: {compressionRatio}%</div>
                    <div>Format Codec: WEBM (VP9)</div>
                  </div>
                </div>

                <a
                  href={compressedUrl}
                  download={`compressed-${file.name}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white dark:text-black bg-emerald-600 rounded-lg active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:bg-emerald-700 text-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Compressed Video
                </a>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                <svg
                  className="w-12 h-12 text-zinc-300"
                  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <h4 className="text-sm font-semibold text-ink-muted">Ready for Processing</h4>
                <p className="text-xs text-ink-muted max-w-xs leading-normal">
                  Configure your resolution and bitrates on the left panel, and click "Compress Video" to begin the re-encoding pipeline.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
