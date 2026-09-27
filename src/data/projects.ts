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
    category: "web",
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
    category: "terminal",
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
    slug: "vitrina",
    title: "Vitrina",
    description:
      "Demo de e-commerce full-stack con catálogo, filtros y carrito sobre Next.js 16 y la Shopify Storefront API, lista para conmutar a una tienda real.",
    longDescription:
      "Vitrina es una tienda de demostración portafolio que replica la experiencia completa de un e-commerce: catálogo de productos con búsqueda y filtros, página de detalle, carrito de compras y checkout embebido, alimentada por la Shopify Storefront API mediante Hydrogen React. Construida con Next.js 16 App Router, Tailwind CSS v4 y next-intl para internacionalización ES/EN, con diseño editorial sobrio (borgoña + marfil). Sin pagos reales: al sustituir credenciales de una tienda, el proyecto pasa a producción sin reescribir código.",
    status: "production",
    category: "web",
    techStack: ["Next.js 16", "Shopify Storefront API", "Hydrogen React", "Tailwind CSS v4", "next-intl", "TypeScript"],
    features: [
      "Catálogo con búsqueda, filtros y ordenación",
      "Carrito de compras con estado global",
      "Integración Shopify Storefront (GraphQL) desacoplada",
      "Internacionalización español/inglés",
      "Diseño editorial con paleta borgoña y marfil",
      "Listo para conmutar a una tienda real con credenciales",
    ],
    liveUrl: "https://vitrina-kohl.vercel.app",
    repoUrl: "https://github.com/MarlonRX/vitrina",
    video: "/videos/projects/vitrina-promo.webm",
    image: "/images/projects/vitrina-hero.webp",
    view: true,
  },
  {
    slug: "repo-xpert",
    title: "Repo Xpert",
    description:
      "Analizador de repositorios Git en la terminal, en Rust puro y solo lectura: churn, hotspots, ownership y coupling calculados directamente sobre los objetos .git.",
    longDescription:
      "Repo Xpert responde a «qué significa este repositorio», no solo a «qué cambió». Lee el historial directamente desde los objetos .git con gix —sin subprocess ni parsing de porcelain— y calcula cuatro métricas: churn (líneas añadidas + eliminadas), hotspots (churn × LOC en un scatter ASCII), ownership/bus factor y coupling (archivos que co-cambian, con score Jaccard). Un repo de 10,000 commits indexa en ~1.3s (paralelo con rayon) y reabre en ~60ms desde una caché JSON incremental versionada en .git/repo-xpert/. Estrictamente solo lectura: sin red, sin credenciales, sin tocar el working tree. Fork de git-hero, del que reutiliza el andamiaje TUI y los temas.",
    status: "production",
    category: "terminal",
    techStack: ["Rust", "gix", "Ratatui", "Crossterm", "Rayon", "Serde"],
    features: [
      "Motor de analítica sobre objetos .git con gix, sin subprocess de git",
      "Cuatro métricas: churn, hotspots (churn × LOC), ownership/bus factor y coupling (Jaccard)",
      "TUI de 4 pestañas (Resumen · Churn · Hotspots · Dueño) con scatter ASCII y tablas legibles",
      "Caché JSON incremental versionada en .git/repo-xpert/: ~1.3s inicial, ~60ms reabrir",
      "Modo headless `gadv scan` para scripts y CI, con vecinos co-change por archivo",
      "Estrictamente solo lectura: sin red, sin credenciales, sin escrituras al working tree",
      "Filtrado de lockfiles, vendor/, dist/ y mega-commits en hotspots y coupling",
    ],
    repoUrl: "https://github.com/MarlonRX/repo-xpert",
    image: "/images/projects/repo-xpert-hero.webp",
    video: "/videos/projects/repo-xpert-promo.webm",
    view: true,
  },
  {
    slug: "afiche-studio",
    title: "Afiche Studio",
    description:
      "Generador self-host de imágenes promocionales (PNG/WEBP/JPG) desde HTML/CSS: un solo #canvas se exporta a seis formatos con editor en el navegador y CLI.",
    longDescription:
      "Afiche Studio convierte un #canvas en HTML/CSS en imágenes de alta resolución para posts, stories, thumbnails, banners y Open Graph. Modo studio (localhost:4560): edición de index.html y styles.css con autoguardado, preview con recarga en vivo por SSE, chips para ver el mismo diseño en cada variante y panel de exportación en PNG/WEBP/JPG a escala 1x–3x. El CLI renderiza por preset (--preset post|story|thumb|banner|og|wide), con --all, --json y scaffold escaneando los tokens de diseño del CSS global de una app (--app). Todo corre en tu máquina: sin cuenta, sin nube, sin telemetría. 27 tests con node:test, cero dependencias extra. Hermano de hyper-frames-videos: misma filosofía, imagen estática en vez de video.",
    status: "production",
    category: "tooling",
    techStack: ["Node.js", "Puppeteer", "HTML/CSS", "Container Queries", "SSE", "node:test"],
    features: [
      "Editor en el navegador con recarga en vivo (SSE), autoguardado y URL compartible por proyecto",
      "Exporta PNG / WEBP / JPG con deviceScaleFactor 1x–3x, nítido para retina y zoom",
      "Seis formatos derivados de un solo diseño: post, story, thumb, banner, og y wide",
      "CLI completo: --create, --list, --preview, --preset, --all y --json",
      "Scaffold de pósters extrayendo tokens de diseño (:root, fuentes, radios) de una app con --app",
      "Self-host total: sin cuenta, sin nube, sin telemetría",
      "27 tests con node:test y cero dependencias extra",
    ],
    repoUrl: "https://github.com/MarlonRX/afiche-studio",
    image: "/images/projects/afiche-studio-hero.webp",
    video: "/videos/projects/afiche-studio-promo.webm",
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

export function getHeroProjects(): Project[] {
  return projects.filter(
    (p) =>
      p.view &&
      Boolean(p.image) &&
      (p.status === "production" || p.status === "development")
  );
}
