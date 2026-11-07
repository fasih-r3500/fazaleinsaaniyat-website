import { ProgrammesPage } from "@/components/site/ProgrammesPage";
import { plainText, programmesPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "programmes",
  title: plainText("ur", programmesPage.title),
  description: plainText("ur", programmesPage.lede),
});

export default function Page() {
  return <ProgrammesPage locale="ur" />;
}
