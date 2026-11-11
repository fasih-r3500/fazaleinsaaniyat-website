import { notFound } from "next/navigation";
import { FieldTripPage } from "@/components/site/FieldTripPage";
import { fieldTripPage, plainText } from "@/content/copy";
import {
  getFieldTripBySlug,
  getPublishedFieldTrips,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { notFoundMetadata, pageMetadata } from "@/lib/page-metadata";

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

  // An unpublished slug is a 404, so it needs the 404 title as well.
  if (!fieldTrip) return notFoundMetadata("ur");

  return pageMetadata({
    locale: "ur",
    slug: `field-trips/${fieldTrip.slug}`,
    title: fieldTrip.title,
    description: `${fieldTrip.place}, ${formatDate(fieldTrip.date)}. ${plainText("ur", fieldTripPage.description)}`,
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

  return <FieldTripPage locale="ur" fieldTrip={fieldTrip} />;
}
