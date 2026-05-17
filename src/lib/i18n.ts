import { getTranslations } from "next-intl/server";

export function getServerTranslations<T extends string>(
  locale: string,
  namespace?: T
) {
  return getTranslations({ locale, namespace });
}
