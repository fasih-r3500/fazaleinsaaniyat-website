import { notFound } from "next/navigation";
import { ReportPage } from "@/components/site/ReportPage";
import { reportPage } from "@/content/copy";
import { getPublishedReports, getReportBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/page-metadata";

// Reports are rendered at build time from the files in content/reports. A slug
// that is not published is not a route, so it falls through to the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedReports().map((report) => ({ id: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReportBySlug(id);

  if (!report) return {};

  return pageMetadata({
    locale: "en",
    slug: `reports/${report.slug}`,
    title: report.title,
    description: `${report.place}, ${formatDate(report.date)}. ${reportPage.description.en}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReportBySlug(id);

  if (!report) notFound();

  return <ReportPage locale="en" report={report} />;
}
