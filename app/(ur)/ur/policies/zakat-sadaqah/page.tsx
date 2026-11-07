import { PolicyPage } from "@/components/site/PolicyPage";
import { plainText, policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies/zakat-sadaqah",
  title: plainText("ur", policyPages["zakat-sadaqah"].title),
  description: plainText("ur", policyPages["zakat-sadaqah"].lede),
});

export default function Page() {
  return <PolicyPage locale="ur" slug="zakat-sadaqah" />;
}
