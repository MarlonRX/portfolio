"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "") || "/";
    return pathWithoutLocale === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/88 backdrop-blur-md border-b border-border-subtle">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-[15px] font-medium tracking-tight text-text-primary"
          >
            Marlon Ramirez<span className="text-accent-primary">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`relative text-sm transition-colors ${
                  isActive(link.href)
                    ? "font-medium text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t(link.labelKey)}
                {isActive(link.href) && (
                  <m.span
                    layoutId="navbar-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent-primary"
                  />
                )}
              </Link>
            ))}
            <LocaleSwitcher />
            <Link
              href={`/${locale}/contact`}
              className="btn-primary ml-1 px-4 py-2 text-sm"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <LocaleSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-b border-border-subtle bg-white/95 backdrop-blur-md"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                    isActive(link.href)
                      ? "font-medium bg-bg-surface text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
