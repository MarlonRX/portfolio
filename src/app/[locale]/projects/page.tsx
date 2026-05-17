import { Metadata } from "next";
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary text-lg max-w-2xl">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={0.1 + idx * 0.08}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
