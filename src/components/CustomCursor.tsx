"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      // Position the corner (0,0) of the SVG directly at the cursor coords for pixel-perfect alignment.
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.closest("[data-cursor-hover]")
        )
      );
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isHovering ? 28 : 20,
          height: isHovering ? 28 : 20,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.1s steps(2), height 0.1s steps(2), opacity 0.12s ease",
        }}
      >
        {isHovering ? (
          /* Retro 8-bit pointing hand SVG (classic Windows hand pointer) */
          <svg
            viewBox="0 0 16 16"
            width="100%"
            height="100%"
            style={{
              imageRendering: "pixelated",
              transform: "translateX(-31.25%)", // Shift left by 5/16ths so index finger tip (x=5) aligns to click coordinate
            }}
          >
            {/* Black outer outline */}
            <path
              d="M5,0 L8,0 L8,4 L11,4 L11,5 L12,5 L12,8 L11,8 L11,9 L10,9 L10,10 L9,10 L9,12 L4,12 L4,10 L3,10 L3,7 L2,7 L2,5 L3,5 L3,3 L5,3 Z"
              fill="#000000"
            />
            {/* White hand body */}
            <path
              d="M6,1 L7,1 L7,4 L10,4 L10,5 L11,5 L11,8 L10,8 L10,9 L9,9 L9,10 L8,10 L8,11 L5,11 L5,10 L4,10 L4,7 L3,7 L3,5 L4,5 L4,3 Z"
              fill="#ffffff"
            />
            {/* Accent blue cuff */}
            <path
              d="M5,10 L8,10 L8,11 L5,11 Z"
              fill="#4f8cff"
            />
          </svg>
        ) : (
          /* Retro 8-bit arrow cursor SVG (classic Windows arrow pointer) */
          <svg
            viewBox="0 0 16 16"
            width="100%"
            height="100%"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Black outer outline */}
            <path
              d="M0,0 L0,12 L3,9 L6,14 L8,13 L5,8 L9,8 Z"
              fill="#000000"
            />
            {/* Main accent body (Primary gold) */}
            <path
              d="M1,1 L1,9 L3,7 L5.5,12 L6.5,11.5 L4,7 L7.5,7 Z"
              fill="#d4af37"
            />
          </svg>
        )}
      </div>
    </>
  );
}
