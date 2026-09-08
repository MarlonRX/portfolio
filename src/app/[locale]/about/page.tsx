import { Metadata } from "next";
import Image from "next/image";
import { getServerTranslations } from "@/lib/i18n";
import ScrollReveal from "@/components/animations/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "meta.about");
  return {
    title: `${t("title")} — Marlon Ramirez`,
    description: t("description"),
  };
}

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Astro",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    skills: ["Laravel", "PHP", "Node.js", "REST APIs", "JWT Auth", "MySQL"],
  },
  {
    title: "Herramientas & DevOps",
    skills: ["Git", "Docker", "Kubernetes", "CI/CD", "Linux", "Nginx"],
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "about");

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
            <div className="shrink-0 w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-bg-elevated overflow-hidden relative shadow-[var(--shadow-float)]">
              <Image
                src="/images/cv.png"
                alt="Marlon Ramirez"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="tech-label mb-5 flex items-center justify-center md:justify-start gap-3">
                <span className="inline-block h-px w-5 bg-accent-primary" />
                {t("role")}
              </p>
              <h1 className="text-4xl md:text-5xl text-text-primary mb-6">
                {t("title")}
              </h1>

              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>{t("bio1")}</p>
                <p>{t("bio2")}</p>
                <p>{t("bio3")}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-16">
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl text-text-primary mb-6">
              {t("skills.title")}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <ScrollReveal key={category.title} delay={0.15 + idx * 0.1}>
                <div className="rounded-2xl bg-bg-base p-6 shadow-[var(--shadow-card)]">
                  <h3 className="tech-label mb-4 border-b border-border-subtle pb-2.5 normal-case tracking-[1.4px]">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="pill text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <div>
            <h2 className="text-2xl text-text-primary mb-6">
              {t("experience.title")}
            </h2>
            <div className="rounded-2xl bg-bg-base p-8 md:p-10 shadow-[var(--shadow-card)]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-text-primary">
                    {t("experience.job1.role")}
                  </h3>
                  <p className="text-base text-text-secondary mt-1">
                    {t("experience.job1.company")} &middot; {t("experience.job1.type")}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="pill">
                    {t("experience.job1.period")}
                  </span>
                  <p className="text-xs text-text-muted mt-2">
                    {t("experience.job1.location")}
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                {t("experience.job1.description")}
              </p>
              <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-5">
                {["PHP", "Next.js", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="pill text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
