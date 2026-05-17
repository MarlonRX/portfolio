import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { Code2, Server, Wrench } from "lucide-react";
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
    icon: <Code2 size={20} />,
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
    icon: <Server size={20} />,
    skills: ["Laravel", "PHP", "Node.js", "REST APIs", "JWT Auth", "MySQL"],
  },
  {
    title: "Herramientas & DevOps",
    icon: <Wrench size={20} />,
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
            {/* Avatar placeholder */}
            <div className="shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center overflow-hidden">
              <span className="text-4xl font-bold text-text-muted">MRX</span>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-2">
                {t("title")}
              </h1>
              <p className="text-accent-secondary font-medium mb-6">
                {t("role")}
              </p>

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
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {t("skills.title")}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <ScrollReveal key={category.title} delay={0.15 + idx * 0.1}>
                <div className="bg-bg-surface border border-border-subtle rounded-xl p-6 hover:border-border-default transition-colors duration-300">
                  <div className="flex items-center gap-2 text-accent-primary mb-4">
                    {category.icon}
                    <h3 className="font-semibold text-text-primary">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex px-2.5 py-1 text-xs font-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 rounded-full"
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
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {t("experience.title")}
            </h2>
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-8 text-center">
              <p className="text-text-muted">{t("experience.placeholder")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
