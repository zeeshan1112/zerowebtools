export type TelemetryEventType = "load" | "start" | "success" | "error";

export interface TelemetryDetails {
  fileSizeBytes?: number;
  processingTimeMs?: number;
  errorMessage?: string;
}

export function trackToolEvent(toolId: string, eventType: TelemetryEventType, details?: TelemetryDetails) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[TELEMETRY] [${toolId}] [${eventType}]`, details || "");
  }

  // Google Analytics Event
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", `tool_${eventType}`, {
      tool_id: toolId,
      file_size_bytes: details?.fileSizeBytes,
      processing_time_ms: details?.processingTimeMs,
      error_message: details?.errorMessage,
    });
  }
}
