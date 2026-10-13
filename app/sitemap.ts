import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.maddspace.com.sg";
  return Object.keys(seo).map((p) => ({ url: base + (p === "/" ? "" : p), lastModified: new Date(), changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.7 }));
}
