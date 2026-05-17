"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function useLocaleStore() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (targetLocale: string) => {
    if (targetLocale === locale) return;

    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === "es" || segments[0] === "en") {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    const newPath = "/" + segments.join("/");

    // Persist preference in cookie so / redirects correctly later
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000`;

    router.push(newPath);
  };

  return { locale, switchLocale };
}
