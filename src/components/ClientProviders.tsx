"use client";

import CustomCursor from "./CustomCursor";
import PageTransition from "./PageTransition";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
