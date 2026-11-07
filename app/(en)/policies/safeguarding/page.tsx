import { PolicyPage } from "@/components/site/PolicyPage";
import { policyPages } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies/safeguarding",
  title: policyPages.safeguarding.title.en,
  description: policyPages.safeguarding.lede.en,
});

export default function Page() {
  return <PolicyPage locale="en" slug="safeguarding" />;
}
