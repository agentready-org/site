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

/** The spec's markdown source of truth. */
export const SPEC_SOURCE_URL =
  "https://github.com/agentready-org/standard/blob/main/spec/spec.md";

/** The public dataset behind every [STUDIES] number. */
export const DATASET_URL =
  "https://github.com/agentready-org/standard/tree/main/data";

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
  /** Key into EVIDENCE for the click-to-expand provenance block. */
  evidenceId?: string;
};

export type EvidenceTable = {
  caption?: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

/**
 * A provenance block from the public dataset backing one [STUDIES]
 * claim: the claim it backs, the measured tables, and the recipe to
 * reproduce the numbers over the published CSVs.
 */
export type EvidenceBlock = {
  title: string;
  backs: string;
  intro?: string;
  tables: readonly EvidenceTable[];
  note?: string;
  reproduce: string;
};

export type Essential = {
  href: string;
  name: string;
  why: string;
};

export type EssentialLayer = {
  id: "find" | "read" | "act";
  href: string;
  label: string;
  note?: string;
  items: readonly Essential[];
};

/**
 * Compact checklist for the homepage TL;DR. Each item jumps to the
 * matching practice (or heading) in the guide. Find and read are the
 * essentials every site needs; act applies when agents should complete
 * a task, not only read — the same split is-agentic.com uses.
 */
export const ESSENTIAL_LAYERS: readonly EssentialLayer[] = [
  {
    id: "find",
    href: "#reachable",
    label: "find",
    items: [
      {
        href: "#first-party-docs",
        name: "Publish first-party docs",
        why: "The page agents ground answers on and name as the source.",
      },
      {
        href: "#robots-txt",
        name: "Allow agents in robots.txt",
        why: "The gate to search indexes. About 1 in 10 scanned sites block AI crawlers entirely.",
      },
      {
        href: "#sitemap-xml",
        name: "List pages in a sitemap.xml",
        why: "Standard for crawlers. Agents fetch it in 4% of runs.",
      },
    ],
  },
  {
    id: "read",
    href: "#read",
    label: "read",
    items: [
      {
        href: "#no-javascript",
        name: "Put the answer in the initial HTML",
        why: "Homepage and docs, server-rendered. A JavaScript-hidden answer was one of two changes that broke an agent.",
      },
      {
        href: "#status-codes",
        name: "Return real HTTP status codes",
        why: "404 for a missing path, never 200. 429 with Retry-After when throttling.",
      },
      {
        href: "#llms-txt",
        name: "Link llms.txt, JSON-LD, and OpenAPI",
        why: "86–100% of those fetches arrived through a link, not a guessed path.",
      },
      {
        href: "#fenced-code",
        name: "Fence and language-tag code",
        why: "When an agent’s answer included code, 61% of the time it lifted lines verbatim.",
      },
    ],
  },
  {
    id: "act",
    href: "#act",
    label: "act",
    note: "if agents should complete a task, not only read",
    items: [
      {
        href: "#auth",
        name: "Auth an agent can finish",
        why: "Self-serve keys or OAuth with discoverable metadata. The first gate of acting.",
      },
      {
        href: "#public-api",
        name: "A public API with OpenAPI",
        why: "Typed operations, errors, and rate limits. The acting surface itself.",
      },
      {
        href: "#mcp-server",
        name: "MCP, SDKs, and a CLI as you ship them",
        why: "Only the surfaces the product actually offers. Do not invent an MCP server to chase a score.",
      },
    ],
  },
];

/** § Be reachable and citable */
export const REACHABLE_PRACTICES: readonly Practice[] = [
  {
    id: "first-party-docs",
    name: "Publish the answer as first-party docs",
    what: "Makes you citable: the page an agent grounds its answer on and names as its source.",
    evidence: {
      source: "STUDIES",
      text: "82% of answers traced back to a page the agent fetched, and that page was a docs page 47% of the time, more than any other page type.",
    },
    evidenceId: "answer-provenance",
  },
  {
    id: "robots-txt",
    name: "Allow agents and crawlers in robots.txt",
    what: "Declares which crawlers may fetch which paths. This is the gate to the search indexes.",
    evidence: {
      source: "ORA SCANNER",
      text: "Across ~50,000 scanned sites, 88% ship a robots.txt, and 80% stay reachable to every major AI crawler. About 1 in 10 block them entirely.",
    },
  },
  {
    id: "sitemap-xml",
    name: "List your pages in a sitemap.xml",
    what: "Maps every page you publish for indexing.",
    evidence: {
      source: "STUDIES",
      text: "Fetched directly in 4% of runs, one of the files real agents touch least. It is still standard for crawlers and search engines.",
    },
    evidenceId: "sitemap-reach",
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
      text: "Reached in 69% of runs, and it was the agent’s first step in 92% of them; in 59% of the runs that reached it, the next hop was a docs page.",
    },
    evidenceId: "homepage-reach",
  },
  {
    id: "docs-pages",
    name: "Docs pages that answer",
    what: "The pages agents actually read, where most tasks get resolved.",
    evidence: {
      source: "STUDIES",
      text: "Reached in 83% of runs and fetched more than any other page type, about 3.4 docs pages per run.",
    },
    evidenceId: "docs-reach",
  },
  {
    id: "no-javascript",
    name: "Fetchable without JavaScript",
    what: "The answer is in the initial HTML, server-rendered or prerendered, rather than injected by a single-page app after load.",
    evidence: {
      source: "STUDIES",
      text: "A JavaScript-hidden answer was one of only two changes that broke an agent. The other was blocking it outright.",
    },
    evidenceId: "fetchability",
  },
  {
    id: "fenced-code",
    name: "Fenced code, language-tagged",
    what: "Turns snippets into examples an agent can lift and use.",
    evidence: {
      source: "STUDIES",
      text: "When an agent’s answer included code, 61% of the time it contained lines taken verbatim from a page it fetched on the site.",
    },
    evidenceId: "code-lift",
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
      text: "Reached via links rather than guesses: 86% of its fetches came from a page that pointed to it. One in three agents that read it went on to fetch a page it lists, and 36% drew their final answer from its content.",
    },
    evidenceId: "llms-txt-behavior",
  },
  {
    id: "well-known",
    name: ".well-known/*",
    what: "Protocol and metadata discovery.",
    evidence: {
      source: "STUDIES",
      text: "Reached in about 23% of runs across the sites tested.",
    },
    evidenceId: "well-known-reach",
  },
  {
    id: "openapi-json",
    name: "openapi.json",
    what: "Machine-readable API contract.",
    evidence: {
      source: "STUDIES",
      text: "On the sites that ship one, used in 21% of runs.",
    },
    evidenceId: "openapi-reach",
  },
  {
    id: "json-ld",
    name: "JSON-LD",
    what: "Machine-readable facts and routes in the page.",
    evidence: {
      text: "Markdown converters may omit script blocks, so repeat critical facts in visible text.",
    },
  },
];

/**
 * Per-claim provenance from the public dataset. Keyed by the
 * `evidenceId` on practices (or referenced directly for prose claims).
 */
export const EVIDENCE: Record<string, EvidenceBlock> = {
  "answer-provenance": {
    title: "Answer provenance",
    backs:
      "82% of answers traced back to a page the agent fetched, and that page was a docs page 47% of the time, more than any other page type.",
    intro: "Across 1,033 runs, where did the agent’s final answer come from?",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Answer traced to a page the agent fetched", "844", "82%"],
          ["Not traceable to any fetched page", "189", "18%"],
        ],
      },
      {
        caption:
          "Of the 844 grounded answers, the page types the wording traced to (top 3):",
        headers: ["Page type", "Runs", "Share"],
        rows: [
          ["Docs page", "394", "47%"],
          ["llms.txt", "120", "14%"],
          ["Other site page", "116", "14%"],
        ],
      },
    ],
    note: "Docs lead every other type; the full 14-way split is in traces.csv.",
    reproduce:
      "Reproduce over traces.csv: grounded = answer_grounded == 1; page type = answer_ground_kind.",
  },
  "sitemap-reach": {
    title: "Sitemap reach",
    backs: "Fetched directly in 4% of runs.",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Fetched sitemap.xml", "43", "4%"],
          ["Did not", "990", "96%"],
        ],
      },
    ],
    reproduce: "Reproduce over traces.csv: sitemap_reached == 1.",
  },
  "homepage-reach": {
    title: "Homepage reach and first hop",
    backs:
      "Reached in 69% of runs, and it was the agent’s first step in 92% of them. In 59% of the runs that reached it, the next hop was a docs page.",
    intro: "The homepage funnel across 1,033 runs:",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Reached the homepage", "708", "69% of 1,033"],
          ["Homepage was the first fetch", "648", "92% of 708"],
          ["Next hop after homepage was a docs page", "416", "59% of 708"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: homepage_reached, homepage_first_turn, next_hop_docs, each rated against homepage_reached == 1.",
  },
  "docs-reach": {
    title: "Docs reach and depth",
    backs:
      "Reached in 83% of runs and fetched more than any other page type, about 3.4 docs pages per run.",
    tables: [
      {
        headers: ["", "Value"],
        rows: [
          ["Runs that reached a docs page", "855 (83% of 1,033)"],
          ["Docs pages fetched, total", "2,870"],
          ["Docs pages per docs-reaching run (mean)", "3.4"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: docs_reached == 1; mean of docs_pages_fetched over those runs.",
  },
  fetchability: {
    title: "Fetchability: what broke an agent",
    backs:
      "A JavaScript-hidden answer was one of only two changes that broke an agent. The other was blocking it outright.",
    intro:
      "One docs site was served under 19 configurations and probed across 5 topics by two clients, a plain non-JavaScript fetch and a JavaScript-executing one (190 probes). Only three configurations failed, and they reduce to two kinds of change:",
    tables: [
      {
        headers: ["Configuration", "plain-fetch", "js-fetch"],
        rows: [
          ["js-only (answer inside a JS payload)", "0/5 fail", "5/5 pass"],
          ["bot-block (403 to agent UAs)", "0/5 fail", "0/5 fail"],
          ["hostile (403 to agent UAs)", "0/5 fail", "0/5 fail"],
          ["the other 16 configurations", "pass", "pass"],
        ],
      },
    ],
    note: "A JavaScript-hidden answer fails only the fetch-only client; blocking (bot-block and hostile) fails both.",
    reproduce:
      "Reproduce over fetchability.csv: success grouped by variant and client.",
  },
  "code-lift": {
    title: "Code lift",
    backs:
      "When an agent’s answer included code, 61% of the time it contained lines taken verbatim from a page it fetched on the site.",
    intro: "Among the 119 runs whose answer contained code:",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Included a line lifted verbatim from a fetched page", "73", "61%"],
          ["Code, but not traceably lifted", "46", "39%"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: among rows where answer_code_matched_fetch is set, share == 1.",
  },
  "discovery-file-linkage": {
    title: "Discovery-file linkage",
    backs:
      "Depending on the file type, 86–100% of visits came through links rather than guessed paths.",
    intro:
      "For each discovery file, the share of fetches that arrived through a link rather than a guessed path:",
    tables: [
      {
        headers: ["File", "Via link", "Fetches"],
        rows: [
          ["AGENTS.md", "100%", "38"],
          ["openapi.json", "97%", "122"],
          [".well-known/*", "93%", "383"],
          ["llms.txt", "86%", "416"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: per file, {file}_linked / {file}_fetches.",
  },
  "llms-txt-behavior": {
    title: "llms.txt behavior",
    backs:
      "86% of its fetches came from a page that pointed to it. One in three agents that read it went on to fetch a page it lists, and 36% drew their final answer from its content.",
    tables: [
      {
        caption: "How agents reached llms.txt (416 fetches):",
        headers: ["", "Fetches", "Share"],
        rows: [
          ["Arrived through a link", "356", "86%"],
          ["Guessed the path", "60", "14%"],
        ],
      },
      {
        caption: "What the 329 runs that read llms.txt did next:",
        headers: ["", "Runs", "Share"],
        rows: [
          ["Fetched a page it lists", "117", "36%"],
          ["Drew the final answer from its content", "120", "36%"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: via-link = llms_txt_linked / llms_txt_fetches; steering = llms_followed_listing over llms_txt_reached == 1; answer-from-llms = answer_ground_kind == 'llms_txt' over llms_txt_reached == 1.",
  },
  "well-known-reach": {
    title: ".well-known reach",
    backs: "Reached in about 23% of runs across the sites tested.",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Reached a .well-known path", "234", "23%"],
          ["Did not", "799", "77%"],
        ],
      },
    ],
    reproduce: "Reproduce over traces.csv: well_known_reached == 1.",
  },
  "openapi-reach": {
    title: "openapi reach",
    backs: "On the sites that ship one, used in 21% of runs.",
    intro: "Restricted to the 7 sites that ship openapi.json (541 runs):",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Fetched openapi.json", "112", "21%"],
          ["Did not", "429", "79%"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: openapi_reached == 1 over site_ships_openapi == 1.",
  },
  "markdown-requests": {
    title: "Markdown requests",
    backs:
      "Agents requested markdown on about 65% of web fetches. When they specified a format, they chose markdown 96% of the time.",
    tables: [
      {
        headers: ["", "Calls", "Share"],
        rows: [
          ["Web fetches requesting markdown", "2,259", "65% of 3,470"],
          ["Of fetches that named any format, markdown", "2,259", "96% of 2,361"],
        ],
      },
    ],
    reproduce:
      "Reproduce over traces.csv: markdown_calls / web_fetch_calls; markdown_calls / format_set_calls.",
  },
};

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
      "Serve over Streamable HTTP at /mcp. Keep the docs MCP public. Gate the product MCP with OAuth (protected-resource metadata at /.well-known/oauth-protected-resource per RFC 9728, with PKCE) and list it in the MCP Registry with a server.json. Server cards for pre-connection discovery are an emerging convention (SEP-2127, a working-group draft that major hosts have begun to support): ship one if your target hosts read it, but expect the exact path to keep moving.",
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
    what: "The forms agents act in: code and shell.",
    bestPractice:
      "Publish SDKs on npm and PyPI and a CLI; show install and first call in the docs.",
  },
];
