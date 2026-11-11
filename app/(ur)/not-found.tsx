import type { Metadata } from "next";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { notFoundMetadata } from "@/lib/page-metadata";

// Next reads metadata from the not-found file for a 404, so this title is what
// the served response shows.
export const metadata: Metadata = notFoundMetadata("ur");

export default function NotFound() {
  return <NotFoundPage locale="ur" />;
}
