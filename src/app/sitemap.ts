import type { MetadataRoute } from "next";

const BASE_URL = "https://agentready.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${BASE_URL}/`, lastModified: new Date(), priority: 1.0 }];
}
