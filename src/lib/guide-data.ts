/**
 * AgentReady — "Make your site readable by AI agents".
 *
 * This module is the source of truth for the guide's practice tables.
 * Prose, code samples, and section ordering live in `src/app/page.tsx`;
 * the structured rows below are shared with the `/llms.txt` rendering.
 *
 * Evidence entries are tagged by source:
 *  - STUDIES: research from the ora.ai research lab — over 1,000 real
 *    agent runs across 25 sites traced turn by turn, plus a controlled
 *    experiment that toggled one feature at a time.
 *  - ORA SCANNER: agent-reachability checks across every scored site.
 *
 * Rows without an evidence tag are recommendations rather than measured
 * findings.
 */

export const GUIDE_VERSION = "1.0";
export const GUIDE_DATE = "2026-08";
export const GUIDE_DATE_LABEL = "August 2026";

export type EvidenceSource = "STUDIES" | "ORA SCANNER";

export type Evidence = {
  source?: EvidenceSource;
  text: string;
};

export type Practice = {
  id: string;
  name: string;
  what: string;
  evidence?: Evidence;
  bestPractice?: string;
};

/** § Be reachable and citable */
export const REACHABLE_PRACTICES: readonly Practice[] = [
  {
    id: "first-party-docs",
    name: "Publish the answer as first-party docs",
    what: "Makes you citable: the page an agent grounds its answer on and names as its source.",
    evidence: {
      source: "STUDIES",
      text: "82% of answers traced back to a page the agent fetched — and that page was a docs page 47% of the time, more than any other page type.",
    },
  },
  {
    id: "robots-txt",
    name: "Allow agents and crawlers in robots.txt",
    what: "Declares which crawlers may fetch which paths — the gate to the search indexes.",
    evidence: {
      source: "ORA SCANNER",
      text: "Established agents reached 81–90% of sites.",
    },
  },
  {
    id: "sitemap-xml",
    name: "List your pages in a sitemap.xml",
    what: "Maps every page you publish for indexing.",
    evidence: {
      source: "STUDIES",
      text: "Fetched directly in 4% of runs — one of the files real agents touch least, yet still standard for crawlers and search engines.",
    },
  },
];

/** § Put the answer where agents read — the pages agents visit */
export const READ_PRACTICES: readonly Practice[] = [
  {
    id: "homepage-html",
    name: "Homepage in raw HTML",
    what: "The front door, with real links to docs, product, and pricing.",
    evidence: {
      source: "STUDIES",
      text: "Reached in 69% of runs, and it was the agent’s first step in 92% of them; in 59% of those runs the next hop was a docs page.",
    },
  },
  {
    id: "docs-pages",
    name: "Docs pages that answer",
    what: "The surface agents actually read — where most tasks get resolved.",
    evidence: {
      source: "STUDIES",
      text: "Reached in 83% of runs and fetched more than any other page type — about 3.4 docs pages per run.",
    },
  },
  {
    id: "no-javascript",
    name: "Fetchable without JavaScript",
    what: "The answer is in the initial HTML — server-rendered or prerendered, not injected by a single-page app after load.",
    evidence: {
      source: "STUDIES",
      text: "A JavaScript-hidden answer was one of only two changes that broke an agent. The other was blocking it outright.",
    },
  },
  {
    id: "fenced-code",
    name: "Fenced code, language-tagged",
    what: "Turns snippets into examples an agent can lift and use.",
    evidence: {
      source: "STUDIES",
      text: "When an agent’s answer included code, 61% of the time it contained lines taken verbatim from a page it fetched on the site.",
    },
  },
];

/** § Put the answer where agents read — the files that describe the site */
export const DESCRIBING_FILES: readonly Practice[] = [
  {
    id: "llms-txt",
    name: "llms.txt",
    what: "A curated, described index of your key pages.",
    evidence: {
      source: "STUDIES",
      text: "Reached via links, not guesses — 86% of its fetches came from a page that pointed to it. One in three agents that read it went on to fetch a page it lists, and 36% drew their final answer from its content.",
    },
  },
  {
    id: "well-known",
    name: ".well-known/*",
    what: "Protocol and metadata discovery.",
    evidence: {
      source: "STUDIES",
      text: "Reached in about 23% of runs across the sites tested.",
    },
  },
  {
    id: "openapi-json",
    name: "openapi.json",
    what: "Machine-readable API contract.",
    evidence: {
      source: "STUDIES",
      text: "On the sites that ship one, used in 21% of runs.",
    },
  },
  {
    id: "agents-md",
    name: "AGENTS.md / SKILLS.md",
    what: "Install, auth, and usage in liftable blocks.",
    evidence: {
      source: "STUDIES",
      text: "An emerging convention — few sites ship one yet. Where a site does and links it, we see agents reach for it.",
    },
  },
  {
    id: "json-ld",
    name: "JSON-LD",
    what: "Machine-readable facts and routes in the page.",
    evidence: {
      source: "STUDIES",
      text: "Agents can parse facts straight from the block. Markdown converters may omit script blocks, so repeat critical facts in visible text.",
    },
  },
];

/** § Let agents act, not just read */
export const ACT_PRACTICES: readonly Practice[] = [
  {
    id: "auth",
    name: "Auth an agent can get through",
    what: "The first gate of acting.",
    bestPractice:
      "Self-serve key generation, documented scopes. For user-delegated access, OAuth 2.0 with discoverable metadata under /.well-known (RFC 8414, RFC 9728).",
  },
  {
    id: "public-api",
    name: "Public API with a machine-readable contract",
    what: "The acting surface itself.",
    bestPractice:
      "OpenAPI with operation IDs, typed responses and errors, /v1/ versioning, documented rate limits.",
  },
  {
    id: "mcp-server",
    name: "MCP server",
    what: "Standard tool protocol for docs search and actions.",
    bestPractice:
      "Serve over Streamable HTTP at /mcp. Keep the docs MCP public; gate the product MCP with OAuth — protected-resource metadata at /.well-known/oauth-protected-resource (RFC 9728), with PKCE — and list it in the MCP Registry with a server.json. Server cards for pre-connection discovery are an emerging convention (SEP-2127, a working-group draft that major hosts have begun to support): ship one if your target hosts read it, but expect the exact path to keep moving.",
  },
  {
    id: "mcp-apps",
    name: "MCP Apps",
    what: "Your UI, rendered inside the agent host.",
    bestPractice:
      "If your product has a UI, ship an app view (ui:// resource) so the agent can hand a working surface back to the user.",
  },
  {
    id: "sdks-cli",
    name: "SDKs and a CLI",
    what: "The forms agents act in — code and shell.",
    bestPractice:
      "Publish SDKs on npm and PyPI and a CLI; show install and first call in the docs.",
  },
];
