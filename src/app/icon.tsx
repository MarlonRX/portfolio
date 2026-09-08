import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Identidad F: monograma MR navy sobre blanco, punto dorado
export default function Icon() {
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
          borderRadius: "7px",
          border: "1px solid rgba(50, 50, 93, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "#061b31",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
            fontFamily: "sans-serif",
          }}
        >
          MR<span style={{ color: "#d4af37", fontSize: "17px" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
