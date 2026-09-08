import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

// Identidad F: monograma MR navy sobre blanco, punto dorado
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          border: "1px solid rgba(50, 50, 93, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "#061b31",
            fontSize: "74px",
            fontWeight: 600,
            letterSpacing: "-3px",
            fontFamily: "sans-serif",
          }}
        >
          MR<span style={{ color: "#d4af37", fontSize: "84px" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
