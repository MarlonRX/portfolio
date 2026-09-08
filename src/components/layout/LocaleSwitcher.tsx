"use client";

import { useLocaleStore } from "@/hooks/useLocaleStore";

const locales = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LocaleSwitcher() {
  const { locale: currentLocale, switchLocale } = useLocaleStore();

  return (
    <div className="flex items-center rounded-full bg-bg-surface p-0.5 shadow-[inset_0_0_0_1px_var(--color-border-subtle)]">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[11.5px] font-medium tracking-wide transition-colors ${
            currentLocale === l.code
              ? "bg-white text-text-primary shadow-[0_1px_2px_rgba(50,50,93,0.12)]"
              : "text-text-muted hover:text-text-secondary"
          }`}
          aria-label={`Switch to ${l.label}`}
          aria-pressed={currentLocale === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
