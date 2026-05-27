import { ImageResponse } from "next/og";
import { CATEGORIES, getToolById, getCategoryForTool } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ZeroWebTools";

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    c.tools.filter((t) => t.status === "live").map((t) => ({ toolId: t.id }))
  );
}

export default async function OGImage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  const category = getCategoryForTool(toolId);

  const toolTitle = tool?.title || "Web Tool";
  const toolDesc = tool?.description || "";
  const categoryName = category?.title || "Utility";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #1a1a2e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            background: "rgba(99, 102, 241, 0.08)",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#6366f1",
            }}
          />
          <span
            style={{
              color: "#a5b4fc",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            {categoryName} • 100% Private
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {toolTitle}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: "800px",
            marginBottom: "40px",
          }}
        >
          {toolDesc}
        </div>

        {/* Bottom brand bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={`https://zerowebtools.com/favicon-192x192.png`}
              width={36}
              height={36}
              style={{
                borderRadius: "8px",
              }}
              alt="Logo"
            />
            <span
              style={{
                color: "#d4d4d8",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              ZeroWebTools
            </span>
          </div>
          <span
            style={{
              color: "#71717a",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            zerowebtools.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
