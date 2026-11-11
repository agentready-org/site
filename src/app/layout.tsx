import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  GUIDE_VERSION,
  GUIDE_DATE,
  GUIDE_FIRST_PUBLISHED,
} from "@/lib/guide-data";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = "https://agentready.org";
const HEADLINE = "The open standard for agent readiness";
const TITLE = `AgentReady // ${HEADLINE}`;
const DESCRIPTION =
  "The open standard for agent readiness: what a site should implement to be found, read, and used by AI agents, grounded in 250,000 real agent runs.";

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
    "WebMCP",
    "A2A",
    "x402",
    "MPP",
    "ACP",
    "UCP",
    "NLWeb",
    "AI Catalog",
    "ARD",
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
    site: "@oradotai",
    creator: "@oradotai",
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
      className={`${newsreader.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var dark=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){document.documentElement.classList.toggle('dark',window.matchMedia('(prefers-color-scheme: dark)').matches);}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "AgentReady",
                  url: SITE_URL,
                  logo: `${SITE_URL}/apple-icon`,
                  sameAs: ["https://github.com/agentready-org"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "AgentReady",
                  url: SITE_URL,
                  inLanguage: "en",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
                {
                  "@type": "TechArticle",
                  "@id": `${SITE_URL}/#article`,
                  name: "AgentReady",
                  headline: HEADLINE,
                  description: DESCRIPTION,
                  url: SITE_URL,
                  mainEntityOfPage: SITE_URL,
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                  image: `${SITE_URL}/opengraph-image`,
                  author: { "@id": `${SITE_URL}/#organization` },
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "en",
                  version: GUIDE_VERSION,
                  datePublished: GUIDE_FIRST_PUBLISHED,
                  dateModified: GUIDE_DATE,
                  license: "https://opensource.org/licenses/MIT",
                  contributor: [
                    { "@type": "Organization", name: "Ora", url: "https://ora.ai" },
                    { "@type": "Organization", name: "Vercel", url: "https://vercel.com" },
                    { "@type": "Organization", name: "Stripe", url: "https://stripe.com" },
                    { "@type": "Organization", name: "Auth0", url: "https://auth0.com" },
                    { "@type": "Organization", name: "Mintlify", url: "https://www.mintlify.com" },
                    { "@type": "Organization", name: "Tavily", url: "https://www.tavily.com" },
                    { "@type": "Organization", name: "Google", url: "https://www.google.com" },
                    { "@type": "Organization", name: "Elementor", url: "https://elementor.com" },
                    { "@type": "Organization", name: "Netlify", url: "https://www.netlify.com" },
                    { "@type": "Organization", name: "Shopify", url: "https://www.shopify.com" },
                    { "@type": "Organization", name: "Wix", url: "https://www.wix.com" },                  ],
                  encoding: [
                    {
                      "@type": "MediaObject",
                      encodingFormat: "text/plain",
                      contentUrl: `${SITE_URL}/llms.txt`,
                    },
                  ],
                  keywords: [
                    "agent readiness",
                    "open standard",
                    "MCP",
                    "WebMCP",
                    "A2A",
                    "x402",
                    "MPP",
                    "ACP",
                    "UCP",
                    "NLWeb",
                    "ARD",
                    "llms.txt",
                    "Web Bot Auth",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
