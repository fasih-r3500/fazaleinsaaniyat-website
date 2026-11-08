import { InitiativesPage } from "@/components/site/InitiativesPage";
import { initiativesPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "initiatives",
  title: initiativesPage.title.en,
  description: initiativesPage.lede.en,
});

export default function Page() {
  return <InitiativesPage locale="en" />;
}
