import { ImageResponse } from "next/og";

export const alt = "Marlon Ramirez — Full Stack Developer";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-180px",
            width: "550px",
            height: "550px",
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(79, 140, 255, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            inset: "36px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
          }}
        />

        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#4f8cff",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>

          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#f0f0f5",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Marlon Ramirez
          </h1>

          <div
            style={{
              width: "70px",
              height: "2px",
              background: "#d4af37",
              margin: "6px 0",
            }}
          />

          <p
            style={{
              fontSize: 24,
              color: "#a0a0b0",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Full Stack Developer
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #4f8cff, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
