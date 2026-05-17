import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          border: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: 18,
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
