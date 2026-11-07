import { ReportsPage } from "@/components/site/ReportsPage";
import { reportsPage } from "@/content/copy";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  locale: "en",
  slug: "reports",
  title: reportsPage.title.en,
  description: reportsPage.lede.en,
});

export default function Page() {
  return <ReportsPage locale="en" />;
}
