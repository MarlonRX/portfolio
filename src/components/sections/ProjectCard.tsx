"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, Play } from "lucide-react";
import { Project } from "@/types/project";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
              src={`/images/projects/${project.slug}-hero.jpg`}
              alt={project.title}
              fill
              fallbackLabel={project.title}
              className="object-cover"
            />
          </div>

          {/* Video preview on hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={videoRef}
              src="#"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster=""
            >
              <source src="#" type="video/mp4" />
            </video>
            {/* Play indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 rounded-full bg-accent-primary/90 flex items-center justify-center">
                <Play size={20} className="text-text-inverted ml-0.5" />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[project.status]}`}
            >
              {t(`status.${project.status}`)}
            </span>
          </div>

          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex px-2 py-0.5 text-xs font-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex px-2 py-0.5 text-xs font-mono text-text-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-secondary hover:text-accent-secondary-hover transition-colors group/link"
            >
              {t("links.detail")}
              <ArrowRight
                size={14}
                className="group-hover/link:translate-x-0.5 transition-transform"
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
                <ExternalLink size={16} />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-muted hover:text-accent-secondary transition-colors"
                aria-label={t("links.repo")}
              >
                <Code2 size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
