import { getTranslations } from "next-intl/server";
import LatticeLoader from "@/components/ui/LatticeLoader";

export default async function Loading() {
  // loading.tsx no recibe params; next-intl resuelve el locale de la petición.
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <LatticeLoader label={t("loading")} color="#c9f24b" glow />
    </div>
  );
}
