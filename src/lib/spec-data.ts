/**
 * AgentReady.
 *
 * AgentReady names the published protocols, standards, and conventions a
 * product should implement to be usable by AI agents. Every requirement
 * below references a public specification. No requirement encodes a
 * score, threshold, or implementation-specific measurement.
 *
 * Each requirement carries two qualifiers:
 *
 *  - `applies`: "baseline" means every agent-addressable product
 *    implements the requirement. A string value is a condition; the
 *    requirement applies only when the product exposes the described
 *    surface.
 *
 *  - `strength`: MUST / SHOULD / MAY, per BCP 14 (RFC 2119, RFC 8174). The
 *    keywords apply within the requirement's scope of applicability. A
 *    conditional MUST requirement only binds products that fall within
 *    its condition.
 *
 * Every requirement also carries a stable identifier (`stableId`, e.g.
 * `AR-DISC-01`) that is preserved across spec revisions. Requirements
 * tagged `emerging` are actively evolving or pre-RFC; implementations
 * should treat them as forward-looking.
 */

export type SpecApplicability = "baseline" | string;

export type SpecStrength = "MUST" | "SHOULD" | "MAY";

export type SpecRequirement = {
  id: string;
  stableId: string;
  name: string;
  summary: string;
  applies: SpecApplicability;
  strength: SpecStrength;
  reference?: string;
  referenceUrl?: string;
  emerging?: boolean;
};

export type SpecSection = {
  id: string;
  name: string;
  summary: string;
  requirements: readonly SpecRequirement[];
};

export const SECTIONS: readonly SpecSection[] = [
  {
    id: "discoverability",
    name: "Discoverability",
    summary:
      "Help agents find the product and the files they need to read.",
    requirements: [
      {
        id: "robots-txt",
        stableId: "AR-DISC-01",
        name: "robots.txt with AI policy",
        summary:
          "Declare which AI crawlers are allowed. A robots.txt that distinguishes GPTBot, ClaudeBot, Google-Extended, PerplexityBot, and other identified agents from broad training crawlers gives agents a clear signal about intent.",
        applies: "baseline",
        strength: "MUST",
        reference: "RFC 9309",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9309.html",
      },
      {
        id: "sitemap",
        stableId: "AR-DISC-02",
        name: "Sitemap",
        summary:
          "A /sitemap.xml lets agents list the site's main URLs without crawling every page.",
        applies: "baseline",
        strength: "SHOULD",
        reference: "sitemaps.org",
        referenceUrl: "https://www.sitemaps.org/protocol.html",
      },
      {
        id: "llms-txt",
        stableId: "AR-DISC-03",
        name: "llms.txt",
        summary:
          "A markdown index at the site root that summarizes the product and links to the documents agents should read first.",
        applies: "baseline",
        strength: "SHOULD",
        reference: "llmstxt.org",
        referenceUrl: "https://llmstxt.org",
      },
      {
        id: "llms-full-txt",
        stableId: "AR-DISC-04",
        name: "llms-full.txt",
        summary:
          "A single-file, ingestible version of the product documentation that fits into an agent context window in one request.",
        applies: "baseline",
        strength: "MAY",
        reference: "llmstxt.org",
        referenceUrl: "https://llmstxt.org",
      },
      {
        id: "http-link-header",
        stableId: "AR-DISC-05",
        name: "HTTP Link response header",
        summary:
          "Link headers with rel=sitemap, describedby, api-catalog, or alternate surface related resources to agents without parsing HTML.",
        applies: "baseline",
        strength: "MAY",
        reference: "RFC 8288",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc8288.html",
      },
      {
        id: "nlweb-schema-feeds",
        stableId: "AR-DISC-06",
        name: "NLWeb schema feeds",
        summary:
          "A schemamap directive in robots.txt pointing to a structured feed that describes site content in schema.org vocabulary for natural-language retrieval.",
        applies: "Products that offer search or natural-language retrieval",
        strength: "MAY",
        reference: "nlweb.ai",
        referenceUrl: "https://nlweb.ai/docs/specification",
        emerging: true,
      },
    ],
  },
  {
    id: "content",
    name: "Content for agents",
    summary:
      "Expose content in a form models can parse without running JavaScript.",
    requirements: [
      {
        id: "json-ld",
        stableId: "AR-CONT-01",
        name: "JSON-LD structured data",
        summary:
          "Embed schema.org types such as Product, Organization, Offer, SoftwareApplication, and FAQPage as JSON-LD so models can read entity and product facts directly.",
        applies: "baseline",
        strength: "SHOULD",
        reference: "schema.org",
        referenceUrl: "https://schema.org/docs/gs.html",
      },
      {
        id: "markdown-negotiation",
        stableId: "AR-CONT-02",
        name: "Markdown content negotiation",
        summary:
          "Respond to Accept: text/markdown with a markdown representation of the page, giving agents a cleaner and more token-efficient view of the same content.",
        applies: "baseline",
        strength: "MAY",
        emerging: true,
      },
      {
        id: "index-md",
        stableId: "AR-CONT-03",
        name: "/index.md fallback",
        summary:
          "A markdown version of the homepage served at /index.md, so the primary product page is directly fetchable as plain text.",
        applies: "baseline",
        strength: "MAY",
        emerging: true,
      },
      {
        id: "speakable",
        stableId: "AR-CONT-04",
        name: "Speakable content markup",
        summary:
          "Mark portions of a page as suitable to be read aloud by voice agents using schema.org/SpeakableSpecification.",
        applies: "Products with content meant to be consumed by voice agents",
        strength: "MAY",
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
    requirements: [
      {
        id: "mcp",
        stableId: "AR-CAPA-01",
        name: "Model Context Protocol (MCP)",
        summary:
          "An open JSON-RPC protocol for exposing tools, resources, and prompts to agents over Streamable HTTP or stdio.",
        applies: "Products that expose tools or resources to agents",
        strength: "MUST",
        reference: "modelcontextprotocol.io",
        referenceUrl: "https://modelcontextprotocol.io",
      },
      {
        id: "mcp-server-card",
        stableId: "AR-CAPA-02",
        name: "MCP Server Card",
        summary:
          "A /.well-known/mcp/server-card.json document describing a server's name, version, transport, capabilities, authentication, and tool surface for pre-connection discovery.",
        applies: "Products that expose an MCP server over HTTP",
        strength: "SHOULD",
        reference: "SEP-2127",
        referenceUrl:
          "https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127",
        emerging: true,
      },
      {
        id: "mcp-apps",
        stableId: "AR-CAPA-03",
        name: "MCP Apps",
        summary:
          "The MCP extension for ui:// resources (io.modelcontextprotocol/ui), letting servers return renderable HTML that hosts can embed in sandboxed iframes for confirmation, payment, or generative-UI handoffs.",
        applies: "MCP servers that return renderable UI",
        strength: "MAY",
        reference: "modelcontextprotocol/ext-apps",
        referenceUrl:
          "https://github.com/modelcontextprotocol/ext-apps",
      },
      {
        id: "a2a-agent-card",
        stableId: "AR-CAPA-04",
        name: "A2A Agent Card",
        summary:
          "A /.well-known/agent-card.json descriptor used for agent-to-agent discovery under the A2A protocol. The Agent Card declares identity, service endpoints, supported interfaces, skills, and security schemes.",
        applies: "Products that expose an agent-to-agent surface",
        strength: "MUST",
        reference: "A2A v1.0",
        referenceUrl: "https://a2a-protocol.org/latest/specification",
      },
      {
        id: "webmcp",
        stableId: "AR-CAPA-05",
        name: "WebMCP",
        summary:
          "A browser API (navigator.modelContext) and HTML-native tool metadata that let pages expose actions as MCP-style tools to in-page agents.",
        applies: "Products whose pages expose in-page actions to agents",
        strength: "MAY",
        reference: "W3C WICG",
        referenceUrl: "https://webmachinelearning.github.io/webmcp/",
        emerging: true,
      },
      {
        id: "nlweb-ask",
        stableId: "AR-CAPA-06",
        name: "NLWeb /ask endpoint",
        summary:
          "A natural-language query endpoint that returns structured schema.org responses, designed to make any site conversational. NLWeb instances also act as MCP servers.",
        applies: "Products that offer natural-language retrieval",
        strength: "MAY",
        reference: "nlweb.ai",
        referenceUrl: "https://nlweb.ai/docs/specification",
        emerging: true,
      },
      {
        id: "agent-skills",
        stableId: "AR-CAPA-07",
        name: "Agent Skills",
        summary:
          "SKILL.md files packaging discrete, portable agent capabilities as YAML frontmatter plus markdown instructions, with optional scripts, references, and assets.",
        applies: "Products that ship agent-invokable skills",
        strength: "MAY",
        reference: "agentskills.io",
        referenceUrl: "https://agentskills.io/specification",
      },
      {
        id: "openapi",
        stableId: "AR-CAPA-08",
        name: "OpenAPI",
        summary:
          "A machine-readable description of HTTP APIs. Function-calling agents use OpenAPI to understand paths, parameters, schemas, and errors.",
        applies: "Products that expose an HTTP API",
        strength: "MUST",
        reference: "OpenAPI 3.1",
        referenceUrl: "https://spec.openapis.org/oas/latest.html",
      },
      {
        id: "ai-plugin-json",
        stableId: "AR-CAPA-09",
        name: "ai-plugin.json",
        summary:
          "A /.well-known/ai-plugin.json manifest originally introduced for ChatGPT plugins and still used as a lightweight capability descriptor.",
        applies: "Products that expose a plugin-style capability",
        strength: "MAY",
        emerging: true,
      },
    ],
  },
  {
    id: "identity-access",
    name: "Identity & Access",
    summary:
      "Prove who the agent is and give it scoped, revocable access.",
    requirements: [
      {
        id: "web-bot-auth",
        stableId: "AR-IDEN-01",
        name: "Web Bot Auth",
        summary:
          "HTTP message signatures over agent requests, with a /.well-known/http-message-signatures-directory publishing the public keys an agent operator signs with. Servers verify signatures to distinguish identified agents from unattributed traffic.",
        applies: "baseline",
        strength: "SHOULD",
        reference: "draft-meunier-web-bot-auth / RFC 9421",
        referenceUrl:
          "https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture",
        emerging: true,
      },
      {
        id: "oauth",
        stableId: "AR-IDEN-02",
        name: "OAuth 2.0",
        summary:
          "The foundation for delegated, scoped access. Publish authorization and token endpoints agents can discover.",
        applies: "Products with user-owned resources or delegated access",
        strength: "MUST",
        reference: "RFC 6749",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc6749.html",
      },
      {
        id: "oauth-as-metadata",
        stableId: "AR-IDEN-03",
        name: "OAuth Authorization Server Metadata",
        summary:
          "A /.well-known/oauth-authorization-server or /.well-known/openid-configuration document exposing issuer, endpoints, and supported scopes.",
        applies: "Products that run an OAuth authorization server",
        strength: "MUST",
        reference: "RFC 8414",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc8414.html",
      },
      {
        id: "oauth-protected-resource",
        stableId: "AR-IDEN-04",
        name: "OAuth Protected Resource",
        summary:
          "A /.well-known/oauth-protected-resource document declaring which authorization servers a resource trusts, plus supported scopes and bearer methods.",
        applies: "Products that expose OAuth-protected resources",
        strength: "SHOULD",
        reference: "RFC 9728",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9728.html",
      },
      {
        id: "pkce",
        stableId: "AR-IDEN-05",
        name: "PKCE",
        summary:
          "Proof Key for Code Exchange with S256. The secure pattern for native and agent OAuth flows that cannot hold a client secret.",
        applies: "Products that accept public or agent OAuth clients",
        strength: "MUST",
        reference: "RFC 7636",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc7636.html",
      },
      {
        id: "api-catalog",
        stableId: "AR-IDEN-06",
        name: "API Catalog",
        summary:
          "A /.well-known/api-catalog linkset describing a site's public APIs and pointing agents to OpenAPI, AsyncAPI, or other descriptors.",
        applies: "Products that expose one or more public APIs",
        strength: "MAY",
        reference: "RFC 9727",
        referenceUrl: "https://www.rfc-editor.org/rfc/rfc9727.html",
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    summary:
      "Let agents pay, initiate checkouts, and complete purchases on behalf of their users. The requirements in this section are alternative, interoperating approaches; a conformant commerce product implements at least one.",
    requirements: [
      {
        id: "x402",
        stableId: "AR-COMM-01",
        name: "x402",
        summary:
          "An HTTP-native payment protocol built on the 402 Payment Required status code for inline stablecoin settlement of API calls.",
        applies: "Products that charge for API calls or resources",
        strength: "MAY",
        reference: "x402.org",
        referenceUrl: "https://www.x402.org",
      },
      {
        id: "acp",
        stableId: "AR-COMM-02",
        name: "Agentic Commerce Protocol (ACP)",
        summary:
          "OpenAPI-backed checkout sessions that let agents drive standard e-commerce flows end to end. Maintained by OpenAI and Stripe, used by ChatGPT Instant Checkout.",
        applies: "Products that accept agent-driven checkout",
        strength: "MAY",
        reference: "agentic-commerce-protocol",
        referenceUrl:
          "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol",
        emerging: true,
      },
      {
        id: "acp-delegate-payment",
        stableId: "AR-COMM-03",
        name: "ACP Delegate Payment",
        summary:
          "A companion flow for shared payment tokens, letting an agent pay on a user's behalf with a short-lived, cart-scoped token.",
        applies: "Payment providers that issue delegated tokens to agents",
        strength: "MAY",
        reference: "agentic-commerce-protocol",
        referenceUrl:
          "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol",
        emerging: true,
      },
      {
        id: "ucp",
        stableId: "AR-COMM-04",
        name: "Universal Commerce Protocol (UCP)",
        summary:
          "A /.well-known/ucp profile declaring services, capabilities, and payment handlers, plus an agent profile URL for two-sided capability negotiation. Co-developed by Shopify and Google.",
        applies: "Products that expose agent-driven commerce",
        strength: "MAY",
        reference: "ucp.dev",
        referenceUrl: "https://ucp.dev",
        emerging: true,
      },
      {
        id: "mpp",
        stableId: "AR-COMM-05",
        name: "Machine Payments Protocol (MPP)",
        summary:
          "An HTTP 402 + Payment authentication scheme with an OpenAPI x-payment-info extension for per-call API monetization. Submitted to the IETF as draft-httpauth-payment.",
        applies: "Products that monetize APIs at the call level",
        strength: "MAY",
        reference: "mpp.dev",
        referenceUrl: "https://mpp.dev",
        emerging: true,
      },
    ],
  },
];

export const SPEC_VERSION = "1.0.0";
export const SPEC_DATE = "2026-04-24";

const STRENGTH_ORDER: Record<SpecStrength, number> = {
  MUST: 0,
  SHOULD: 1,
  MAY: 2,
};

/**
 * Returns a section's requirements sorted by normative strength
 * (MUST → SHOULD → MAY), preserving authored order within each group.
 * Use this for any human- or machine-facing rendering.
 */
export function sortedRequirements(
  section: SpecSection,
): readonly SpecRequirement[] {
  return [...section.requirements].sort((a, b) => {
    const d = STRENGTH_ORDER[a.strength] - STRENGTH_ORDER[b.strength];
    if (d !== 0) return d;
    return section.requirements.indexOf(a) - section.requirements.indexOf(b);
  });
}

/**
 * Totals derived at build time. These are descriptive, not prescriptive:
 * the count of requirements does not imply a score or threshold.
 */
export const TOTAL_REQUIREMENTS = SECTIONS.reduce(
  (n, s) => n + s.requirements.length,
  0
);
