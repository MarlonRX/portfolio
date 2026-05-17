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
      "Astro",
      "React",
      "Tailwind CSS",
      "Laravel",
      "MySQL",
      "Kubernetes",
      "JWT",
    ],
    features: [
      "Dashboard analytics con múltiples librerías de gráficos",
      "Gestión de tarjetas de crédito y compras a cuotas",
      "Sistema de roles y permisos granular (RBAC)",
      "Ocho temas visuales personalizables",
      "Autenticación JWT con 2FA",
      "Deployment production-ready con Kubernetes",
    ],
    liveUrl: "#",
    repoUrl: "https://github.com/MarlonRX/cash_pilot_frontend",
  },
  {
    slug: "logis",
    title: "Logis",
    description: "[Descripción detallada pendiente — proyecto en desarrollo]",
    status: "development",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "[Característica por definir]",
      "[Característica por definir]",
      "[Característica por definir]",
    ],
  },
  {
    slug: "project-3",
    title: "Proyecto 3",
    description: "[Proyecto por definir — placeholder para futuro trabajo]",
    status: "planned",
    techStack: ["Por definir"],
    features: ["[Por definir]", "[Por definir]", "[Por definir]"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
