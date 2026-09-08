import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { Code2, Briefcase, Mail, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "meta.contact");
  return {
    title: `${t("title")} — Marlon Ramirez`,
    description: t("description"),
  };
}

const contactLinks = [
  {
    name: "GitHub",
    href: "https://github.com/MarlonRX",
    icon: <Code2 size={20} />,
    handle: "@MarlonRX",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/marlon-ramirez-6b448b268",
    icon: <Briefcase size={20} />,
    handle: "Marlon Ramirez",
  },
  {
    name: "Email",
    href: "mailto:mramirezce14@gmail.com",
    icon: <Mail size={20} />,
    handle: "mramirezce14@gmail.com",
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getServerTranslations(locale, "contact");

  return (
    <div className="pt-32 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16">
          <ScrollReveal>
            <p className="tech-label mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-5 bg-accent-primary" />
              {t("title")}
            </p>
            <h1 className="mb-4 text-4xl md:text-5xl text-text-primary">
              {t("cta")}
            </h1>
            <p className="text-lg text-text-secondary max-w-xl">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-4 rounded-xl bg-bg-base p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-accent-secondary transition-colors group-hover:bg-navy-band group-hover:text-white">
                  {link.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {link.name}
                  </p>
                  <p className="truncate text-sm text-text-muted">
                    {link.handle}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-text-muted transition-colors group-hover:text-accent-secondary"
                />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex items-center justify-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <p className="text-sm text-text-muted">{t("availability")}</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
