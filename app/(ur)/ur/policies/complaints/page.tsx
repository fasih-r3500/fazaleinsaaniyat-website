import { PolicyPage } from "@/components/site/PolicyPage";
import { plainText, policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies/complaints",
  title: plainText("ur", policyPages.complaints.title),
  description: plainText("ur", policyPages.complaints.lede),
});

export default function Page() {
  return <PolicyPage locale="ur" slug="complaints" />;
}
