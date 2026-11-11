import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PARTNERS } from "@/components/partners";

export const alt = "AgentReady — The open standard for agent readiness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_HEIGHT = 32;
const ROW_LENGTH = 6;
const LOGO_ROWS = [
  PARTNERS.slice(0, ROW_LENGTH),
  PARTNERS.slice(ROW_LENGTH),
];
const LOGO_GAP = 56;

export default async function OpengraphImage() {
  const fontDir = join(process.cwd(), "src/app/fonts");
  const [newsreader, plexMonoRegular, plexMonoBold] = await Promise.all([
    readFile(join(fontDir, "Newsreader-Regular.woff")),
    readFile(join(fontDir, "IBMPlexMono-Regular.ttf")),
    readFile(join(fontDir, "IBMPlexMono-Bold.ttf")),
  ]);

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
          background: "#0F0F0E",
          color: "#F2EEE3",
          fontFamily: "Newsreader",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 0.85,
            color: "#F2EEE3",
          }}
        >
          agentready
          <span style={{ fontWeight: 400, color: "rgba(180, 173, 160, 0.55)" }}>
            .org
          </span>
        </div>

        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: "#F2EEE3",
            maxWidth: 1000,
          }}
        >
          The open standard for agent readiness
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 18,
              color: "#8C8679",
              letterSpacing: 3,
            }}
          >
            in collaboration with
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 28, color: "#F2EEE3" }}
          >
            {LOGO_ROWS.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: LOGO_GAP }}>
                {row.map(({ name, Logo, scale }) => (
                  <div
                    key={name}
                    style={{ display: "flex", alignItems: "center", height: LOGO_HEIGHT }}
                  >
                    <Logo height={LOGO_HEIGHT * scale} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: plexMonoRegular, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: plexMonoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
