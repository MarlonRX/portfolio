"use client";

import PageTransition from "./PageTransition";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
