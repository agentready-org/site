import type { MetadataRoute } from "next";
import { GUIDE_DATE } from "@/lib/guide-data";

const BASE_URL = "https://agentready.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(GUIDE_DATE),
      priority: 1.0,
    },
  ];
}
