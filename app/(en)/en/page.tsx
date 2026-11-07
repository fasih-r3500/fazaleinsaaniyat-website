import { HomePage } from "@/components/site/HomePage";
import { site } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "",
  title: site.name.en,
  description: site.description.en,
  absoluteTitle: true,
  canonical: "/",
});

export default function Page() {
  return <HomePage locale="en" />;
}
