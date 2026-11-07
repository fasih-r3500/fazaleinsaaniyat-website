import { MadrasahsPage } from "@/components/site/MadrasahsPage";
import { madrasahsPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "madrasahs",
  title: plainText("ur", madrasahsPage.title),
  description: plainText("ur", madrasahsPage.lede),
});

export default function Page() {
  return <MadrasahsPage locale="ur" />;
}
