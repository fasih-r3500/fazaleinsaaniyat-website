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
        // Nothing on this site is private, so nothing is disallowed, and the
        // preserved `/gkk` pages stay crawlable and listed in the sitemap.
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
