import { PoliciesPage } from "@/components/site/PoliciesPage";
import { policiesIndex } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "policies",
  title: policiesIndex.title.en,
  description: policiesIndex.lede.en,
});

export default function Page() {
  return <PoliciesPage locale="en" />;
}
