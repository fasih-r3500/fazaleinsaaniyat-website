import { PolicyPage } from "@/components/site/PolicyPage";
import { plainText, policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies/safeguarding",
  title: plainText("ur", policyPages.safeguarding.title),
  description: plainText("ur", policyPages.safeguarding.lede),
});

export default function Page() {
  return <PolicyPage locale="ur" slug="safeguarding" />;
}
