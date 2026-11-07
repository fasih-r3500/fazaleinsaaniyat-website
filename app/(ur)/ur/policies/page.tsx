import { PoliciesPage } from "@/components/site/PoliciesPage";
import { plainText, policiesIndex } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "policies",
  title: plainText("ur", policiesIndex.title),
  description: plainText("ur", policiesIndex.lede),
});

export default function Page() {
  return <PoliciesPage locale="ur" />;
}
