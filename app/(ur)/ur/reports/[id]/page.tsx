import { notFound } from "next/navigation";
import { ReportPage } from "@/components/site/ReportPage";
import { getPublishedReports, getReportBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/page-metadata";

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
    locale: "ur",
    slug: `reports/${report.slug}`,
    title: report.title,
    description: `${report.place}, ${formatDate(report.date)}.`,
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

  return <ReportPage locale="ur" report={report} />;
}
