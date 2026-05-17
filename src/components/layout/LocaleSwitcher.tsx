"use client";

import { Globe } from "lucide-react";
import { useLocaleStore } from "@/hooks/useLocaleStore";

const locales = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LocaleSwitcher() {
  const { locale: currentLocale, switchLocale } = useLocaleStore();

  return (
    <div className="flex items-center gap-1">
      <Globe size={14} className="text-text-muted mr-1" />
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            currentLocale === l.code
              ? "bg-accent-primary/10 text-accent-primary"
              : "text-text-muted hover:text-text-secondary"
          }`}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
