"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackClassName?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  fallbackClassName = "",
  fallbackLabel,
  priority = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const label = fallbackLabel || alt;

  if (error) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-elevated to-bg-surface",
          fill && "absolute inset-0",
          fallbackClassName
        )}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.5) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        <span className="relative z-10 text-sm font-mono text-text-muted tracking-wider">
          {label}
        </span>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true as const, className: cn("object-cover", className) }
    : { width: width ?? 800, height: height ?? 600, className };

  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
