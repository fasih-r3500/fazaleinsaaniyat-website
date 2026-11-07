import { GivePage } from "@/components/site/GivePage";
import { givePage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "give",
  title: givePage.title.en,
  description: givePage.lede.en,
});

export default function Page() {
  return <GivePage locale="en" />;
}
