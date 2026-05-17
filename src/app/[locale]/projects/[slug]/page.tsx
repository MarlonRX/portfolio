import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getServerTranslations(locale, "meta");
  const project = getProjectBySlug(slug);
  if (!project) return { title: t("notFound.projectTitle") };
  return {
    title: `${project.title} — Marlon Ramirez`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const t = await getServerTranslations(locale, "projects");

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t("links.back")}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="aspect-video bg-bg-elevated rounded-xl border border-border-subtle overflow-hidden mb-10">
            <ImageWithFallback
              src={`/images/projects/${project.slug}-hero.jpg`}
              alt={project.title}
              fill
              fallbackLabel={project.title}
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            {project.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {project.longDescription || project.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-text-inverted font-medium rounded-lg hover:bg-accent-primary-hover transition-colors"
                data-cursor-hover
              >
                <ExternalLink size={16} />
                {t("links.live")}
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-default text-text-primary font-medium rounded-lg hover:bg-bg-surface hover:border-accent-secondary transition-colors"
                data-cursor-hover
              >
                <Code2 size={16} />
                {t("links.repo")}
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {t("techStack")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex px-3 py-1 text-sm font-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {t("features")}
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
