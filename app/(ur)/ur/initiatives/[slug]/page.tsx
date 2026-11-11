import { notFound } from "next/navigation";
import { InitiativePage } from "@/components/site/InitiativePage";
import { getInitiativeBySlug, getPublishedInitiatives } from "@/lib/content";
import { notFoundMetadata, pageMetadata } from "@/lib/page-metadata";

type Params = { slug: string };

// Only the initiatives in content/initiatives get a page. Any other slug is a
// 404 rather than a page rendered on demand.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPublishedInitiatives().map((initiative) => ({ slug: initiative.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const initiative = getInitiativeBySlug(slug);
  // An unpublished slug is a 404, so it needs the 404 title as well.
  if (!initiative) return notFoundMetadata("ur");

  return pageMetadata({
    locale: "ur",
    slug: `initiatives/${initiative.slug}`,
    title: initiative.title,
    description: initiative.summary,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const initiative = getInitiativeBySlug(slug);
  if (!initiative) notFound();

  return <InitiativePage locale="ur" initiative={initiative} />;
}
