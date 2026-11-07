import { ContactPage } from "@/components/site/ContactPage";
import { contactPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "contact",
  title: contactPage.title.en,
  description: contactPage.lede.en,
});

export default function Page() {
  return <ContactPage locale="en" />;
}
