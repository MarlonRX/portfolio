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
  const tp = await getServerTranslations(locale, "projects");
  const project = getProjectBySlug(slug);
  if (!project) return { title: t("notFound.projectTitle") };
  const title = tp.has(`${project.slug}.title`)
    ? tp(`${project.slug}.title`)
    : project.title;
  const description = tp.has(`${project.slug}.description`)
    ? tp(`${project.slug}.description`)
    : project.description;
  return {
    title: `${title} — Marlon Ramirez`,
    description,
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
            className="mb-8 inline-flex items-center gap-2 text-[15px] text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={16} />
            {t("links.back")}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-float)]">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
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
          <h1 className="text-4xl md:text-5xl text-text-primary mb-6">
            {projectTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
            {projectLongDesc}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-12 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 text-[15px]"
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
                className="btn-ghost px-6 py-3 text-[15px]"
              >
                {t("links.repo")}
              </a>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mb-10">
            <h2 className="text-2xl text-text-primary mb-6">
              {t("techStack")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="pill"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div>
            <h2 className="text-2xl text-text-primary mb-6">
              {t("features")}
            </h2>
            <ul className="space-y-3.5">
              {project.features.map((feature, index) => {
                const key = `${project.slug}.feature${index + 1}`;
                const translatedFeature = t.has(key) ? t(key) : feature;
                return (
                  <li
                    key={`${project.slug}-${index}`}
                    className="flex items-start gap-3 text-base md:text-lg text-text-secondary leading-relaxed"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
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
