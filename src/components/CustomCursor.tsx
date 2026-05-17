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
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-accent-primary"
        style={{
          width: isHovering ? 40 : 10,
          height: isHovering ? 40 : 10,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.12s ease, height 0.12s ease, opacity 0.12s ease",
        }}
      />
    </>
  );
}
