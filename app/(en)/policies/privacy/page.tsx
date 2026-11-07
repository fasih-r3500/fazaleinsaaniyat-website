import { PolicyPage } from "@/components/site/PolicyPage";
import { policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies/privacy",
  title: policyPages.privacy.title.en,
  description: policyPages.privacy.lede.en,
});

export default function Page() {
  return <PolicyPage locale="en" slug="privacy" />;
}
