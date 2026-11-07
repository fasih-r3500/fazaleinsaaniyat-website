import { AboutPage } from "@/components/site/AboutPage";
import { aboutPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "about",
  title: plainText("ur", aboutPage.title),
  description: plainText("ur", aboutPage.lede),
});

export default function Page() {
  return <AboutPage locale="ur" />;
}
