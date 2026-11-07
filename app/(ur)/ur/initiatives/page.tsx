import { InitiativesPage } from "@/components/site/InitiativesPage";
import { initiativesPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "initiatives",
  title: plainText("ur", initiativesPage.title),
  description: plainText("ur", initiativesPage.lede),
});

export default function Page() {
  return <InitiativesPage locale="ur" />;
}
