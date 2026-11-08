import type { NextConfig } from "next";
import { assertContentValid } from "./lib/content";

// Field trips, initiatives and the ledger are plain files in content/. Validate
// them when the config loads so a malformed file stops `next build` (and
// `next dev`) with a message naming the file and field, instead of rendering a
// broken page.
assertContentValid();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // The section was called Reports before it became Field Trips. Keep every old
  // address working so a shared link or a search result does not 404.
  async redirects() {
    return [
      {
        source: "/reports",
        destination: "/field-trips",
        permanent: true,
      },
      {
        source: "/reports/:slug*",
        destination: "/field-trips/:slug*",
        permanent: true,
      },
      {
        source: "/ur/reports",
        destination: "/ur/field-trips",
        permanent: true,
      },
      {
        source: "/ur/reports/:slug*",
        destination: "/ur/field-trips/:slug*",
        permanent: true,
      },
      // The section used to be called Our work and lived at /programmes. Keep
      // old links working with a permanent redirect in both language trees.
      {
        source: "/programmes",
        destination: "/initiatives",
        permanent: true,
      },
      {
        source: "/ur/programmes",
        destination: "/ur/initiatives",
        permanent: true,
      },
    ];
  },
  // Content is read from the filesystem, which the bundler cannot trace on its
  // own. Ship the source files with the server output so a server render can
  // read them on the host as well as at build time.
  outputFileTracingIncludes: {
    "/*": [
      "./content/initiatives/**/*.md",
      "./content/field-trips/**/*.md",
      "./content/facts/**/*.json",
      "./content/social/**/*.json",
    ],
  },
};

export default nextConfig;
