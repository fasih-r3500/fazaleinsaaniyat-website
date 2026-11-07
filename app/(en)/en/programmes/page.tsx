import { ProgrammesPage } from "@/components/site/ProgrammesPage";
import { programmesPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "programmes",
  title: programmesPage.title.en,
  description: programmesPage.lede.en,
  canonical: "/programmes",
});

export default function Page() {
  return <ProgrammesPage locale="en" />;
}
