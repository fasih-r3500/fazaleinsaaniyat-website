import { ContactPage } from "@/components/site/ContactPage";
import { contactPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "contact",
  title: plainText("ur", contactPage.title),
  description: plainText("ur", contactPage.lede),
});

export default function Page() {
  return <ContactPage locale="ur" />;
}
