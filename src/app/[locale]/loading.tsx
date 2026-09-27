"use client";

import { useTranslations } from "next-intl";
import LatticeLoader from "@/components/ui/LatticeLoader";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <LatticeLoader label={t("loading")} color="#c9f24b" glow />
    </div>
  );
}
