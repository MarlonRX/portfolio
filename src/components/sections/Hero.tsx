"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConstellationBackground from "./ConstellationBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SpriteAnimator from "@/components/ui/SpriteAnimator";
import Typewriter from "@/components/ui/Typewriter";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const taglineWords = t.raw("taglineWords") as string[];
  const taglinePrefix = t("taglinePrefix");
  const taglineSuffix = t("taglineSuffix");
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 overflow-hidden"
    >
      {/* Constellation refined background */}
      <ConstellationBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base pointer-events-none z-[1]" />

      {/* Main container centering the panel horizontally and vertically */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center">

        {/* Retro Green Terminal Panel container with sprites around it */}
        <div className="relative w-full">

          {/* Float Sprite 1: Top-Right (classic 2-frame space invader alien) */}
          <div className="absolute -top-14 right-6 z-20 pointer-events-none animate-bounce" style={{ animationDuration: "3s" }}>
            <SpriteAnimator
              src="/sprites/space-invader.png"
              frameCount={2}
              frameWidth={48}
              frameHeight={48}
              fps={1}
              className="text-accent-secondary"
            />
          </div>

          {/* Green Terminal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="w-full pixel-border crt-screen bg-[#081e0a]/95 shadow-[0_0_30px_rgba(34,197,94,0.15)] border-green-800/80 p-6 md:p-10 text-left flex flex-col items-start justify-start"
          >
            {/* Top Bar Decoration (like a terminal window header) */}
            <div className="w-full flex items-center justify-between border-b-2 border-green-900/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse" />
                <span className="font-pixel-mono text-sm text-green-500/80 uppercase tracking-widest">
                  mrx_terminal_v1.0.4.sys
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-green-800 rounded-sm" />
                <span className="w-2.5 h-2.5 bg-green-800 rounded-sm" />
                <span className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
              </div>
            </div>

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="w-full flex flex-col items-start justify-start text-left"
            >
              <p className="font-pixel-mono text-base sm:text-lg md:text-xl text-green-400 tracking-wide mb-3">
                {t("greeting")}
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel-title tracking-tight text-white mb-6">
                {t("name")}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-pixel-mono text-green-300 max-w-2xl mb-8 leading-relaxed">
                <span>{taglinePrefix}</span>
                <Typewriter
                  words={taglineWords}
                  className="text-accent-primary font-bold border-b border-accent-primary/30 pb-0.5"
                />
                <span>{taglineSuffix}</span>
                <span className="inline-block w-2 h-5 bg-green-400 ml-1.5 retro-blink align-middle" />
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href={`/${locale}/projects`}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 border-2 border-green-500 text-white font-pixel-mono text-sm sm:text-base md:text-lg rounded hover:bg-green-500 transition-all duration-200 hover:scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  data-cursor-hover
                >
                  {t("ctaPrimary")}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-800 bg-[#061407] text-green-400 font-pixel-mono text-sm sm:text-base md:text-lg rounded hover:bg-green-950/50 hover:border-green-500 transition-all duration-200"
                  data-cursor-hover
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Float Sprite 2: Bottom-Right of the panel (e.g. Companion pet placeholder) */}
          <div className="absolute -bottom-8 -right-8 z-20 pointer-events-none">
            <SpriteAnimator
              src="/sprites/pet-companion.png"
              frameCount={5}
              frameWidth={64}
              frameHeight={64}
              fps={4}
              className="text-green-400"
            />
          </div>

          {/* Float Sprite 3: Left side of the panel */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
            <SpriteAnimator
              src="/sprites/avatar-hero.png"
              frameCount={6}
              frameWidth={80}
              frameHeight={80}
              fps={2}
              className="text-accent-primary"
            />
          </div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        style={{ y: arrowY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
