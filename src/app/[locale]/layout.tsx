import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/ClientProviders";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getMetadataBase = () => {
  const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    return new URL(url);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_APP_URL: ${url}`);
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Example: Different titles per locale
  const titles = {
    en: "Marlon Ramirez — Full Stack Developer",
    es: "Marlon Ramirez — Desarrollador Full Stack",
  };

  return {
    metadataBase: getMetadataBase(),
    title: titles[locale as keyof typeof titles],
    description:
      "Portfolio of Marlon Ramirez. Building robust software that drives business forward.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClientProviders>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
