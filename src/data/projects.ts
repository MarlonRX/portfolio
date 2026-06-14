import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "cashpilot",
    title: "CashPilot",
    description:
    "Software de gestión financiera personal con dashboard analytics, gestión de tarjetas de crédito, compras a cuotas, multi-moneda y ocho temas visuales.",
    longDescription:
    "CashPilot es una solución integral de gestión financiera personal que permite a los usuarios trackear sus transacciones, gestionar tarjetas de crédito, realizar compras a cuotas, y visualizar métricas financieras a través de un dashboard completo con múltiples librerías de gráficos.",
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
    liveUrl: "https://cashpilot-web-production.up.railway.app",
    repoUrl: "https://github.com/MarlonRX/cash_pilot_frontend",
    video: "/videos/projects/cashpilot.mp4",
    image: "/images/projects/cashpilot-hero.webp",
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
