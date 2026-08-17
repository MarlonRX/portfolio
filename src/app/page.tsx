import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Marlon Ramirez — Software Developer",
  description:
    "Portfolio of Marlon Ramirez. Full-stack developer specializing in modern web applications.",
};

export default async function RootPage() {
  const locale = await getLocale();
  redirect(`/${locale}`);
}
