import { PolicyPage } from "@/components/site/PolicyPage";
import { plainText, policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies/privacy",
  title: plainText("ur", policyPages.privacy.title),
  description: plainText("ur", policyPages.privacy.lede),
});

export default function Page() {
  return <PolicyPage locale="ur" slug="privacy" />;
}
