"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Code2, Briefcase, Mail } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-band">
      {/* Banda de contacto — el momento oscuro del sitio */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
            <div>
              <p
                className="tech-label mb-5 flex items-center gap-3"
                style={{ color: "rgba(245,243,238,0.55)" }}
              >
                <span className="inline-block h-px w-5 bg-accent-primary" />
                {t("contactLabel")}
              </p>
              <h2 className="text-3xl md:text-4xl text-parchment">
                {t("contactTitle")}
              </h2>
              <p className="mt-4 max-w-[40ch] text-base text-parchment/65">
                {t("contactBlurb")}
              </p>
            </div>
            <Link
              href="mailto:mramirezce14@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-[15px] font-medium text-navy-band transition-[transform,box-shadow] duration-200 hover:-translate-y-px"
              style={{
                boxShadow:
                  "0 2px 8px rgba(212,175,55,0.35), 0 8px 24px rgba(0,0,0,0.35)",
              }}
            >
              <Mail size={16} />
              mramirezce14@gmail.com
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#04131f]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <span className="text-sm font-medium text-parchment">
            Marlon Ramirez<span className="text-accent-primary">.</span>
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/MarlonRX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-parchment/70 transition-colors hover:text-parchment"
            >
              <Code2 size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/marlon-ramirez-6b448b268"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-parchment/70 transition-colors hover:text-parchment"
            >
              <Briefcase size={18} />
            </a>
          </div>
          <small className="text-xs text-parchment/68">
            © {currentYear} {t("rights")}
          </small>
        </div>
      </div>
    </footer>
  );
}
