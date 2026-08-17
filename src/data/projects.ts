import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "nodovec",
    title: "NodoVec",
    description:
    "Software de gestión financiera personal con dashboard analytics, gestión de tarjetas de crédito, compras a cuotas, multi-moneda y ocho temas visuales.",
    longDescription:
      "NodoVec es una solución integral de gestión financiera personal que permite a los usuarios trackear sus transacciones, gestionar tarjetas de crédito, realizar compras a cuotas, y visualizar métricas financieras a través de un dashboard completo con múltiples librerías de gráficos.",
    status: "production",
    techStack: [
      "Astro 5",
      "React",
      "Tailwind CSS v4",
      "Laravel 12",
      "Laravel Passport",
      "MySQL",
      "Kubernetes",
      "Bun",
      "Zod",
    ],
    features: [
      "Dashboard analytics con múltiples librerías de gráficos",
      "Gestión de tarjetas de crédito y compras a cuotas",
      "Sistema de roles y permisos granular (RBAC)",
      "Ocho temas visuales personalizables",
      "Autenticación JWT con 2FA",
      "Deployment production-ready con Kubernetes",
    ],
    liveUrl: "https://nodovec-web-production.up.railway.app",
    repoUrl: "https://github.com/MarlonRX/nodovec_frontend",
    video: "/videos/projects/nodovec-promo.webm",
    image: "/images/projects/nodovec-hero.webp",
    view: true,
  },
  {
    slug: "git-hero",
    title: "Git Hero",
    description:
      "TUI rápida y visual para gestionar Git, escrita en Rust con Ratatui. Alternativa moderna a lazygit y gitui con dashboard interactivo, 10 temas, soporte i18n y modo CLI.",
    longDescription:
      "Git Hero es una Terminal User Interface (TUI) de alto rendimiento para gestionar repositorios Git. Ofrece un dashboard visual con branch, remote, ahead/behind, panel de archivos con indicadores de cambio, diff lado a lado, historial de commits expandible y soporte para mouse y atajos tipo vim. Incluye 10 temas personalizables, i18n (EN/ES), modo CLI no interactivo y modo debug, todo distribuido vía cargo, Homebrew, AUR y snap.",
    status: "production",
    techStack: ["Rust", "Ratatui", "Crossterm", "Serde", "dirs"],
    features: [
      "Dashboard visual con branch, remote, ahead/behind",
      "Panel de archivos con indicadores de cambio y diff lado a lado",
      "Historial de commits expandible con detalles",
      "10 temas personalizables (Tokyo Night, Gruvbox Dark, Dracula, Nord...)",
      "Stage/unstage, commits, push/pull/fetch, stash y gestión de ramas",
      "Soporte i18n (Inglés/Español), mouse y atajos tipo vim",
      "Modos TUI interactivo, CLI no interactivo y debug",
    ],
    repoUrl: "https://github.com/MarlonRX/git-hero",
    liveUrl: "https://github.com/MarlonRX/git-hero",
    video: "/videos/projects/git-hero-promo.webm",
    image: "/images/projects/git-hero.webp",
    view: true,
  },
  {
    slug: "logis",
    title: "Logis",
    image: "/images/projects/logis-hero.webp",
    description: "[Descripción detallada pendiente — proyecto en desarrollo]",
    status: "development",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "[Característica por definir]",
      "[Característica por definir]",
      "[Característica por definir]",
    ],
    view: false,
  },
  {
    slug: "project-3",
    title: "Proyecto 3",
    image: "/images/projects/project-3-hero.webp",
    description: "[Proyecto por definir — placeholder para futuro trabajo]",
    status: "planned",
    techStack: ["Por definir"],
    features: ["[Por definir]", "[Por definir]", "[Por definir]"],
    view: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
