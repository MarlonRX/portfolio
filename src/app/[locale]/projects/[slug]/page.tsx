import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  return projects.reduce<{ slug: string }[]>((acc, project) => {
    if (project.view) acc.push({ slug: project.slug });
    return acc;
  }, []);
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

  if (!project || !project.view) {
    notFound();
  }

  const projectTitle = t.has(`${project.slug}.title`) ? t(`${project.slug}.title`) : project.title;
  const projectLongDesc = t.has(`${project.slug}.longDescription`) 
    ? t(`${project.slug}.longDescription`) 
    : (t.has(`${project.slug}.description`) ? t(`${project.slug}.description`) : (project.longDescription || project.description));

  return (
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-base md:text-lg font-pixel-mono text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t("links.back")}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="aspect-video bg-bg-elevated pixel-border crt-screen overflow-hidden mb-10 relative">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageWithFallback
                src={project.image || `/images/projects/${project.slug}-hero.webp`}
                alt={projectTitle}
                fill
                fallbackLabel={projectTitle}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority={true}
              />
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-pixel-title tracking-tight text-text-primary mb-6">
            {projectTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-xl md:text-2xl font-pixel-mono text-text-secondary leading-relaxed mb-8">
            {projectLongDesc}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 border-2 border-green-500 text-white font-pixel-mono text-base md:text-lg hover:bg-green-500 hover:scale-[1.02] transition-[background-color,transform] duration-200 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                data-cursor-hover
              >
                <ExternalLink size={18} />
                {t("links.live")}
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-pixel-title text-text-primary mb-6">
              {t("techStack")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex px-3 py-1.5 text-base font-pixel-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div>
            <h2 className="text-2xl md:text-3xl font-pixel-title text-text-primary mb-6">
              {t("features")}
            </h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => {
                const key = `${project.slug}.feature${index + 1}`;
                const translatedFeature = t.has(key) ? t(key) : feature;
                return (
                  <li
                    key={`${project.slug}-${index}`}
                    className="flex items-start gap-3 text-lg md:text-xl font-pixel-mono text-text-secondary leading-relaxed"
                  >
                    <span className="mt-2.5 w-1.5 h-1.5 bg-accent-primary shrink-0" />
                    {translatedFeature}
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
