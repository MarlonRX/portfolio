"use client";

const TECHS = [
  "TypeScript",
  "Rust",
  "Next.js",
  "React",
  "Laravel",
  "Kubernetes",
  "Node.js",
  "MySQL",
  "Tailwind CSS",
  "Ratatui",
  "GraphQL",
  "Docker",
];

export default function TechMarquee() {
  const row = [...TECHS, ...TECHS];

  return (
    <section
      aria-label="Tech stack"
      className="marquee relative overflow-hidden border-y border-border-subtle bg-bg-surface py-5"
    >
      <div className="marquee-track items-center gap-10 pr-10">
        {row.map((tech, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-mono text-sm tracking-wide text-text-secondary whitespace-nowrap">
              {tech}
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-primary" />
          </span>
        ))}
      </div>
    </section>
  );
}
