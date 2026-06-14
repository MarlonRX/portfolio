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

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const statusColors = {
    production: "bg-success/10 text-success border-success/20",
    development: "bg-warning/10 text-warning border-warning/20",
    planned: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20",
  };

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
      className="group h-full rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* Animated glow border */}
      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
        <div className="absolute inset-0 rounded-xl glow-border" />
      </div>

      {/* Card content */}
      <div className="relative z-10 h-full bg-bg-surface border border-border-subtle rounded-xl overflow-hidden group-hover:border-border-default transition-colors duration-300">
        {/* Media area - large image/video */}
        <div className="relative aspect-[16/10] bg-bg-elevated overflow-hidden">
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 rounded-full bg-accent-primary/90 flex items-center justify-center">
                  <Play size={20} className="text-text-inverted ml-0.5" />
                </div>
              </div>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-flex px-3 py-1 text-xs font-pixel-mono border ${statusColors[project.status]}`}
            >
              {t(`status.${project.status}`)}
            </span>
          </div>

          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        <div className="p-8">
          <h3 className="text-2xl md:text-3xl font-pixel-title text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
            {t.has(`${project.slug}.title`) ? t(`${project.slug}.title`) : project.title}
          </h3>

          <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-3">
            {t.has(`${project.slug}.description`) ? t(`${project.slug}.description`) : project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex px-3 py-1 text-sm font-pixel-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex px-2 py-1 text-xs font-pixel-mono text-text-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-5 border-t border-border-subtle">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-lg md:text-xl font-pixel-mono text-accent-secondary hover:text-accent-secondary-hover transition-colors group/link"
            >
              {t("links.detail")}
              <ArrowRight
                size={16}
                className="group-hover/link:translate-x-1 transition-transform"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-muted hover:text-accent-secondary transition-colors"
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
