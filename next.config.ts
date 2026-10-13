import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  async redirects() {
    return [
      { source: "/private-classes-booking", destination: "https://maddspace.trafft.com", permanent: false },
      { source: "/blog-feed.xml", destination: "/blog", permanent: false },
    ];
  },
};

export default nextConfig;
