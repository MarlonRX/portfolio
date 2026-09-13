"use client";

import { m, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const AUTOPLAY_MS = 6000;

interface HeroCarouselProps {
  projects: Project[];
}

export default function HeroCarousel({ projects }: HeroCarouselProps) {
  const tp = useTranslations("projects");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = projects.filter((p) => p.image);
  const count = slides.length;

  useEffect(() => {
    if (prefersReduced || paused || count <= 1) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % count),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [prefersReduced, paused, count]);

  if (count === 0) return null;

  const current = slides[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl [transform:perspective(1400px)_rotateY(-4.5deg)_rotateX(1.5deg)] shadow-[var(--shadow-float)]">
        <AnimatePresence initial={false}>
          <m.div
            key={current.slug}
            className="absolute inset-0"
            initial={
              prefersReduced ? false : { opacity: 0, scale: 1.03, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: -8 }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.7,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Link
              href={`/${locale}/projects/${current.slug}`}
              aria-label={current.title}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={current.image as string}
                alt={current.title}
                fill
                fallbackLabel={current.title}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={active === 0}
              />
            </Link>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Link
          href={`/${locale}/projects/${current.slug}`}
          className="tech-label transition-colors hover:text-text-primary"
        >
          {current.title} · {tp(`status.${current.status}`)}
        </Link>
        <div className="flex items-center gap-2">
          {slides.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              aria-label={project.title}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-accent-primary"
                  : "w-2.5 bg-text-muted/50 hover:bg-text-muted/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
