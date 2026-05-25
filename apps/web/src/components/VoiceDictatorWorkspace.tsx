"use client";

import React, { useState, useEffect, useRef } from "react";

export default function VoiceDictatorWorkspace() {
  const [text, setText] = useState("Type or dictate text here. Select a voice and settings below to hear it read aloud!");
  const [isListening, setIsListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  
  // TTS State
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [rate, setRate] = useState(1); // speed
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Recognition & Synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Setup speech synthesis
      synthRef.current = window.speechSynthesis;
      if (synthRef.current) {
        const loadVoices = () => {
          const availableVoices = window.speechSynthesis.getVoices();
          setVoices(availableVoices);
          if (availableVoices.length > 0 && !selectedVoiceName) {
            // Find default English voice if available, otherwise first
            const defaultVoice = availableVoices.find(v => v.lang.startsWith("en")) || availableVoices[0];
            setSelectedVoiceName(defaultVoice.name);
          }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      // 2. Setup speech recognition
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript) {
            setText((prev) => prev + (prev.endsWith(" ") || prev === "" ? "" : " ") + finalTranscript);
          }
        };

        rec.onend = () => {
          setIsListening(false);
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Listen / Dictate Toggle
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Stop TTS if playing
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
      }
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  };

  // TTS Controls
  const handleSpeak = () => {
    if (!synthRef.current || !text.trim()) return;

    if (synthRef.current.speaking) {
      if (isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
      } else {
        synthRef.current.pause();
        setIsPaused(true);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find((v) => v.name === selectedVoiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (err) => {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    synthRef.current.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setText("");
    handleStopSpeaking();
  };

  const handleDownload = () => {
    if (!text.trim()) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dictation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings / Controls Column */}
        <div className="lg:col-span-5 space-y-4 select-none">
          {/* Dictation Box */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm text-center">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Voice Dictator</h3>
            
            {recognitionSupported ? (
              <div className="flex flex-col items-center py-4">
                <button
                  onClick={toggleListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                      : "bg-accent hover:bg-accent-hover text-white hover:scale-105"
                  }`}
                >
                  <svg className="w-8 h-8" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                    {isListening ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    )}
                  </svg>
                </button>
                <p className="text-xs font-bold mt-4 text-ink">
                  {isListening ? "Listening... Speak now" : "Click to Start Dictation"}
                </p>
                <p className="text-[10px] text-ink-muted mt-1">Dictation processes 100% locally in browser</p>
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-xl text-xs font-semibold leading-relaxed">
                Speech recognition is not supported in this browser. Try Google Chrome or Safari.
              </div>
            )}
          </div>

          {/* Reader Options */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Voice Reader</h3>

            {/* Select Voice */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-ink-muted uppercase block">Select Voice</label>
              {voices.length > 0 ? (
                <select
                  value={selectedVoiceName}
                  onChange={(e) => setSelectedVoiceName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950/20 border border-border/70 rounded-xl px-3 py-2 text-xs font-semibold text-ink focus:outline-none"
                >
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-xs text-ink-muted italic">No voices loaded...</div>
              )}
            </div>

            {/* Speed & Pitch */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <span>Speed</span>
                  <span className="font-mono text-accent">{rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <span>Pitch</span>
                  <span className="font-mono text-accent">{pitch}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-border/40">
              <button
                onClick={handleSpeak}
                disabled={!text.trim()}
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-accent/10"
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    {isPaused ? "Resume" : "Read Aloud"}
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={handleStopSpeaking}
                  className="py-2.5 px-4 border border-border text-ink hover:text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Text Workspace Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
              <span>Text Workspace</span>
              {text && (
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleClear}
                    className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start speaking or type text here..."
              className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
