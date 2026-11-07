import { GetHelpPage } from "@/components/site/GetHelpPage";
import { getHelpPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "get-help",
  title: getHelpPage.title.en,
  description: getHelpPage.lede.en,
});

export default function Page() {
  return <GetHelpPage locale="en" />;
}
