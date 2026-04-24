import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "DeepSeekBot", allow: "/" },
      { userAgent: "Qwen-Agent", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ora-agent", allow: "/" },
      { userAgent: "OpenClaw", allow: "/" },
    ],
    sitemap: "https://agentready.org/sitemap.xml",
  };
}
