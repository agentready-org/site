import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AgentReady — The open standard for agent readiness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: "#F9F7F2",
          color: "#1A1A1A",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
            fontSize: 22,
            color: "#1A1A1A",
          }}
        >
          <div
            style={{
              width: 52,
              height: 40,
              borderRadius: 8,
              background: "#1A1A1A",
              color: "#F9F7F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 22,
              fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
              letterSpacing: -0.5,
            }}
          >
            ar
          </div>
          <div style={{ fontWeight: 700 }}>agentready.org</div>
        </div>

        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: "#1A1A1A",
            maxWidth: 1000,
          }}
        >
          The open standard for agent readiness
        </div>

        <div
          style={{
            fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
            fontSize: 18,
            color: "#5C5953",
            letterSpacing: 1,
          }}
        >
          MIT · open
        </div>
      </div>
    ),
    { ...size }
  );
}
