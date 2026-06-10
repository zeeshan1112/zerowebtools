"use client";

import React from "react";
import dynamic from "next/dynamic";

const WorkspaceLoader = () => (
  <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
    <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" />
    <p className="text-xs text-ink-muted font-bold uppercase tracking-wider animate-pulse">
      Loading Workspace...
    </p>
  </div>
);

// Dynamic imports
const JsonViewerWorkspace = dynamic(() => import("@/components/JsonViewerWorkspace"), { loading: WorkspaceLoader });
const HeicConverterWorkspace = dynamic(() => import("@/components/HeicConverterWorkspace"), { loading: WorkspaceLoader });
const MergePDFWorkspace = dynamic(() => import("@/components/MergePDFWorkspace"), { loading: WorkspaceLoader });
const SplitPDFWorkspace = dynamic(() => import("@/components/SplitPDFWorkspace"), { loading: WorkspaceLoader });
const CompressPDFWorkspace = dynamic(() => import("@/components/CompressPDFWorkspace"), { loading: WorkspaceLoader });
const RotatePDFWorkspace = dynamic(() => import("@/components/RotatePDFWorkspace"), { loading: WorkspaceLoader });

const ProtectPDFWorkspace = dynamic(() => import("@/components/PDFEditorsWorkspace").then(mod => mod.ProtectPDFWorkspace), { loading: WorkspaceLoader });
const UnlockPDFWorkspace = dynamic(() => import("@/components/PDFEditorsWorkspace").then(mod => mod.UnlockPDFWorkspace), { loading: WorkspaceLoader });
const WatermarkPDFWorkspace = dynamic(() => import("@/components/PDFEditorsWorkspace").then(mod => mod.WatermarkPDFWorkspace), { loading: WorkspaceLoader });
const PageNumbersPDFWorkspace = dynamic(() => import("@/components/PDFEditorsWorkspace").then(mod => mod.PageNumbersPDFWorkspace), { loading: WorkspaceLoader });
const OrganizePDFWorkspace = dynamic(() => import("@/components/PDFEditorsWorkspace").then(mod => mod.OrganizePDFWorkspace), { loading: WorkspaceLoader });

const JpgToPdfWorkspace = dynamic(() => import("@/components/ConvertPDFWorkspace").then(mod => mod.JpgToPdfWorkspace), { loading: WorkspaceLoader });
const PdfToJpgWorkspace = dynamic(() => import("@/components/ConvertPDFWorkspace").then(mod => mod.PdfToJpgWorkspace), { loading: WorkspaceLoader });

const SaasMrrWorkspace = dynamic(() => import("@/components/SaasMrrWorkspace"), { loading: WorkspaceLoader });
const StartupEquityWorkspace = dynamic(() => import("@/components/StartupEquityWorkspace"), { loading: WorkspaceLoader });
const CaseConverterWorkspace = dynamic(() => import("@/components/CaseConverterWorkspace"), { loading: WorkspaceLoader });
const Base64Workspace = dynamic(() => import("@/components/Base64Workspace"), { loading: WorkspaceLoader });
const TextCounterWorkspace = dynamic(() => import("@/components/TextCounterWorkspace"), { loading: WorkspaceLoader });
const TokenCounterWorkspace = dynamic(() => import("@/components/TokenCounterWorkspace"), { loading: WorkspaceLoader });
const DiffCheckerWorkspace = dynamic(() => import("@/components/DiffCheckerWorkspace"), { loading: WorkspaceLoader });
const JwtDebuggerWorkspace = dynamic(() => import("@/components/JwtDebuggerWorkspace"), { loading: WorkspaceLoader });
const UrlEncoderWorkspace = dynamic(() => import("@/components/UrlEncoderWorkspace"), { loading: WorkspaceLoader });
const TextCleanerWorkspace = dynamic(() => import("@/components/TextCleanerWorkspace"), { loading: WorkspaceLoader });
const PdfSignWorkspace = dynamic(() => import("@/components/PdfSignWorkspace"), { loading: WorkspaceLoader });
const PdfCropWorkspace = dynamic(() => import("@/components/PdfCropWorkspace"), { loading: WorkspaceLoader });
const PdfToTextWorkspace = dynamic(() => import("@/components/PdfToTextWorkspace"), { loading: WorkspaceLoader });
const BulkImageResizerWorkspace = dynamic(() => import("@/components/BulkImageResizerWorkspace"), { loading: WorkspaceLoader });
const ImageCropperWorkspace = dynamic(() => import("@/components/ImageCropperWorkspace"), { loading: WorkspaceLoader });
const SvgMinifierWorkspace = dynamic(() => import("@/components/SvgMinifierWorkspace"), { loading: WorkspaceLoader });
const MortgageCalculatorWorkspace = dynamic(() => import("@/components/MortgageCalculatorWorkspace"), { loading: WorkspaceLoader });
const CapTableWorkspace = dynamic(() => import("@/components/CapTableWorkspace"), { loading: WorkspaceLoader });
const SaasLtvWorkspace = dynamic(() => import("@/components/SaasLtvWorkspace"), { loading: WorkspaceLoader });
const BreakEvenWorkspace = dynamic(() => import("@/components/BreakEvenWorkspace"), { loading: WorkspaceLoader });
const RegexTesterWorkspace = dynamic(() => import("@/components/RegexTesterWorkspace"), { loading: WorkspaceLoader });
const SqlFormatterWorkspace = dynamic(() => import("@/components/SqlFormatterWorkspace"), { loading: WorkspaceLoader });
const FileHasherWorkspace = dynamic(() => import("@/components/FileHasherWorkspace"), { loading: WorkspaceLoader });
const PasswordGeneratorWorkspace = dynamic(() => import("@/components/PasswordGeneratorWorkspace"), { loading: WorkspaceLoader });
const VoiceDictatorWorkspace = dynamic(() => import("@/components/VoiceDictatorWorkspace"), { loading: WorkspaceLoader });
const MarkdownConverterWorkspace = dynamic(() => import("@/components/MarkdownConverterWorkspace"), { loading: WorkspaceLoader });
const RandomPickerWorkspace = dynamic(() => import("@/components/RandomPickerWorkspace"), { loading: WorkspaceLoader });
const QrCodeWorkspace = dynamic(() => import("@/components/QrCodeWorkspace"), { loading: WorkspaceLoader });
const BoxShadowWorkspace = dynamic(() => import("@/components/BoxShadowWorkspace"), { loading: WorkspaceLoader });
const UnixTimestampWorkspace = dynamic(() => import("@/components/UnixTimestampWorkspace"), { loading: WorkspaceLoader });
const CronGeneratorWorkspace = dynamic(() => import("@/components/CronGeneratorWorkspace"), { loading: WorkspaceLoader });
const DiceRollerWorkspace = dynamic(() => import("@/components/DiceRollerWorkspace"), { loading: WorkspaceLoader });
const RandomTeamGeneratorWorkspace = dynamic(() => import("@/components/RandomTeamGeneratorWorkspace"), { loading: WorkspaceLoader });
const CoinFlipperWorkspace = dynamic(() => import("@/components/CoinFlipperWorkspace"), { loading: WorkspaceLoader });
const SpinTheWheelWorkspace = dynamic(() => import("@/components/SpinTheWheelWorkspace"), { loading: WorkspaceLoader });
const TwoZeroFourEightWorkspace = dynamic(() => import("@/components/TwoZeroFourEightWorkspace"), { loading: WorkspaceLoader });
const HtmlToJsxWorkspace = dynamic(() => import("@/components/HtmlToJsxWorkspace"), { loading: WorkspaceLoader });
const AudioTranscriberWorkspace = dynamic(() => import("@/components/AudioTranscriberWorkspace"), { loading: WorkspaceLoader });
const WebScraperWorkspace = dynamic(() => import("@/components/WebScraperWorkspace"), { loading: WorkspaceLoader });
const YoutubeTranscriptWorkspace = dynamic(() => import("@/components/YoutubeTranscriptWorkspace"), { loading: WorkspaceLoader });

const WORKSPACE_MAP: Record<string, React.ComponentType> = {
  "json-formatter": JsonViewerWorkspace,
  "case-converter": CaseConverterWorkspace,
  "heic-to-jpg": HeicConverterWorkspace,
  "pdf-merge": MergePDFWorkspace,
  "pdf-split": SplitPDFWorkspace,
  "pdf-compress": CompressPDFWorkspace,
  "pdf-rotate": RotatePDFWorkspace,
  "pdf-to-jpg": PdfToJpgWorkspace,
  "jpg-to-pdf": JpgToPdfWorkspace,
  "pdf-protect": ProtectPDFWorkspace,
  "pdf-watermark": WatermarkPDFWorkspace,
  "pdf-page-numbers": PageNumbersPDFWorkspace,
  "pdf-organize": OrganizePDFWorkspace,
  "pdf-unlock": UnlockPDFWorkspace,
  "saas-mrr": SaasMrrWorkspace,
  "startup-equity": StartupEquityWorkspace,
  "base64-encoder": Base64Workspace,
  "word-counter": TextCounterWorkspace,
  "diff-checker": DiffCheckerWorkspace,
  "jwt-debugger": JwtDebuggerWorkspace,
  "url-encoder": UrlEncoderWorkspace,
  "text-cleaner": TextCleanerWorkspace,
  "pdf-sign": PdfSignWorkspace,
  "pdf-crop": PdfCropWorkspace,
  "pdf-to-text": PdfToTextWorkspace,
  "bulk-image-resizer": BulkImageResizerWorkspace,
  "image-cropper": ImageCropperWorkspace,
  "svg-minifier": SvgMinifierWorkspace,
  "mortgage-calculator": MortgageCalculatorWorkspace,
  "cap-table": CapTableWorkspace,
  "saas-ltv": SaasLtvWorkspace,
  "break-even": BreakEvenWorkspace,
  "regex-tester": RegexTesterWorkspace,
  "sql-formatter": SqlFormatterWorkspace,
  "file-hasher": FileHasherWorkspace,
  "password-generator": PasswordGeneratorWorkspace,
  "voice-dictator": VoiceDictatorWorkspace,
  "markdown-converter": MarkdownConverterWorkspace,
  "random-picker": RandomPickerWorkspace,
  "qr-code-generator": QrCodeWorkspace,
  "css-box-shadow": BoxShadowWorkspace,
  "unix-timestamp-converter": UnixTimestampWorkspace,
  "cron-generator": CronGeneratorWorkspace,
  "dice-roller": DiceRollerWorkspace,
  "random-team-generator": RandomTeamGeneratorWorkspace,
  "coin-flipper": CoinFlipperWorkspace,
  "spin-the-wheel": SpinTheWheelWorkspace,
  "2048-game": TwoZeroFourEightWorkspace,
  "token-counter": TokenCounterWorkspace,
  "html-to-jsx": HtmlToJsxWorkspace,
  "audio-transcriber": AudioTranscriberWorkspace,
  "web-scraper": WebScraperWorkspace,
  "youtube-transcript": YoutubeTranscriptWorkspace,
};

export default function WorkspaceRenderer({ toolId }: { toolId: string }) {
  const Component = WORKSPACE_MAP[toolId];
  return Component ? <Component /> : null;
}
