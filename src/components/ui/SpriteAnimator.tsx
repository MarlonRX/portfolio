"use client";

import React, { useId } from "react";

interface SpriteAnimatorProps {
  src?: string;
  frameCount?: number;
  frameWidth?: number;
  frameHeight?: number;
  fps?: number;
  className?: string;
}

export default function SpriteAnimator({
  src,
  frameCount = 4,
  frameWidth = 64,
  frameHeight = 64,
  fps = 8,
  className = "",
}: SpriteAnimatorProps) {
  const uniqueId = useId().replace(/:/g, ""); // Clean ID for CSS keyframes
  const duration = `${frameCount / fps}s`;
  const [hasError, setHasError] = React.useState(false);

  // Apply a global 1.5x scale multiplier to all sprites
  const scaledWidth = Math.round(frameWidth * 1.5);
  const scaledHeight = Math.round(frameHeight * 1.5);

  // If no custom src is provided or image failed to load, render the default interactive 8-bit space invader SVG walk cycle
  if (!src || hasError) {
    const halfDuration = 1 / (fps / 2);
    return (
      <div
        className={`inline-block select-none ${className}`}
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <svg
          viewBox="0 0 16 16"
          width="100%"
          height="100%"
          className="text-accent-primary fill-current"
          style={{ imageRendering: "pixelated" }}
        >
          <style>{`
            .invader-frame-1-${uniqueId} {
              animation: toggle-f1-${uniqueId} ${halfDuration}s steps(1, end) infinite;
            }
            .invader-frame-2-${uniqueId} {
              animation: toggle-f2-${uniqueId} ${halfDuration}s steps(1, end) infinite;
            }
            @keyframes toggle-f1-${uniqueId} {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            @keyframes toggle-f2-${uniqueId} {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
          `}</style>
          {/* Frame 1 */}
          <g className={`invader-frame-1-${uniqueId}`}>
            {/* Row 2 */}
            <rect x="5" y="1" width="6" height="1" />
            {/* Row 3 */}
            <rect x="4" y="2" width="8" height="1" />
            {/* Row 4 (Eyes) */}
            <rect x="3" y="3" width="2" height="1" />
            <rect x="7" y="3" width="2" height="1" />
            <rect x="11" y="3" width="2" height="1" />
            {/* Row 5 */}
            <rect x="3" y="4" width="10" height="1" />
            {/* Row 6 */}
            <rect x="5" y="5" width="6" height="1" />
            {/* Row 7 (Legs) */}
            <rect x="4" y="6" width="1" height="2" />
            <rect x="11" y="6" width="1" height="2" />
            <rect x="2" y="5" width="1" height="2" />
            <rect x="13" y="5" width="1" height="2" />
          </g>
          {/* Frame 2 */}
          <g className={`invader-frame-2-${uniqueId}`}>
            {/* Row 2 */}
            <rect x="5" y="1" width="6" height="1" />
            {/* Row 3 */}
            <rect x="4" y="2" width="8" height="1" />
            {/* Row 4 (Eyes) */}
            <rect x="3" y="3" width="2" height="1" />
            <rect x="7" y="3" width="2" height="1" />
            <rect x="11" y="3" width="2" height="1" />
            {/* Row 5 */}
            <rect x="3" y="4" width="10" height="1" />
            {/* Row 6 */}
            <rect x="4" y="5" width="8" height="1" />
            {/* Row 7 (Legs alternative) */}
            <rect x="5" y="6" width="2" height="2" />
            <rect x="9" y="6" width="2" height="2" />
            <rect x="3" y="5" width="1" height="1" />
            <rect x="12" y="5" width="1" height="1" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`inline-block overflow-hidden ${className}`}
      style={{
        width: scaledWidth,
        height: scaledHeight,
      }}
    >
      <style>{`
        @keyframes play-sprite-${uniqueId} {
          from { background-position: 0px 0px; }
          to { background-position: -${scaledWidth * frameCount}px 0px; }
        }
        .sprite-element-${uniqueId} {
          width: 100%;
          height: 100%;
          background-image: url(${src});
          background-repeat: no-repeat;
          background-size: ${scaledWidth * frameCount}px ${scaledHeight}px;
          image-rendering: pixelated;
          animation: play-sprite-${uniqueId} ${duration} steps(${frameCount}) infinite;
        }
      `}</style>
      <div className={`sprite-element-${uniqueId}`} />
      {/* Hidden image to trigger loading error if the file does not exist */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        className="hidden"
        onError={() => setHasError(true)}
        alt=""
      />
    </div>
  );
}
