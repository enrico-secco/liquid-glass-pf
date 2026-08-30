import type { MetadataRoute } from "next";
import { site } from "@/content/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/memphis`, lastModified: new Date(), priority: 0.8 },
  ];
}
