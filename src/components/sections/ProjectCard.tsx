"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import { Project } from "@/types/project";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const statusColors = {
  production: "bg-success/8 text-success",
  development: "bg-warning/10 text-warning",
  planned: "bg-accent-secondary/6 text-text-muted",
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
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
      className="group h-full overflow-hidden rounded-2xl bg-bg-base shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Media area - large image/video */}
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
          {/* Image / Fallback */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}>
            <ImageWithFallback
              src={project.image || `/images/projects/${project.slug}-hero.webp`}
              alt={project.title}
              fill
              fallbackLabel={project.title}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>

          {/* Video preview on hover */}
          {project.video && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Play indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary shadow-[0_2px_8px_rgba(212,175,55,0.35),0_8px_24px_rgba(6,27,49,0.25)]">
                  <Play size={20} className="ml-0.5 text-text-inverted" />
                </div>
              </div>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute left-4 top-4 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium ${statusColors[project.status]}`}
            >
              {project.status === "production" && (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
              {t(`status.${project.status}`)}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="block"
            >
              <h3 className="text-xl md:text-2xl font-medium text-text-primary transition-colors group-hover:text-accent-secondary">
                {t.has(`${project.slug}.title`) ? t(`${project.slug}.title`) : project.title}
              </h3>
            </Link>
            {project.category && (
              <span className="tech-label text-[10px] text-accent-secondary/80">
                {t(`category.${project.category}`)}
              </span>
            )}
          </div>

          <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-3">
            {t.has(`${project.slug}.description`) ? t(`${project.slug}.description`) : project.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
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
              className="inline-flex items-center gap-2 text-[15px] font-medium text-accent-secondary transition-colors group/link"
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
                className="ml-auto p-2 text-text-muted transition-colors hover:text-accent-secondary"
                aria-label={t("links.live")}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
