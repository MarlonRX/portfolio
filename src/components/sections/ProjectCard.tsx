"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const statusColors = {
  production: "bg-success/10 text-success",
  development: "bg-warning/10 text-warning",
  planned: "bg-white/5 text-text-muted",
};

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className="group grid h-full overflow-hidden rounded-2xl bg-bg-surface shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] md:min-h-[400px] md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media: imagen fija, video al hacer hover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated md:aspect-auto md:min-h-[340px]">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
        >
          <ImageWithFallback
            src={project.image || `/images/projects/${project.slug}-hero.webp`}
            alt={project.title}
            fill
            fallbackLabel={project.title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority={priority}
          />
        </div>

        {project.video && (
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="absolute left-4 top-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium backdrop-blur-sm ${statusColors[project.status]}`}
          >
            {project.status === "production" && (
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            )}
            {t(`status.${project.status}`)}
          </span>
        </div>
      </div>

      <div className="flex flex-col p-7 md:p-10">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link href={`/${locale}/projects/${project.slug}`} className="block">
            <h3 className="text-2xl font-medium text-text-primary transition-colors group-hover:text-accent-primary md:text-3xl">
              {t.has(`${project.slug}.title`)
                ? t(`${project.slug}.title`)
                : project.title}
            </h3>
          </Link>
          {project.category && (
            <span className="tech-label text-[10px]">
              {t(`category.${project.category}`)}
            </span>
          )}
        </div>

        <p className="mb-6 line-clamp-3 text-base leading-relaxed text-text-secondary">
          {t.has(`${project.slug}.description`)
            ? t(`${project.slug}.description`)
            : project.description}
        </p>

        <div className="mb-7 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-label self-center pl-1 normal-case tracking-normal">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-border-subtle pt-5">
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-accent-secondary transition-colors group/link hover:text-accent-secondary-hover"
          >
            {t("links.detail")}
            <ArrowRight
              size={16}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto p-2 text-text-muted transition-colors hover:text-accent-primary"
              aria-label={t("links.live")}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
