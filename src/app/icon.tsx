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
          border: "1px solid rgba(34, 197, 94, 0.3)",
        }}
      >
        <svg
          viewBox="0 0 8 8"
          style={{
            width: "20px",
            height: "20px",
            display: "flex",
          }}
        >
          <g style={{ fill: "#22c55e" }}>
            {/* Horns */}
            <rect x="1" y="0" width="1" height="1" />
            <rect x="6" y="0" width="1" height="1" />
            {/* Row 1 */}
            <rect x="2" y="1" width="4" height="1" />
            {/* Row 2 */}
            <rect x="1" y="2" width="6" height="1" />
            {/* Row 3 (Eyes) */}
            <rect x="0" y="3" width="2" height="1" />
            <rect x="3" y="3" width="2" height="1" />
            <rect x="6" y="3" width="2" height="1" />
            {/* Row 4 */}
            <rect x="0" y="4" width="8" height="1" />
            {/* Row 5 */}
            <rect x="1" y="5" width="6" height="1" />
            {/* Row 6 */}
            <rect x="1" y="6" width="1" height="2" />
            <rect x="3" y="6" width="2" height="1" />
            <rect x="6" y="6" width="1" height="2" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
