"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

interface CaptionTrack {
  baseUrl: string;
  name: { simpleText: string };
  languageCode: string;
  kind?: string;
}

export default function YoutubeTranscriptWorkspace() {
  const searchParams = useSearchParams();
  const t = useWorkspaceTranslation();
  const urlParam = searchParams.get("url");

  const [url, setUrl] = useState(urlParam || "");
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [tracks, setTracks] = useState<CaptionTrack[]>([]);
  const [selectedTrackUrl, setSelectedTrackUrl] = useState<string>("");
  
  const [transcriptSrt, setTranscriptSrt] = useState("");
  const [transcriptTxt, setTranscriptTxt] = useState("");
  const [viewMode, setViewMode] = useState<"srt" | "txt">("srt");
  const [copySuccess, setCopySuccess] = useState(false);

  // Check if extension is installed on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isInstalled = document.documentElement.hasAttribute("data-zerowebtools-companion");
      setExtensionInstalled(isInstalled);
    }
  }, []);

  // Set up message listener for extension proxy response
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH_RESPONSE') {
        return;
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const proxyFetchViaExtension = (targetUrl: string, spoof: boolean, method = "GET", headers = {}, body?: string) => {
    const messageId = Math.random().toString(36).substring(2, 15);
    window.postMessage({
      type: 'ZWT_PROXY_FETCH',
      id: messageId,
      url: targetUrl,
      method: method,
      headers: headers,
      body: body,
      spoofGooglebot: spoof
    }, '*');
    return new Promise((resolve, reject) => {
      const handleResponse = (event: MessageEvent) => {
        if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH_RESPONSE' || event.data.id !== messageId) {
          return;
        }
        window.removeEventListener('message', handleResponse);
        if (event.data.response.error) {
          reject(new Error(event.data.response.error));
        } else {
          resolve(event.data.response);
        }
      };
      window.addEventListener('message', handleResponse);
    });
  };

  const extractTracks = async () => {
    if (!url) return;
    setIsExtracting(true);
    setError(null);
    setTracks([]);
    setTranscriptSrt("");
    setTranscriptTxt("");

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && targetUrl.length !== 11) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      if (!extensionInstalled) {
        setError("Extension required to bypass CORS.");
        setIsExtracting(false);
        return;
      }
      
      const videoIdMatch = targetUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      const videoId = videoIdMatch ? videoIdMatch[1] : (targetUrl.length === 11 ? targetUrl : null);

      if (!videoId) {
        throw new Error("Invalid YouTube URL or Video ID.");
      }

      const INNERTUBE_CLIENT_VERSION = '20.10.38';
      const INNERTUBE_API_URL = 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false';
      
      const res: any = await proxyFetchViaExtension(INNERTUBE_API_URL, false, 'POST', {
        'Content-Type': 'application/json',
        'User-Agent': `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`,
      }, JSON.stringify({
        context: {
          client: {
            clientName: 'ANDROID',
            clientVersion: INNERTUBE_CLIENT_VERSION,
          }
        },
        videoId: videoId
      }));
      
      let data;
      try {
        if (!res.body) {
          throw new Error("Empty body returned");
        }
        data = JSON.parse(res.body);
      } catch (e: any) {
        throw new Error(`API Parse Error: ${e.message}. Status: ${res.status}. Body: ${String(res.body).substring(0, 150)}`);
      }
      
      const parsedTracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      
      if (!parsedTracks || !Array.isArray(parsedTracks) || parsedTracks.length === 0) {
        throw new Error("No subtitles or captions found for this video.");
      }
      
      setTracks(parsedTracks);
      const defaultTrack = parsedTracks.find((t: any) => t.languageCode === 'en' && t.kind !== 'asr') || parsedTracks[0];
      setSelectedTrackUrl(defaultTrack.baseUrl);
      await fetchTranscript(defaultTrack.baseUrl);
      
    } catch (e: any) {
      setError(e.message || "Failed to extract subtitles. Make sure it is a valid YouTube URL.");
      setIsExtracting(false);
    }
  };

  const decodeEntities = (text: string) => {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
  };

  const fetchTranscript = async (trackUrl: string) => {
    setIsExtracting(true);
    try {
      const res: any = await proxyFetchViaExtension(trackUrl, false, 'GET', {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      });
      const xmlText = res.body;
      
      let lines: any[] = [];
      const srv3Regex = /<p\s+t="(\d+)"\s+d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
      let srv3Match;
      let hasSrv3 = false;
      
      while ((srv3Match = srv3Regex.exec(xmlText)) !== null) {
        hasSrv3 = true;
        const start = parseInt(srv3Match[1], 10) / 1000;
        const dur = parseInt(srv3Match[2], 10) / 1000;
        let inner = srv3Match[3];
        let text = inner.replace(/<[^>]+>/g, '');
        lines.push({ start, dur, text });
      }

      if (!hasSrv3) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const textNodes = xmlDoc.getElementsByTagName("text");
        
        lines = Array.from(textNodes).map(node => {
           const start = parseFloat(node.getAttribute("start") || "0");
           const dur = parseFloat(node.getAttribute("dur") || "0");
           const text = node.textContent;
           return { start, dur, text };
        });
      }
      
      const formatSrtTime = (seconds: number) => {
        const date = new Date(0);
        date.setSeconds(seconds);
        const ms = Math.floor((seconds % 1) * 1000);
        return date.toISOString().substring(11, 19) + "," + ms.toString().padStart(3, "0");
      };

      const srtText = lines.map((line, i) => {
        const startStr = formatSrtTime(line.start);
        const endStr = formatSrtTime(line.start + line.dur);
        const text = decodeEntities(line.text || "");
        return `${i + 1}\n${startStr} --> ${endStr}\n${text}`;
      }).join("\n\n");
      
      const txtText = lines.map(line => {
        const text = decodeEntities(line.text || "");
        return text;
      }).join(" ");
      
      setTranscriptSrt(srtText);
      setTranscriptTxt(txtText);
      
    } catch (e: any) {
      setError("Failed to fetch the selected transcript.");
    } finally {
      setIsExtracting(false);
    }
  };

  useEffect(() => {
    if (urlParam && extensionInstalled && !isExtracting && !tracks.length && !error) {
      extractTracks();
    }
  }, [urlParam, extensionInstalled]);

  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUrl = e.target.value;
    setSelectedTrackUrl(newUrl);
    fetchTranscript(newUrl);
  };

  const copyText = () => {
    const textToCopy = viewMode === 'srt' ? transcriptSrt : transcriptTxt;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadText = () => {
    const textToDownload = viewMode === 'srt' ? transcriptSrt : transcriptTxt;
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript.${viewMode}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      {/* Header Panel */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && extractTracks()}
                placeholder="Paste YouTube Video URL here..."
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ink dark:focus:ring-white transition-shadow"
              />
            </div>
            
            <button
              onClick={extractTracks}
              disabled={!url || isExtracting}
              className="px-6 py-3 bg-ink dark:bg-white text-white dark:text-ink font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isExtracting && !tracks.length ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-ink/30 border-t-white dark:border-t-ink rounded-full animate-spin" />
              ) : (
                "Extract Subtitles"
              )}
            </button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative min-h-[500px]">
        
        {/* Missing Extension Warning */}
        {!extensionInstalled && (
          <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700">
              <div className="mb-6 flex justify-center opacity-90">
                <img src="/chrome_extension_icon.webp" alt="Chrome Extension" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                Extension Required
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Please install the ZeroWebTools extension to securely fetch YouTube captions without server limits.
              </p>
              <a
                href="/extensions"
                className="inline-block px-6 py-3 bg-ink dark:bg-white text-surface dark:text-ink hover:opacity-80 font-medium rounded-lg transition-all"
              >
                Download Extension
              </a>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 m-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Content View */}
        {transcriptSrt && !error && (
          <div className="flex-1 overflow-auto bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col relative">
            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                 <select 
                   value={selectedTrackUrl} 
                   onChange={handleTrackChange}
                   className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ink"
                 >
                   {tracks.map((t, i) => (
                     <option key={i} value={t.baseUrl}>
                       {t.name.simpleText} {t.kind === 'asr' ? '(Auto-generated)' : ''}
                     </option>
                   ))}
                 </select>
                 
                 {isExtracting && <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />}
              </div>
            
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('srt')}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'srt' ? 'bg-white dark:bg-neutral-700 shadow-sm text-ink dark:text-white' : 'text-neutral-500 hover:text-ink dark:hover:text-white'}`}
                  >
                    .SRT Format
                  </button>
                  <button
                    onClick={() => setViewMode('txt')}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'txt' ? 'bg-white dark:bg-neutral-700 shadow-sm text-ink dark:text-white' : 'text-neutral-500 hover:text-ink dark:hover:text-white'}`}
                  >
                    Plain Text
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={copyText} className="text-sm font-bold text-accent hover:opacity-80 flex items-center gap-1 transition-all">
                    {copySuccess ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={downloadText} className="text-sm font-bold text-ink dark:text-white hover:opacity-80 flex items-center gap-1 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> Download
                  </button>
                </div>
              </div>
            </div>

            <textarea
               value={viewMode === 'srt' ? transcriptSrt : transcriptTxt}
               readOnly
               className="flex-1 w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 font-mono text-sm focus:outline-none resize-none min-h-[400px] leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
