import { TransparencyPage } from "@/components/site/TransparencyPage";
import { plainText, transparencyPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "transparency",
  title: plainText("ur", transparencyPage.title),
  description: plainText("ur", transparencyPage.lede),
});

export default function Page() {
  return <TransparencyPage locale="ur" />;
}
