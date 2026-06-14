"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Code2, Briefcase, Mail } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-base sm:text-lg font-pixel-title tracking-tight text-text-primary">
                Marlon Ramirez
              </span>
              <p className="text-sm text-text-muted">
                &copy; {currentYear} {t("rights")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <SocialLink href="https://github.com/MarlonRX" icon={<Code2 size={20} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/marlon-ramirez-6b448b268" icon={<Briefcase size={20} />} label="LinkedIn" />
              <SocialLink href="mailto:mramirezce14@gmail.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 pt-8 border-t border-border-subtle text-center">
          <p className="text-xs text-text-muted">
            {t("builtWith")}{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-secondary hover:underline"
            >
              Next.js
            </Link>{" "}
            +{" "}
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-secondary hover:underline"
            >
              Tailwind CSS
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="p-2 rounded-lg text-text-muted hover:text-accent-secondary hover:bg-accent-secondary/10 transition-colors"
      data-cursor-hover
    >
      {icon}
    </Link>
  );
}
