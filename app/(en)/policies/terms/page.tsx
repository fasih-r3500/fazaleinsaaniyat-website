import { PolicyPage } from "@/components/site/PolicyPage";
import { policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies/terms",
  title: policyPages.terms.title.en,
  description: policyPages.terms.lede.en,
});

export default function Page() {
  return <PolicyPage locale="en" slug="terms" />;
}
