import { notFound } from "next/navigation";

// Every real page has its own route. This catch-all only sees an address that
// does not exist, so it answers with a real 404 instead of a placeholder page.
export default function Page() {
  notFound();
}
