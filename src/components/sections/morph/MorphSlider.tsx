"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent
} from "react";
import { MorphEngine, type MorphItem, type MorphOptions } from "./MorphEngine";
import "./MorphSlider.css";

export type MorphTransition = "melt" | "ripple" | "shear" | "swirl";

export interface MorphSliderProps extends Omit<ComponentProps<"div">, "onDoubleClick"> {
  items: MorphItem[];
  startIndex?: number;
  transition?: MorphTransition;
  duration?: number;
  ease?: string;
  intensity?: number;
  scale?: number;
  aberration?: number;
  drift?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  radius?: number;
  overlayColor?: string;
  showCaptions?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onIndexChange?: (index: number) => void;
  labels?: { prev?: string; next?: string; slides?: string; stage?: string; goTo?: string };
}

export default function MorphSlider({
  items,
  startIndex = 0,
  transition = "melt",
  duration = 1.1,
  ease = "power2.inOut",
  intensity = 0.55,
  scale = 2.4,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  autoplayDelay = 4,
  loop = true,
  radius = 16,
  overlayColor = "#000000",
  showCaptions = true,
  showControls = true,
  showIndicators = true,
  onIndexChange,
  labels,
  className = "",
  ...props
}: MorphSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<MorphEngine | null>(null);
  const [index, setIndex] = useState(startIndex);
  const [hovering, setHovering] = useState(false);

  const optsRef = useRef<MorphOptions>({
    transition,
    duration,
    ease,
    intensity,
    scale,
    aberration,
    drift,
    overlayColor,
    loop
  });

  const onIndexChangeRef = useRef(onIndexChange);

  useEffect(() => {
    optsRef.current = {
      transition,
      duration,
      ease,
      intensity,
      scale,
      aberration,
      drift,
      overlayColor,
      loop
    };
  }, [transition, duration, ease, intensity, scale, aberration, drift, overlayColor, loop]);

  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  });

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const engine = new MorphEngine(containerRef.current, {
      items,
      startIndex,
      reducedMotion,
      dprCap: 2,
      getOptions: () => optsRef.current,
      onIndexChange: i => {
        setIndex(i);
        onIndexChangeRef.current?.(i);
      }
    });
    engineRef.current = engine;
    setIndex(startIndex);

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [items, startIndex]);

  const handleNext = useCallback(() => engineRef.current?.next(), []);
  const handlePrev = useCallback(() => engineRef.current?.prev(), []);

  useEffect(() => {
    if (!autoplay || hovering) return undefined;
    const id = setTimeout(() => engineRef.current?.next(), Math.max(autoplayDelay, 1) * 1000);
    return () => clearTimeout(id);
  }, [autoplay, autoplayDelay, hovering, index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    let startX = 0;
    let width = 1;
    let active = false;

    const onDown = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      width = rect.width || 1;
      startX = e.clientX;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      engineRef.current?.setPointer(px, 1 - py);
      active = engineRef.current?.beginDrag() ?? false;
      if (active && el.setPointerCapture) {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* el puntero ya no es válido */
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const ndx = (e.clientX - startX) / width;
      engineRef.current?.drag(ndx);
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      engineRef.current?.endDrag();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  const hasCaptions = items.some(item => item.caption);

  return (
    <div
      className={`morph-slider ${className}`.trim()}
      style={{
        borderRadius: `${radius}px`,
        "--ms-swap": `${(duration * 0.66).toFixed(3)}s`,
        "--ms-dot": `${(duration * 0.45).toFixed(3)}s`
      } as CSSProperties}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        ref={containerRef}
        className="morph-slider-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={labels?.stage ?? "Image morph slider"}
        tabIndex={0}
        onKeyDown={onKeyDown}
      />

      {showCaptions && hasCaptions && (
        <div className="morph-slider-caption" aria-live="polite">
          {items.map((item, i) =>
            item.caption ? (
              <span
                key={i}
                aria-hidden={i === index ? undefined : true}
                className={`morph-slider-caption-text ${i === index ? "is-active" : ""}`}
              >
                {item.caption}
              </span>
            ) : null
          )}
        </div>
      )}

      {showControls && (
        <div className="morph-slider-controls">
          <button type="button" className="morph-slider-btn" aria-label={labels?.prev ?? "Previous slide"} onClick={handlePrev}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" className="morph-slider-btn" aria-label={labels?.next ?? "Next slide"} onClick={handleNext}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {showIndicators && (
        <div className="morph-slider-indicators" role="tablist" aria-label={labels?.slides ?? "Slides"}>
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${labels?.goTo ?? "Go to slide"} ${i + 1}`}
              className={`morph-slider-dot ${i === index ? "is-active" : ""}`}
              onClick={() => {
                const engine = engineRef.current;
                if (!engine || i === index) return;
                engine.goTo(i > index ? 1 : -1);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
