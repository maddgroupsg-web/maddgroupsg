import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/trial/"] }], sitemap: "https://www.maddspace.com.sg/sitemap.xml" };
}
