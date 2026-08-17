import { Metadata } from "next";
import Image from "next/image";
import { getServerTranslations } from "@/lib/i18n";
import { Code2, Server, Wrench } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpriteAnimator from "@/components/ui/SpriteAnimator";

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
            <div className="shrink-0 w-64 h-64 pixel-border crt-screen bg-bg-elevated overflow-hidden relative">
              <Image
                src="/sprites/avatar-pixelated.png"
                alt="Marlon Ramirez"
                fill
                className="object-cover"
                style={{ imageRendering: "pixelated" }}
                sizes="256px"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-2 flex items-center justify-center md:justify-start gap-4">
                <span>{t("title")}</span>
                <SpriteAnimator
                  src="/sprites/dino.png"
                  frameCount={2}
                  frameWidth={32}
                  frameHeight={32}
                  fps={2}
                  className="shrink-0"
                />
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
            <div className="bg-bg-surface border border-border-subtle rounded-xl p-8 md:p-10 relative overflow-hidden group hover:border-border-default transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                    {t("experience.job1.role")}
                  </h3>
                  <p className="text-base text-accent-secondary font-medium mt-1">
                    {t("experience.job1.company")} &middot; {t("experience.job1.type")}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="inline-block px-3 py-1 font-mono text-sm bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary">
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
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
                {["PHP", "Next.js", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex px-2.5 py-1 text-xs font-mono text-text-muted bg-bg-elevated border border-border-subtle rounded-md"
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
