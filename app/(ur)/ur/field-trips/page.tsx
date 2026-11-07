import { FieldTripsPage } from "@/components/site/FieldTripsPage";
import { fieldTripsPage, plainText } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "field-trips",
  title: plainText("ur", fieldTripsPage.title),
  description: plainText("ur", fieldTripsPage.lede),
});

export default function Page() {
  return <FieldTripsPage locale="ur" />;
}
