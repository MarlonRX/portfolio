import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);

// NOTE: `initOpenNextCloudflareForDev()` was removed: under plain `next dev` it boots a
// Miniflare/workerd simulator inside the dev server (~6 cores spinning at idle, RAM leak
// to 4.6 GB+). The app never calls `getCloudflareContext()`. Re-add only if dev needs
// Cloudflare bindings, and prefer `vinext dev` for that. `opennextjs-cloudflare` builds
// (preview/deploy) are unaffected — they use open-next.config.ts.
