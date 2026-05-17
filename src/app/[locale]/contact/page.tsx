import { Metadata } from "next";
import { getServerTranslations } from "@/lib/i18n";
import { Code2, Briefcase, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
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
    href: "#",
    icon: <Code2 size={24} />,
    handle: "@MarlonRX",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <Briefcase size={24} />,
    handle: "[Por definir]",
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: <MessageCircle size={24} />,
    handle: "[Por definir]",
  },
  {
    name: "Email",
    href: "#",
    icon: <Mail size={24} />,
    handle: "[Por definir]",
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
    <div className="pt-24 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-semibold text-text-primary text-center mb-8">
              {t("cta")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-border-subtle hover:border-border-default hover:bg-bg-elevated transition-all duration-200"
                  data-cursor-hover
                >
                  <div className="p-2.5 rounded-lg bg-accent-secondary/10 text-accent-secondary group-hover:text-accent-secondary-hover transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {link.name}
                    </p>
                    <p className="text-sm text-text-muted truncate">
                      {link.handle}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-text-muted group-hover:text-accent-secondary transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-center text-sm text-text-muted">
            {t("availability")}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
