/**
 * AgentReady v1.
 *
 * AgentReady names the published protocols, standards, and conventions a
 * product should implement to be usable by AI agents. Every entry below
 * references a public specification. No entry encodes a score, threshold,
 * or implementation-specific measurement.
 *
 * Entries tagged `emerging` are actively evolving or pre-RFC. Implementations
 * should treat them as forward-looking.
 */

export type SpecEntry = {
  id: string;
  name: string;
  summary: string;
  reference?: string;
  referenceUrl?: string;
  emerging?: boolean;
};

export type SpecSection = {
  id: string;
  name: string;
  summary: string;
  entries: readonly SpecEntry[];
};

export const SECTIONS: readonly SpecSection[] = [
  {
    id: "discoverability",
    name: "Discoverability",
    summary:
      "Help agents find the product and the files they need to read.",
    entries: [
      {
        id: "robots-txt",
        name: "robots.txt with AI policy",
        summary:
          "Declare which AI crawlers are allowed. A robots.txt that distinguishes GPTBot, ClaudeBot, Google-Extended, and other identified agents from broad training crawlers gives agents a clear signal about intent.",
        reference: "RFC 9309",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9309.html",
      },
      {
        id: "sitemap",
        name: "Sitemap",
        summary:
          "A /sitemap.xml lets agents list the site's main URLs without crawling every page.",
        reference: "sitemaps.org",
        referenceUrl: "https://www.sitemaps.org/protocol.html",
      },
      {
        id: "llms-txt",
        name: "llms.txt",
        summary:
          "A markdown index at the site root that summarizes the product and links to the documents agents should read first.",
        reference: "llmstxt.org",
        referenceUrl: "https://llmstxt.org",
      },
      {
        id: "llms-full-txt",
        name: "llms-full.txt",
        summary:
          "A single-file, ingestible version of the product documentation that fits into an agent context window in one request.",
        reference: "llmstxt.org",
        referenceUrl: "https://llmstxt.org",
      },
      {
        id: "http-link-header",
        name: "HTTP Link response header",
        summary:
          "Link headers with rel=sitemap, describedby, api-catalog, or alternate surface related resources to agents without parsing HTML.",
        reference: "RFC 8288",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc8288.html",
      },
      {
        id: "nlweb-schema-feeds",
        name: "NLWeb schema feeds",
        summary:
          "A schemamap directive in robots.txt pointing to a structured feed that describes site content in schema.org vocabulary for natural-language retrieval.",
        reference: "nlweb.ai",
        referenceUrl: "https://nlweb.ai",
        emerging: true,
      },
    ],
  },
  {
    id: "content",
    name: "Content for agents",
    summary:
      "Expose content in a form models can parse without running JavaScript.",
    entries: [
      {
        id: "json-ld",
        name: "JSON-LD structured data",
        summary:
          "Embed schema.org types such as Product, Organization, Offer, SoftwareApplication, and FAQPage as JSON-LD so models can read entity and product facts directly.",
        reference: "schema.org",
        referenceUrl: "https://schema.org/docs/gs.html",
      },
      {
        id: "markdown-negotiation",
        name: "Markdown content negotiation",
        summary:
          "Respond to Accept: text/markdown with a markdown representation of the page, giving agents a cleaner and more token-efficient view of the same content.",
        emerging: true,
      },
      {
        id: "index-md",
        name: "/index.md fallback",
        summary:
          "A markdown version of the homepage served at /index.md, so the primary product page is directly fetchable as plain text.",
        emerging: true,
      },
      {
        id: "speakable",
        name: "Speakable content markup",
        summary:
          "Mark portions of a page as suitable to be read aloud by voice agents using schema.org/SpeakableSpecification.",
        reference: "schema.org",
        referenceUrl: "https://schema.org/SpeakableSpecification",
      },
    ],
  },
  {
    id: "capabilities",
    name: "Capabilities",
    summary:
      "Declare what the product can do for agents and how to call it.",
    entries: [
      {
        id: "mcp",
        name: "Model Context Protocol (MCP)",
        summary:
          "An open JSON-RPC protocol for exposing tools, resources, and prompts to agents over Streamable HTTP or stdio.",
        reference: "modelcontextprotocol.io",
        referenceUrl: "https://modelcontextprotocol.io",
      },
      {
        id: "mcp-server-card",
        name: "MCP Server Card",
        summary:
          "A /.well-known/mcp/server-card.json document describing a server's name, version, URL, and tool surface for pre-connection discovery.",
        reference: "modelcontextprotocol.io",
        referenceUrl: "https://modelcontextprotocol.io",
        emerging: true,
      },
      {
        id: "mcp-apps",
        name: "MCP Apps",
        summary:
          "The MCP extension for ui:// resources, letting servers return renderable HTML for user confirmation, payment, or generative-UI handoffs.",
        reference: "modelcontextprotocol.io",
        referenceUrl: "https://modelcontextprotocol.io",
        emerging: true,
      },
      {
        id: "a2a-agent-card",
        name: "A2A Agent Card",
        summary:
          "A /.well-known/agent-card.json descriptor used for agent-to-agent discovery under the A2A protocol.",
        reference: "a2aprotocol.ai",
        referenceUrl: "https://a2aprotocol.ai",
        emerging: true,
      },
      {
        id: "webmcp",
        name: "WebMCP",
        summary:
          "HTML-native MCP: tool metadata declared on forms and elements so browsers and in-page agents can invoke page actions as MCP tools.",
        emerging: true,
      },
      {
        id: "nlweb-ask",
        name: "NLWeb /ask endpoint",
        summary:
          "A natural-language query endpoint that returns structured schema.org responses, designed to make any site conversational.",
        reference: "nlweb.ai",
        referenceUrl: "https://nlweb.ai",
        emerging: true,
      },
      {
        id: "agent-skills",
        name: "Agent Skills",
        summary:
          "A /.well-known/agent-skills/index.json manifest describing discrete agent-invokable skills a site offers.",
        reference: "agentskills.io",
        referenceUrl: "https://agentskills.io",
        emerging: true,
      },
      {
        id: "openapi",
        name: "OpenAPI",
        summary:
          "A machine-readable description of HTTP APIs. Function-calling agents use OpenAPI to understand paths, parameters, schemas, and errors.",
        reference: "openapis.org",
        referenceUrl: "https://spec.openapis.org/oas/latest.html",
      },
      {
        id: "ai-plugin-json",
        name: "ai-plugin.json",
        summary:
          "A /.well-known/ai-plugin.json manifest originally introduced for ChatGPT plugins and still used as a lightweight capability descriptor.",
        emerging: true,
      },
    ],
  },
  {
    id: "identity-access",
    name: "Identity & Access",
    summary:
      "Prove who the agent is and give it scoped, revocable access.",
    entries: [
      {
        id: "web-bot-auth",
        name: "Web Bot Auth",
        summary:
          "HTTP message signatures over agent requests, with a /.well-known/http-message-signatures-directory publishing the public keys an agent operator will sign with.",
        reference: "RFC 9421",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9421.html",
      },
      {
        id: "oauth",
        name: "OAuth 2.0",
        summary:
          "The foundation for delegated, scoped access. Publish authorization and token endpoints agents can discover.",
        reference: "RFC 6749",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc6749.html",
      },
      {
        id: "oauth-as-metadata",
        name: "OAuth Authorization Server Metadata",
        summary:
          "A /.well-known/oauth-authorization-server or /.well-known/openid-configuration document exposing issuer, endpoints, and supported scopes.",
        reference: "RFC 8414",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc8414.html",
      },
      {
        id: "oauth-protected-resource",
        name: "OAuth Protected Resource",
        summary:
          "A /.well-known/oauth-protected-resource document declaring which authorization servers a resource trusts, plus supported scopes and bearer methods.",
        reference: "RFC 9728",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9728.html",
      },
      {
        id: "pkce",
        name: "PKCE",
        summary:
          "Proof Key for Code Exchange with S256, the secure pattern for native and agent OAuth flows that cannot hold a client secret.",
        reference: "RFC 7636",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc7636.html",
      },
      {
        id: "api-catalog",
        name: "API Catalog",
        summary:
          "A /.well-known/api-catalog linkset describing a site's public APIs and pointing agents to OpenAPI, AsyncAPI, or other descriptors.",
        reference: "RFC 9727",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9727.html",
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    summary:
      "Let agents pay, initiate checkouts, and complete purchases on behalf of their users.",
    entries: [
      {
        id: "x402",
        name: "x402",
        summary:
          "An HTTP-native payment protocol built on the 402 Payment Required status code for inline stablecoin settlement of API calls.",
        reference: "x402.org",
        referenceUrl: "https://www.x402.org",
      },
      {
        id: "acp",
        name: "Agentic Commerce Protocol (ACP)",
        summary:
          "OpenAPI-backed checkout sessions at /checkout_sessions that let agents drive standard e-commerce flows end to end.",
        emerging: true,
      },
      {
        id: "acp-delegate-payment",
        name: "ACP Delegate Payment",
        summary:
          "A companion flow at /agentic_commerce/delegate_payment for shared payment tokens, letting an agent pay on a user's behalf with a constrained token.",
        emerging: true,
      },
      {
        id: "ucp",
        name: "Universal Commerce Protocol (UCP)",
        summary:
          "A /.well-known/ucp profile declaring how an origin supports agent-driven commerce, with versioned capability declarations.",
        emerging: true,
      },
      {
        id: "mpp",
        name: "Machine Payment Protocol (MPP)",
        summary:
          "An OpenAPI extension (x-payment-info) and 402-based flow using WWW-Authenticate: Payment headers for API-level monetization.",
        emerging: true,
      },
    ],
  },
];

export const SPEC_VERSION = "1.0.0";
export const SPEC_DATE = "2026-04-24";
