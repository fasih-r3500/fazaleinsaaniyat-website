import { PolicyPage } from "@/components/site/PolicyPage";
import { policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies/zakat-sadaqah",
  title: policyPages["zakat-sadaqah"].title.en,
  description: policyPages["zakat-sadaqah"].lede.en,
});

export default function Page() {
  return <PolicyPage locale="en" slug="zakat-sadaqah" />;
}
