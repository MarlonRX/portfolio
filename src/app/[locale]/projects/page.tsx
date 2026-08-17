import { Metadata } from "next";
import type { ReactNode } from "react";
import { getServerTranslations } from "@/lib/i18n";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "meta.projects");
  return {
    title: `${t("title")} — Marlon Ramirez`,
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "projects");

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-pixel-title tracking-tight text-text-primary mb-4">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary text-xl md:text-2xl max-w-3xl leading-relaxed">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {projects.reduce<ReactNode[]>((acc, project) => {
            if (!project.view) return acc;
            const idx = acc.length;
            acc.push(
              <ScrollReveal
                key={project.slug}
                delay={0.1 + idx * 0.08}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-md md:max-w-none"
              >
                <ProjectCard project={project} priority={idx < 2} />
              </ScrollReveal>
            );
            return acc;
          }, [])}
        </div>
      </div>
    </div>
  );
}
