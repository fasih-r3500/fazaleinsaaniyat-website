import { PolicyPage } from "@/components/site/PolicyPage";
import { plainText, policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies/terms",
  title: plainText("ur", policyPages.terms.title),
  description: plainText("ur", policyPages.terms.lede),
});

export default function Page() {
  return <PolicyPage locale="ur" slug="terms" />;
}
