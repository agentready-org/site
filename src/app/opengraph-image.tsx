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
          padding: "72px 80px",
          background: "#F9F7F2",
          color: "#1A1A1A",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1200px 600px at 85% -10%, rgba(26,26,26,0.04), transparent 60%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
            fontSize: 22,
            letterSpacing: 0.5,
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

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#1A1A1A",
              maxWidth: 980,
            }}
          >
            The open standard for agent readiness.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#5C5953",
              maxWidth: 900,
            }}
          >
            The specification of protocols, standards, and conventions a
            product should implement to be usable by AI agents.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
            fontSize: 18,
            color: "#5C5953",
            letterSpacing: 1,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span>Discoverability</span>
            <span>Content</span>
            <span>Capabilities</span>
            <span>Identity</span>
            <span>Commerce</span>
          </div>
          <div>MIT · open</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
