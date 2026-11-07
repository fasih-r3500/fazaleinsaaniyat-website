import { PolicyPage } from "@/components/site/PolicyPage";
import { policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies/complaints",
  title: policyPages.complaints.title.en,
  description: policyPages.complaints.lede.en,
});

export default function Page() {
  return <PolicyPage locale="en" slug="complaints" />;
}
