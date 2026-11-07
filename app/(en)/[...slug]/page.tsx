import { NotFoundPage } from "@/components/site/NotFoundPage";
import { notFound } from "@/content/copy";

export const metadata = {
  title: notFound.title.en,
};

export default function Page() {
  return <NotFoundPage locale="en" />;
}
