import { HomePage } from "@/components/site/HomePage";
import { site } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "",
  title: site.name.ur ?? site.name.en,
  description: site.description.ur ?? site.description.en,
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="ur" />;
}
