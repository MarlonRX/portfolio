"use client";

import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const t = useTranslations("home.projects");
  const locale = useLocale();
  const prefersReduced = useReducedMotion();

  const featuredProjects = projects.filter((p) => p.view).slice(0, 4);

  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <h2 className="mb-4 text-4xl text-text-primary md:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-[52ch] text-text-secondary">{t("subtitle")}</p>
        </m.div>

        {/* Stack pegajoso: cada tarjeta se apila sobre la anterior al hacer scroll */}
        <div className="relative">
          {featuredProjects.map((project, index) => (
            <div
              key={project.slug}
              className={prefersReduced ? "mb-8" : "sticky mb-[10vh]"}
              style={
                prefersReduced
                  ? undefined
                  : { top: `calc(5.5rem + ${index * 1.25}rem)`, zIndex: index + 1 }
              }
            >
              <ProjectCard project={project} priority={index === 0} />
            </div>
          ))}
        </div>

        <m.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-accent-secondary transition-colors hover:text-accent-secondary-hover"
          >
            {t("viewAll")}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
