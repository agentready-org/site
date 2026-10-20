import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0F0E",
        }}
      >
        <svg viewBox="0 0 32 32" width="140" height="140">
          <path
            d="M6 15.5 L10.5 20 L18.5 10.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.6"
            strokeLinecap="square"
          />
          <rect x="21" y="20" width="7" height="3" fill="#FFFFFF" fillOpacity="0.5" />
        </svg>
      </div>
    ),
    size
  );
}
