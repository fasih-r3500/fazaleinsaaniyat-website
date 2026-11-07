import { GetHelpPage } from "@/components/site/GetHelpPage";
import { getHelpPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "get-help",
  title: plainText("ur", getHelpPage.title),
  description: plainText("ur", getHelpPage.lede),
});

export default function Page() {
  return <GetHelpPage locale="ur" />;
}
