"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HOLD_MS = 2800;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RotatingWordsProps {
  words: string[];
  className?: string;
}

/**
 * Rota palabras con un rodillo vertical: la actual sube y sale, la siguiente
 * entra desde abajo, recortadas por una máscara.
 *
 * Las palabras invisibles apiladas en la misma celda de grid reservan el
 * ancho de la más larga: el contenedor jamás cambia de tamaño.
 */
export default function RotatingWords({ words, className }: RotatingWordsProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      HOLD_MS
    );
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className={className}>
      <span className="relative inline-grid">
        {words.map((word) => (
          <span
            key={word}
            aria-hidden="true"
            className="invisible whitespace-nowrap [grid-area:1/1]"
          >
            {word}
          </span>
        ))}
        <span className="relative overflow-hidden pb-[0.14em] [grid-area:1/1]">
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              key={index}
              initial={prefersReduced ? { opacity: 0 } : { y: "115%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { y: "-115%" }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="block whitespace-nowrap"
            >
              {words[index]}
            </m.span>
          </AnimatePresence>
        </span>
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
