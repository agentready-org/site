import type { Metadata } from "next";
import { Lora, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GUIDE_VERSION, GUIDE_DATE } from "@/lib/guide-data";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = "https://agentready.org";
const TITLE = "AgentReady // The open standard for agent readiness";
const DESCRIPTION =
  "AgentReady is a community-driven standard for the agentic web: a practical guide to making your site readable by AI agents, based on real agent runs. Developed by ora.ai and Vercel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s // AgentReady",
  },
  description: DESCRIPTION,
  applicationName: "AgentReady",
  authors: [{ name: "AgentReady contributors" }],
  creator: "AgentReady",
  publisher: "AgentReady",
  keywords: [
    "agent readiness",
    "open standard",
    "agentic web",
    "AI agents",
    "MCP",
    "Model Context Protocol",
    "A2A",
    "x402",
    "ACP",
    "UCP",
    "llms.txt",
    "Web Bot Auth",
    "OAuth",
    "OpenAPI",
    "schema.org",
    "robots.txt",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "AgentReady",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@agentready",
    creator: "@agentready",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              name: "AgentReady",
              headline: "Make your site readable by AI agents",
              description:
                "A practical guide to making your website work for the agents that now read it, based on real agent runs and a controlled experiment. Developed by ora.ai and Vercel.",
              url: "https://agentready.org",
              inLanguage: "en",
              version: GUIDE_VERSION,
              datePublished: GUIDE_DATE,
              license: "https://opensource.org/licenses/MIT",
              contributor: [
                { "@type": "Organization", name: "ora.ai" },
                { "@type": "Organization", name: "Vercel" },
              ],
              encoding: [
                {
                  "@type": "MediaObject",
                  encodingFormat: "text/plain",
                  contentUrl: "https://agentready.org/llms.txt",
                },
              ],
              keywords: [
                "agent readiness",
                "open standard",
                "MCP",
                "A2A",
                "x402",
                "ACP",
                "UCP",
                "llms.txt",
                "Web Bot Auth",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
