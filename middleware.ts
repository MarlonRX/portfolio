import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - metadata routes (icon, apple-icon) — no tienen extensión y caerían
  //   en la redirección de locale (307 → /en/icon → 404)
  // - all root files inside /public (e.g. /favicon.ico)
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};
