import type { NextConfig } from "next";
import { assertContentValid } from "./lib/content";

// Reports and the ledger are plain files in content/. Validate them when the
// config loads so a malformed file stops `next build` (and `next dev`) with a
// message naming the file and field, instead of rendering a broken page.
assertContentValid();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // Content is read from the filesystem, which the bundler cannot trace on its
  // own. Ship the source files with the server output so a server render can
  // read them on the host as well as at build time.
  outputFileTracingIncludes: {
    "/*": ["./content/reports/**/*.md", "./content/facts/**/*.json"],
  },
};

export default nextConfig;
