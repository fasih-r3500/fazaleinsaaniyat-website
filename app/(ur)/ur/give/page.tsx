import { GivePage } from "@/components/site/GivePage";
import { givePage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "give",
  title: plainText("ur", givePage.title),
  description: plainText("ur", givePage.lede),
});

export default function Page() {
  return <GivePage locale="ur" />;
}
