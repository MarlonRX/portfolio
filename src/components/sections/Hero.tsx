"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const taglineWord = (t.raw("taglineWords") as string[])[0];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 48]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 md:pt-40 pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 lg:flex-row lg:gap-16">
        {/* Columna de texto */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ opacity: textOpacity }}
          className="flex-1"
        >
          <p className="tech-label mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-5 bg-accent-primary" />
            {t("eyebrow")}
          </p>

          <h1 className="mb-6 text-4xl leading-[1.08] text-text-primary sm:text-5xl lg:text-[64px]">
            {t("taglinePrefix")}
            <span className="relative inline-block font-normal">
              {taglineWord}
              <span className="absolute inset-x-0 bottom-[0.08em] h-[2px] bg-accent-primary/85" />
            </span>
          </h1>

          <p className="mb-9 max-w-[46ch] text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("sub")}
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}/projects`}
              className="btn-primary group px-6 py-3 text-[15px]"
            >
              {t("ctaPrimary")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn-ghost px-6 py-3 text-[15px]"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </m.div>

        {/* Captura real del proyecto ancla, flotando con perspectiva */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          style={{ y: visualY }}
          className="w-full max-w-2xl flex-1 lg:pl-8"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl [transform:perspective(1400px)_rotateY(-4.5deg)_rotateX(1.5deg)] shadow-[var(--shadow-float)]">
            <ImageWithFallback
              src="/images/projects/nodovec-hero.webp"
              alt="NodoVec — dashboard de gestión financiera personal"
              fill
              fallbackLabel="NodoVec"
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>
          <p className="tech-label mt-4 text-right">
            NodoVec · Finanzas personales · Producción
          </p>
        </m.div>
      </div>
    </section>
  );
}
