import { FieldTripsPage } from "@/components/site/FieldTripsPage";
import { fieldTripsPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "field-trips",
  title: fieldTripsPage.title.en,
  description: fieldTripsPage.lede.en,
});

export default function Page() {
  return <FieldTripsPage locale="en" />;
}
