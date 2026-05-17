"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const t = useTranslations("home.projects");
  const locale = useLocale();

  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-accent-secondary font-medium hover:text-accent-secondary-hover transition-colors group"
          >
            {t("viewAll")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
