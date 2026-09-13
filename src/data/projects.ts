import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "nodovec",
    title: "NodoVec",
    description:
    "Software de gestiÃ³n financiera personal con dashboard analytics, gestiÃ³n de tarjetas de crÃ©dito, compras a cuotas, multi-moneda y ocho temas visuales.",
    longDescription:
      "NodoVec es una soluciÃ³n integral de gestiÃ³n financiera personal que permite a los usuarios trackear sus transacciones, gestionar tarjetas de crÃ©dito, realizar compras a cuotas, y visualizar mÃ©tricas financieras a travÃ©s de un dashboard completo con mÃºltiples librerÃ­as de grÃ¡ficos.",
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
      "Dashboard analytics con mÃºltiples librerÃ­as de grÃ¡ficos",
      "GestiÃ³n de tarjetas de crÃ©dito y compras a cuotas",
      "Sistema de roles y permisos granular (RBAC)",
      "Ocho temas visuales personalizables",
      "AutenticaciÃ³n JWT con 2FA",
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
      "TUI rÃ¡pida y visual para gestionar Git, escrita en Rust con Ratatui. Alternativa moderna a lazygit y gitui con dashboard interactivo, 10 temas, soporte i18n y modo CLI.",
    longDescription:
      "Git Hero es una Terminal User Interface (TUI) de alto rendimiento para gestionar repositorios Git. Ofrece un dashboard visual con branch, remote, ahead/behind, panel de archivos con indicadores de cambio, diff lado a lado, historial de commits expandible y soporte para mouse y atajos tipo vim. Incluye 10 temas personalizables, i18n (EN/ES), modo CLI no interactivo y modo debug, todo distribuido vÃ­a cargo, Homebrew, AUR y snap.",
    status: "production",
    category: "terminal",
    techStack: ["Rust", "Ratatui", "Crossterm", "Serde", "dirs"],
    features: [
      "Dashboard visual con branch, remote, ahead/behind",
      "Panel de archivos con indicadores de cambio y diff lado a lado",
      "Historial de commits expandible con detalles",
      "10 temas personalizables (Tokyo Night, Gruvbox Dark, Dracula, Nord...)",
      "Stage/unstage, commits, push/pull/fetch, stash y gestiÃ³n de ramas",
      "Soporte i18n (InglÃ©s/EspaÃ±ol), mouse y atajos tipo vim",
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
      "Demo de e-commerce full-stack con catÃ¡logo, filtros y carrito sobre Next.js 16 y la Shopify Storefront API, lista para conmutar a una tienda real.",
    longDescription:
      "Vitrina es una tienda de demostraciÃ³n portafolio que replica la experiencia completa de un e-commerce: catÃ¡logo de productos con bÃºsqueda y filtros, pÃ¡gina de detalle, carrito de compras y checkout embebido, alimentada por la Shopify Storefront API mediante Hydrogen React. Construida con Next.js 16 App Router, Tailwind CSS v4 y next-intl para internacionalizaciÃ³n ES/EN, con diseÃ±o editorial sobrio (borgoÃ±a + marfil). Sin pagos reales: al sustituir credenciales de una tienda, el proyecto pasa a producciÃ³n sin reescribir cÃ³digo.",
    status: "production",
    category: "web",
    techStack: ["Next.js 16", "Shopify Storefront API", "Hydrogen React", "Tailwind CSS v4", "next-intl", "TypeScript"],
    features: [
      "CatÃ¡logo con bÃºsqueda, filtros y ordenaciÃ³n",
      "Carrito de compras con estado global",
      "IntegraciÃ³n Shopify Storefront (GraphQL) desacoplada",
      "InternacionalizaciÃ³n espaÃ±ol/inglÃ©s",
      "DiseÃ±o editorial con paleta borgoÃ±a y marfil",
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
      "Repo Xpert responde a Â«quÃ© significa este repositorioÂ», no solo a Â«quÃ© cambiÃ³Â». Lee el historial directamente desde los objetos .git con gix â€”sin subprocess ni parsing de porcelainâ€” y calcula cuatro mÃ©tricas: churn (lÃ­neas aÃ±adidas + eliminadas), hotspots (churn Ã— LOC en un scatter ASCII), ownership/bus factor y coupling (archivos que co-cambian, con score Jaccard). Un repo de 10,000 commits indexa en ~1.3s (paralelo con rayon) y reabre en ~60ms desde una cachÃ© JSON incremental versionada en .git/repo-xpert/. Estrictamente solo lectura: sin red, sin credenciales, sin tocar el working tree. Fork de git-hero, del que reutiliza el andamiaje TUI y los temas.",
    status: "production",
    category: "terminal",
    techStack: ["Rust", "gix", "Ratatui", "Crossterm", "Rayon", "Serde"],
    features: [
      "Motor de analÃ­tica sobre objetos .git con gix, sin subprocess de git",
      "Cuatro mÃ©tricas: churn, hotspots (churn Ã— LOC), ownership/bus factor y coupling (Jaccard)",
      "TUI de 4 pestaÃ±as (Resumen Â· Churn Â· Hotspots Â· DueÃ±o) con scatter ASCII y tablas legibles",
      "CachÃ© JSON incremental versionada en .git/repo-xpert/: ~1.3s inicial, ~60ms reabrir",
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
      "Generador self-host de imÃ¡genes promocionales (PNG/WEBP/JPG) desde HTML/CSS: un solo #canvas se exporta a seis formatos con editor en el navegador y CLI.",
    longDescription:
      "Afiche Studio convierte un #canvas en HTML/CSS en imÃ¡genes de alta resoluciÃ³n para posts, stories, thumbnails, banners y Open Graph. Modo studio (localhost:4560): ediciÃ³n de index.html y styles.css con autoguardado, preview con recarga en vivo por SSE, chips para ver el mismo diseÃ±o en cada variante y panel de exportaciÃ³n en PNG/WEBP/JPG a escala 1xâ€“3x. El CLI renderiza por preset (--preset post|story|thumb|banner|og|wide), con --all, --json y scaffold escaneando los tokens de diseÃ±o del CSS global de una app (--app). Todo corre en tu mÃ¡quina: sin cuenta, sin nube, sin telemetrÃ­a. 27 tests con node:test, cero dependencias extra. Hermano de hyper-frames-videos: misma filosofÃ­a, imagen estÃ¡tica en vez de video.",
    status: "production",
    category: "tooling",
    techStack: ["Node.js", "Puppeteer", "HTML/CSS", "Container Queries", "SSE", "node:test"],
    features: [
      "Editor en el navegador con recarga en vivo (SSE), autoguardado y URL compartible por proyecto",
      "Exporta PNG / WEBP / JPG con deviceScaleFactor 1xâ€“3x, nÃ­tido para retina y zoom",
      "Seis formatos derivados de un solo diseÃ±o: post, story, thumb, banner, og y wide",
      "CLI completo: --create, --list, --preview, --preset, --all y --json",
      "Scaffold de pÃ³sters extrayendo tokens de diseÃ±o (:root, fuentes, radios) de una app con --app",
      "Self-host total: sin cuenta, sin nube, sin telemetrÃ­a",
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
    description: "[DescripciÃ³n detallada pendiente â€” proyecto en desarrollo]",
    status: "development",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "[CaracterÃ­stica por definir]",
      "[CaracterÃ­stica por definir]",
      "[CaracterÃ­stica por definir]",
    ],
    view: false,
  },
  {
    slug: "project-3",
    title: "Proyecto 3",
    image: "/images/projects/project-3-hero.webp",
    description: "[Proyecto por definir â€” placeholder para futuro trabajo]",
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
