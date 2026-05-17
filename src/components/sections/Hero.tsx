"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConstellationBackground from "./ConstellationBackground";
import TextReveal from "@/components/animations/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const arrowY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 40]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Constellation refined background */}
      <ConstellationBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base pointer-events-none z-[1]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <p className="text-sm md:text-base font-medium text-accent-secondary tracking-wide mb-4">
          {t("greeting")}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary mb-6">
          {t("name")}
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          <TextReveal text={t("tagline")} delay={0.3} />
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-text-inverted font-medium rounded-lg hover:bg-accent-primary-hover transition-all duration-200 hover:scale-[1.02]"
            data-cursor-hover
          >
            {t("ctaPrimary")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-text-primary font-medium rounded-lg hover:bg-bg-surface hover:border-accent-secondary transition-all duration-200"
            data-cursor-hover
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        style={{ y: arrowY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={24} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
