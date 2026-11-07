import type { Metadata, Viewport } from "next";
import "../site.css";
import { SiteShell } from "@/components/site/SiteShell";
import { site } from "@/content/copy";
import { SITE_URL } from "@/lib/locale";
import { getRequestPath } from "@/lib/request-path";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.name.ur ?? site.name.en,
    template: `%s | ${site.name.ur ?? site.name.en}`,
  },
  description: site.description.ur ?? site.description.en,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10291B",
};

export default async function UrduLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { path, current } = await getRequestPath("ur");

  return (
    <SiteShell locale="ur" current={current} path={path}>
      {children}
    </SiteShell>
  );
}
