import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/locale";

// Generated from the app rather than kept as a static file, so the sitemap
// address cannot drift from the deployment it describes.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Nothing on this site is private, so nothing is disallowed. `/gkk` is
        // a separate app on the same domain and its pages are public too, so
        // they stay crawlable; they are left out of the sitemap because that
        // sitemap describes this site's own routes.
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
