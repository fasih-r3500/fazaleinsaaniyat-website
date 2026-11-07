import { headers } from "next/headers";
import type { Locale } from "./locale";

export type NavKey =
  | "madrasahs"
  | "programmes"
  | "reports"
  | "transparency"
  | "about"
  | "contact";

const navKeys: NavKey[] = [
  "madrasahs",
  "programmes",
  "reports",
  "transparency",
  "about",
  "contact",
];

export type RequestPath = {
  path: string;
  current: NavKey | null;
};

export async function getRequestPath(locale: Locale): Promise<RequestPath> {
  const headerList = await headers();
  const rawPath = headerList.get("x-pathname") ?? "/";
  const pathname = rawPath.split("?")[0] || "/";

  let path = pathname;
  if (locale === "ur") {
    path = path.replace(/^\/ur(?=\/|$)/, "");
  } else {
    path = path.replace(/^\/en(?=\/|$)/, "");
  }

  path = path.replace(/^\/+|\/+$/g, "");
  const first = path.split("/")[0];
  const current = navKeys.includes(first as NavKey) ? (first as NavKey) : null;

  return { path, current };
}
