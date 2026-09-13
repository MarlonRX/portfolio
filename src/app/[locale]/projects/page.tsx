import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/types/project";
import ProjectCard from "@/components/sections/ProjectCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

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
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: visible.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0);
  const uncategorized = visible.filter(
    (p) => !p.category || !CATEGORY_ORDER.includes(p.category)
  );

  let idx = 0;
  const cards = (items: typeof visible) =>
    items.map((project) => {
      const card = (
        <ScrollReveal
          key={project.slug}
          delay={0.1 + idx * 0.08}
          className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-md md:max-w-none"
        >
          <ProjectCard project={project} priority={idx < 2} />
        </ScrollReveal>
      );
      idx += 1;
      return card;
    });

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl text-text-primary mb-4">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary text-lg md:text-xl max-w-3xl leading-relaxed">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {groups.map((group, gi) => (
          <section key={group.category} className={gi > 0 ? "mt-16" : ""}>
            <ScrollReveal>
              <h2 className="tech-label mb-6 flex items-center gap-4">
                {t(`category.${group.category}`)}
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-border-subtle"
                />
              </h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-6 md:gap-8">{cards(group.items)}</div>
          </section>
        ))}

        {uncategorized.length > 0 && (
          <section className={groups.length > 0 ? "mt-16" : ""}>
            <div className="flex flex-wrap gap-6 md:gap-8">{cards(uncategorized)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
