import { TransparencyPage } from "@/components/site/TransparencyPage";
import { transparencyPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "transparency",
  title: transparencyPage.title.en,
  description: transparencyPage.lede.en,
});

export default function Page() {
  return <TransparencyPage locale="en" />;
}
