import { AboutPage } from "@/components/site/AboutPage";
import { aboutPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "about",
  title: aboutPage.title.en,
  description: aboutPage.lede.en,
});

export default function Page() {
  return <AboutPage locale="en" />;
}
