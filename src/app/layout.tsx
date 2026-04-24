import type { Metadata } from "next";
import { Lora, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://agentready.org"),
  title: "AgentReady // The open standard for agent readiness",
  description:
    "AgentReady is the open, vendor-neutral specification of the protocols, standards, and conventions a product should implement to be usable by AI agents.",
  openGraph: {
    title: "AgentReady // The open standard for agent readiness",
    description:
      "An open specification of the protocols a product implements to be usable by AI agents: MCP, A2A, x402, llms.txt, Web Bot Auth, and more.",
    type: "website",
    url: "https://agentready.org",
    siteName: "AgentReady",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentReady // The open standard for agent readiness",
    description:
      "The open specification of protocols a product implements to be usable by AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              name: "AgentReady",
              headline: "The open standard for agent readiness",
              description:
                "AgentReady is the open, vendor-neutral specification of the protocols, standards, and conventions a product should implement to be usable by AI agents.",
              url: "https://agentready.org",
              inLanguage: "en",
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
