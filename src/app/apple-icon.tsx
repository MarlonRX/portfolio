import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #13131a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          border: "1px solid rgba(212, 175, 55, 0.25)",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#d4af37",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          MRX
        </span>
      </div>
    ),
    { ...size }
  );
}
