import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/types/project";
import ProjectCard from "@/components/sections/ProjectCard";
import SplitText from "@/components/animations/SplitText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const CATEGORY_ORDER: ProjectCategory[] = ["web", "tooling", "terminal"];

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

  const visible = projects.filter((p) => p.view);
  const rank = (p: (typeof visible)[number]) => {
    const i = p.category ? CATEGORY_ORDER.indexOf(p.category) : -1;
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  const ordered = [...visible].sort((a, b) => rank(a) - rank(b));

  const cards = ordered.map((project, idx) => (
    <SpotlightCard key={project.slug} className="rounded-2xl">
      <ProjectCard project={project} priority={idx < 2} />
    </SpotlightCard>
  ));

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SplitText
            text={t("title")}
            tag="h1"
            textAlign="left"
            className="mb-4 text-4xl text-text-primary md:text-5xl"
            from={{ opacity: 0, y: 30 }}
            duration={0.9}
            delay={40}
          />
          <ScrollReveal delay={0.1}>
            <p className="max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-8">{cards}</div>
      </div>
    </div>
  );
}
