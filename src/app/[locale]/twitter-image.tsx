import { ImageResponse } from "next/og";

export const alt = "Marlon Ramirez — Full Stack Developer";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

// Identidad F: idéntica al OG, ratio twitter
export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "0 96px",
        }}
      >
        {/* Hairline frame teñido de azul */}
        <div
          style={{
            position: "absolute",
            inset: "40px",
            border: "1px solid rgba(50, 50, 93, 0.09)",
            borderRadius: "20px",
          }}
        />

        {/* Eyebrow técnico */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <div style={{ width: "36px", height: "2px", background: "#d4af37", display: "flex" }} />
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#6b7a88",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Full-stack software engineering
          </span>
        </div>

        <h1
          style={{
            fontSize: 88,
            fontWeight: 300,
            color: "#061b31",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Marlon Ramirez<span style={{ color: "#d4af37" }}>.</span>
        </h1>

        <p
          style={{
            fontSize: 30,
            fontWeight: 300,
            color: "#3d4d5c",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            letterSpacing: "-0.01em",
            marginTop: "26px",
          }}
        >
          Diseño y construyo software de alto rendimiento.
        </p>
      </div>
    ),
    { ...size }
  );
}
