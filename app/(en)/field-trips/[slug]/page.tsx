import { notFound } from "next/navigation";
import { FieldTripPage } from "@/components/site/FieldTripPage";
import { fieldTripPage } from "@/content/copy";
import {
  getFieldTripBySlug,
  getPublishedFieldTrips,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/page-metadata";

// Field trips are rendered at build time from the files in content/field-trips.
// A slug that is not published is not a route, so it falls through to the 404
// page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedFieldTrips().map((fieldTrip) => ({
    slug: fieldTrip.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fieldTrip = getFieldTripBySlug(slug);

  if (!fieldTrip) return {};

  return pageMetadata({
    locale: "en",
    slug: `field-trips/${fieldTrip.slug}`,
    title: fieldTrip.title,
    description: `${fieldTrip.place}, ${formatDate(fieldTrip.date)}. ${fieldTripPage.description.en}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fieldTrip = getFieldTripBySlug(slug);

  if (!fieldTrip) notFound();

  return <FieldTripPage locale="en" fieldTrip={fieldTrip} />;
}
