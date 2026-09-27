"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MorphSlider from "@/components/sections/morph/MorphSlider";
import RotatingWords from "@/components/animations/RotatingWords";
import CRTWarp from "@/components/animations/CRTWarp";
import { getHeroProjects } from "@/data/projects";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const HERO_PROJECTS = getHeroProjects();

export default function Hero() {
  const t = useTranslations("home.hero");
  const tv = useTranslations("home.projects");
  const tp = useTranslations("projects");
  const tc = useTranslations("common");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const words = t.raw("taglineWords") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Referencia estable: MorphSlider recrea el motor WebGL si items cambia de identidad.
  // El locale cambia montando de nuevo el layout, así que [] es correcto aquí.
  const slides = useMemo(
    () =>
      HERO_PROJECTS.map((p) => ({
        image: p.image as string,
        caption: `${p.title} · ${tp(`status.${p.status}`)}`,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReduced ? 0 : 64],
  );

  const enter = (delay: number) => ({
    initial: prefersReduced ? (false as const) : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      {/* Fondo CRT interactivo: plasma con curvatura y scanlines que reacciona al puntero */}
      <div aria-hidden="true" className="absolute inset-0 opacity-50">
        <CRTWarp
          paused={prefersReduced}
          color="#C9F24B" // color del plasma
          backgroundColor="#0a0b0c" // fondo entre las ondas
          speed={0.1} // velocidad de animación (0.2 lento, 1 rápido)
          curvature={0.01} // curvatura del "monitor CRT"
          scanlineStrength={0.25} // intensidad de líneas de TV vieja
          scanlineFrequency={0.5} // cuántas líneas
          waveAmplitude={0.3} // qué tanto se agita el plasma
          waveFrequency={5} // escala de las ondas (más grande = bloques más pequeños)
          bloom={1.5} // resplandor
          brightness={0.4} // brillo general
          mouseStrength={0.5} // cuánto reacciona al puntero
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-14 lg:flex-row lg:items-center lg:gap-16">
        {/* Columna de texto */}
        <m.div style={{ opacity: textOpacity }} className="flex-1">
          <m.p
            {...enter(0.1)}
            className="tech-label mb-7 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
            </span>
            {t("eyebrow")}
          </m.p>

          <h1 className="mb-7 text-[clamp(2.6rem,6.5vw,4.75rem)] text-text-primary">
            <span className="line-mask">
              <span style={{ animationDelay: "0.15s" }}>
                {t("taglinePrefix")}
              </span>
            </span>
            <span className="line-mask">
              <span
                className="text-accent-primary"
                style={{ animationDelay: "0.3s" }}
              >
                <RotatingWords words={words} />
              </span>
            </span>
          </h1>

          <m.p
            {...enter(0.55)}
            className="mb-10 max-w-[46ch] text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {t("sub")}
          </m.p>

          <m.div
            {...enter(0.7)}
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={`/${locale}/projects`}
              className="btn-primary group px-7 py-3.5 text-[15px]"
            >
              {t("ctaPrimary")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn-ghost px-7 py-3.5 text-[15px]"
            >
              {t("ctaSecondary")}
            </Link>
          </m.div>
        </m.div>

        {/* Carrusel morph: transiciones WebGL entre proyectos ancla */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
          style={{ y: visualY }}
          className="w-full max-w-4xl flex-1 lg:max-w-none lg:flex-[1.1] xl:flex-[1.2]"
        >
          {/* Cabecera del módulo: etiqueta + contador */}
          <div className="mb-4 flex items-center justify-between">
            <p className="tech-label">{tv("title")}</p>
            <span className="font-mono text-[11px] tracking-[1.4px] text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(HERO_PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
            <MorphSlider
              items={slides}
              autoplay
              autoplayDelay={6}
              transition="melt"
              radius={0}
              showCaptions={false}
              onIndexChange={setActiveIndex}
              labels={{
                prev: tc("prevSlide"),
                next: tc("nextSlide"),
                slides: tc("slides"),
                stage: tv("title"),
                goTo: tc("goToSlide")
              }}
            />
          </div>

          {/* Barra de info: caption + CTA, alineada con el módulo */}
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-border-subtle pt-4">
            <p className="truncate text-sm text-text-secondary">
              {HERO_PROJECTS[activeIndex]?.title} ·{" "}
              {tp(`status.${HERO_PROJECTS[activeIndex]?.status}`)}
            </p>
            <Link
              href={`/${locale}/projects/${HERO_PROJECTS[activeIndex]?.slug ?? HERO_PROJECTS[0]?.slug}`}
              className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-accent-secondary transition-colors hover:text-accent-secondary-hover"
            >
              {tv("viewProject")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
}
