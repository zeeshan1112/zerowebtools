import { pipeline, env } from "@xenova/transformers";

// Disable checking for local model files to avoid 404 logs
env.allowLocalModels = false;

let pipelineInstance: any = null;
let currentModel: string = "";

async function getPipeline(modelName: string, progressCallback: any) {
  if (!pipelineInstance || currentModel !== modelName) {
    // Clear previous instance to free memory
    pipelineInstance = null;
    currentModel = modelName;
    pipelineInstance = await pipeline("automatic-speech-recognition", modelName, {
      progress_callback: progressCallback,
    });
  }
  return pipelineInstance;
}

self.addEventListener("message", async (event: MessageEvent) => {
  const { audio, modelName, language } = event.data;

  try {
    const progressCallback = (data: any) => {
      if (data.status === "progress") {
        self.postMessage({
          status: "download_progress",
          progress: data.progress,
          file: data.file,
        });
      } else if (data.status === "ready") {
        self.postMessage({
          status: "download_ready",
          file: data.file,
        });
      }
    };

    self.postMessage({ status: "loading" });
    const transcriber = await getPipeline(modelName, progressCallback);

    self.postMessage({ status: "transcribing" });

    // Run Whisper pipeline
    const options: any = {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: true,
    };

    if (language && language !== "auto") {
      options.language = language;
    }

    const result = await transcriber(audio, options);

    self.postMessage({
      status: "done",
      result: result,
    });
  } catch (error: any) {
    self.postMessage({
      status: "error",
      error: error.message || String(error),
    });
  }
});
