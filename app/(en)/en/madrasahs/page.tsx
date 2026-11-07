import { MadrasahsPage } from "@/components/site/MadrasahsPage";
import { madrasahsPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "madrasahs",
  title: madrasahsPage.title.en,
  description: madrasahsPage.lede.en,
  canonical: "/madrasahs",
});

export default function Page() {
  return <MadrasahsPage locale="en" />;
}
