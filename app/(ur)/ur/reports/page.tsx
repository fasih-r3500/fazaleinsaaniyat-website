import { ReportsPage } from "@/components/site/ReportsPage";
import { plainText, reportsPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "ur",
  slug: "reports",
  title: plainText("ur", reportsPage.title),
  description: plainText("ur", reportsPage.lede),
});

export default function Page() {
  return <ReportsPage locale="ur" />;
}
