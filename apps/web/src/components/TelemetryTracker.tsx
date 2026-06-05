"use client";

import { useEffect } from "react";
import { trackToolEvent } from "@/lib/telemetry";

interface TelemetryTrackerProps {
  toolId: string;
}

export default function TelemetryTracker({ toolId }: TelemetryTrackerProps) {
  useEffect(() => {
    trackToolEvent(toolId, "load");
  }, [toolId]);

  return null;
}
