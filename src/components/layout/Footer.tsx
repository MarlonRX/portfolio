"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Code2, Briefcase, Mail } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle bg-navy-band">
      {/* Banda de contacto */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-10 py-20 md:py-28">
            <h2 className="max-w-[20ch] text-4xl text-parchment md:text-6xl">
              {t("contactTitle")}
            </h2>
            <p className="-mt-4 max-w-[40ch] text-base text-parchment/60">
              {t("contactBlurb")}
            </p>
            <a
              href="mailto:mramirezce1420@gmail.com"
              className="group inline-flex items-center gap-3 font-mono text-lg text-accent-primary transition-colors hover:text-accent-primary-hover md:text-2xl"
            >
              mramirezce1420@gmail.com
              <Mail
                size={20}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium text-parchment"
          >
            Marlon Ramirez<span className="text-accent-primary">.</span>
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/MarlonRX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-parchment/60 transition-colors hover:text-accent-primary"
            >
              <Code2 size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mramirezce"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-parchment/60 transition-colors hover:text-accent-primary"
            >
              <Briefcase size={18} />
            </a>
          </div>
          <small className="text-xs text-parchment/50">
            © {currentYear} · {t("rights")}
          </small>
        </div>
      </div>
    </footer>
  );
}
