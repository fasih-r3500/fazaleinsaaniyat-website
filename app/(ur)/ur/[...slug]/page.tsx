import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notFoundMetadata } from "@/lib/page-metadata";

// Every real page has its own route. This catch-all only sees an address that
// does not exist, so it answers with a real 404 instead of a placeholder page.
export const metadata: Metadata = notFoundMetadata("ur");

export default function Page() {
  notFound();
}
