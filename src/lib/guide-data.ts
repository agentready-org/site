/**
 * AgentReady — "Make your site readable by AI agents".
 *
 * This module is the source of truth for the spec's practice tables.
 * Prose, code samples, and section ordering live in `src/app/page.tsx`;
 * the structured rows below are shared with the `/llms.txt` rendering.
 *
 * Each practice carries the stable identifier (`AR-FIND-01` and so on)
 * and BCP 14 strength (MUST / SHOULD / MAY) from the spec source,
 * `spec/spec.md` in agentready-org/standard. Identifiers are preserved
 * across versions and never reused.
 *
 * Evidence entries are tagged by source:
 *  - STUDIES: research from the ora.ai research lab — more than 250,000
 *    real agent runs, plus a controlled
 *    experiment that toggled one feature at a time, plus later Ora
 *    research reports, which an EvidenceBlock cites through `source`.
 *  - ORA SCANNER: agent-reachability checks across every scored site.
 *
 * Rows without an evidence tag are recommendations rather than measured
 * findings.
 */

export const GUIDE_VERSION = "2.0";
export const GUIDE_DATE = "2026-10-20";
export const GUIDE_DATE_LABEL = "October 2026";
export const GUIDE_FIRST_PUBLISHED = "2026-04-24";

/** The version announced in March 2026 and published as v1.0.0 in April. */
export const ANNOUNCEMENT_URL =
  "https://ora.ai/blog/agentready-open-standard";
export const CHANGELOG_URL =
  "https://github.com/agentready-org/standard/blob/main/CHANGELOG.md";

/** The spec's markdown source of truth. */
export const SPEC_SOURCE_URL =
  "https://github.com/agentready-org/standard/blob/main/spec/spec.md";

/** The public dataset behind the trace and experiment [STUDIES] numbers. */
export const DATASET_URL =
  "https://github.com/agentready-org/standard/tree/main/data";

export type EvidenceSource = "STUDIES" | "ORA SCANNER";

export type Evidence = {
  source?: EvidenceSource;
  text: string;
};

export type Strength = "MUST" | "SHOULD" | "MAY";

export type Practice = {
  id: string;
  /** Stable requirement identifier from the spec source, e.g. AR-FIND-01. */
  arId: string;
  /** BCP 14 normative strength from the spec source. */
  strength: Strength;
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
  /** Where the data lives when it is not in the public dataset yet. */
  source?: { href: string; label: string };
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
        name: "Allow agents in robots.txt and bot protection",
        why: "The gate to search indexes and live fetches. About 1 in 10 scanned sites block AI crawlers entirely, and a bot manager can block agents the file allows.",
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
        href: "#mcp-or-cli",
        name: "An MCP server or a CLI",
        why: "The interface an agent acts through. Ship at least one; without it, an agent cannot finish the task.",
      },
      {
        href: "#webmcp",
        name: "WebMCP on pages agents should act through",
        why: "In-page tools on document.modelContext, in the user's session. Complementary to a server MCP. Do not invent tools to chase a score.",
      },
    ],
  },
];

/** § Be reachable and citable */
export const REACHABLE_PRACTICES: readonly Practice[] = [
  {
    id: "first-party-docs",
    arId: "AR-FIND-02",
    strength: "SHOULD",
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
    arId: "AR-FIND-01",
    strength: "MUST",
    name: "Allow agents in robots.txt and bot protection",
    what: "Declares which crawlers may fetch which paths, and lets verified agents through the bot manager. This is the gate to the search indexes.",
    evidence: {
      source: "ORA SCANNER",
      text: "In the April 2026 report (~50,000 scanned sites), 88% shipped a robots.txt and 80% stayed reachable to every major AI crawler. About 1 in 10 blocked them entirely.",
    },
  },
  {
    id: "sitemap-xml",
    arId: "AR-FIND-03",
    strength: "SHOULD",
    name: "List your pages in a sitemap.xml",
    what: "Maps every page you publish for indexing.",
    evidence: {
      source: "STUDIES",
      text: "Fetched directly in 4% of runs, one of the files real agents touch least. It is still standard for crawlers and search engines.",
    },
    evidenceId: "sitemap-reach",
  },
  {
    id: "ai-catalog",
    arId: "AR-FIND-04",
    strength: "MAY",
    name: "Publish an AI Catalog and link it",
    what: "One manifest at /.well-known/ai-catalog.json listing every agent-facing resource you ship, from MCP server card to llms.txt.",
    evidence: {
      text: "Not measured in the studies. Link it from the homepage head, since 86–100% of discovery-file visits arrive through links. ARD registries such as Ora Directory index published catalogs so agents can search across sites.",
    },
  },
];

/** § Put the answer where agents read — the pages agents visit */
export const READ_PRACTICES: readonly Practice[] = [
  {
    id: "homepage-html",
    arId: "AR-READ-03",
    strength: "SHOULD",
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
    arId: "AR-READ-04",
    strength: "SHOULD",
    name: "Docs pages that answer",
    what: "The pages agents actually read, where most tasks get resolved. Link setup and quickstart pages from the homepage.",
    evidence: {
      source: "STUDIES",
      text: "Reached in 83% of runs and fetched more than any other page type, about 3.4 docs pages per run.",
    },
    evidenceId: "docs-reach",
  },
  {
    id: "pricing-page",
    arId: "AR-READ-11",
    strength: "SHOULD",
    name: "Pricing on a first-party page",
    what: "Plans, free tier, and limits as text in the HTML, not an image, a calculator, or a sales form.",
    evidence: {
      source: "STUDIES",
      text: "Built from the business’s own pages, 60% of pricing answers were accurate, against 37% from elsewhere, the widest gap of any question type.",
    },
    evidenceId: "answers-by-question-type",
  },
  {
    id: "no-javascript",
    arId: "AR-READ-01",
    strength: "MUST",
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
    arId: "AR-READ-05",
    strength: "SHOULD",
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
    arId: "AR-READ-07",
    strength: "SHOULD",
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
    arId: "AR-READ-06",
    strength: "SHOULD",
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
    arId: "AR-ACT-02",
    strength: "SHOULD",
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
    arId: "AR-READ-08",
    strength: "SHOULD",
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
    intro: "Across the traced runs, where did the agent’s final answer come from?",
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
    intro: "The homepage funnel across the traced runs:",
    tables: [
      {
        headers: ["", "Runs", "Share"],
        rows: [
          ["Reached the homepage", "708", "69% of runs"],
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
          ["Runs that reached a docs page", "855 (83% of runs)"],
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
  "off-site-answers": {
    title: "Answers built without the site",
    backs:
      "When an agent could not read the site, it answered anyway, from web search and other people’s pages. Those answers were 3.7× as likely to contain none of the facts the user asked for.",
    intro:
      "37,927 agent journeys across 1,056 business sites. Each agent-ready site was paired with a not-agent-ready one in the same industry, matched on brand fame and citations elsewhere. What the finished answer was built from:",
    tables: [
      {
        headers: ["", "Agent-ready", "Not agent-ready"],
        rows: [
          ["The site’s own pages", "78%", "58%"],
          ["Web search", "12%", "25%"],
          ["Training knowledge", "7%", "10%"],
          ["Answers that clearly recommend the business", "20%", "11%"],
        ],
      },
      {
        caption:
          "Graded fact by fact against each business’s own site (2,499 answers, 131 businesses):",
        headers: ["", "From the site", "From elsewhere"],
        rows: [
          ["Answers with none of the facts asked for", "7%", "25%"],
          ["Pricing answers that were accurate", "60%", "37%"],
        ],
      },
    ],
    note: "In about 99% of journeys that hit a dead end on the site, the agent answered anyway. Not-agent-ready sites blocked agents 2.1× as often, and runs took 23% more turns.",
    reproduce:
      "Ora research, AX is the New AEO (arXiv:2609.34951), September 2026. Four agent stacks on Claude and GPT models; the two GPT stacks searched the web through Tavily. Analysis code and sample data at github.com/ora/research.",
    source: {
      href: "https://ora.ai/blog/ax-is-the-new-aeo",
      label: "read the report",
    },
  },
  "answers-by-question-type": {
    title: "Accuracy by question type",
    backs:
      "Built from the business’s own pages, 60% of pricing answers were accurate, against 37% from elsewhere, the widest gap of any question type.",
    intro:
      "Answers graded fact by fact against each business’s own site, by where the evidence came from:",
    tables: [
      {
        headers: ["Question type", "From the site", "From elsewhere"],
        rows: [
          ["Pricing", "60%", "37%"],
          ["Features", "46%", "39%"],
          ["Setup", "24%", "24%"],
        ],
      },
    ],
    note: "Answers that punted to “contact sales for a quote” were more common when the agent could not read the site (22% against 15%). Setup is a findability problem: two-thirds of setup facts never surfaced, and sites where agents could ground setup answers scored 31% against 18%.",
    reproduce:
      "Ora research, AX is the New AEO (arXiv:2609.34951), September 2026. 2,499 graded answers across 131 businesses. Analysis code and sample data at github.com/ora/research.",
    source: {
      href: "https://ora.ai/blog/ax-is-the-new-aeo",
      label: "read the report",
    },
  },
  "link-checkout": {
    title: "Link checkout",
    backs:
      "Paying through Link, agents got 92.3% of test checkouts right; 18 of 26 agents got at least 90%.",
    intro:
      "26 agents (5 agent apps × 6 models), the same 33 checkout tasks for every setup. Only failures the agents caused are counted:",
    tables: [
      {
        headers: ["Way of paying", "Done right", "Share"],
        rows: [
          ["Link, cloud browser", "733 of 794", "92.3%"],
          ["Saved card, cloud browser", "807 of 844", "95.6%"],
          ["Saved card, local browser", "821 of 850", "96.6%"],
          ["Agent's choice of Link or saved card", "317 of 322", "98.4%"],
        ],
      },
    ],
    note: "The most common Link miss, 27 of the 61 failed runs: the agent asked the person to approve, then stopped.",
    reproduce:
      "Ora research, October 2026. Stripe test mode, fictional stores, no real money. Link is @stripe/link-cli 0.26.0 against a stand-in wallet that approved every request within seconds.",
    source: { href: "https://ora.ai/research", label: "ora research" },
  },
};

/** § Let agents act, not just read */
export const ACT_PRACTICES: readonly Practice[] = [
  {
    id: "auth",
    arId: "AR-ACT-01",
    strength: "SHOULD",
    name: "Auth an agent can get through",
    what: "The first gate of acting.",
    bestPractice:
      "Self-serve key generation, documented scopes. For user-delegated access, OAuth 2.0 with discoverable metadata under /.well-known (RFC 8414, RFC 9728).",
  },
  {
    id: "public-api",
    arId: "AR-ACT-02",
    strength: "SHOULD",
    name: "Public API with a machine-readable contract",
    what: "The acting surface itself.",
    bestPractice:
      "OpenAPI with operation IDs, typed responses and errors, /v1/ versioning, documented rate limits.",
  },
  {
    id: "mcp-or-cli",
    arId: "AR-ACT-10",
    strength: "MUST",
    name: "An MCP server or a CLI",
    what: "The interface an agent acts through. Without one, an agent cannot finish the task.",
    bestPractice:
      "Ship at least one. An MCP server (AR-ACT-03) serves agents working in chat and IDE hosts; a CLI (AR-ACT-06) serves agents working in a shell. Build the one that fits how agents use the product, and do not ship an empty surface to meet the requirement.",
  },
  {
    id: "mcp-server",
    arId: "AR-ACT-03",
    strength: "SHOULD",
    name: "MCP server",
    what: "Standard tool protocol for docs search and actions.",
    bestPractice:
      "Serve over Streamable HTTP at /mcp. Keep the docs MCP public. Gate the product MCP with OAuth (protected-resource metadata at /.well-known/oauth-protected-resource per RFC 9728, with PKCE) and list it in the MCP Registry with a server.json. Server cards for pre-connection discovery (AR-ACT-04, MAY) are an emerging convention (SEP-2127, a working-group draft that major hosts have begun to support): ship one if your target hosts read it, but expect the exact path to keep moving.",
  },
  {
    id: "webmcp",
    arId: "AR-ACT-07",
    strength: "SHOULD",
    name: "WebMCP",
    what: "The same tool contract, registered on the page itself.",
    bestPractice:
      "If the product has a web UI an agent should operate, register tools on document.modelContext. Feature-detect; the API is a W3C Community Group draft. Complementary to a server MCP: these tools run in the live page with the signed-in session. Only ship tools that map to actions the product actually offers.",
  },
  {
    id: "mcp-apps",
    arId: "AR-ACT-05",
    strength: "MAY",
    name: "MCP Apps",
    what: "Your UI, rendered inside the agent host.",
    bestPractice:
      "If your product has a UI, ship a View (a ui:// resource) so the agent can hand a working surface back to the user.",
  },
  {
    id: "nlweb",
    arId: "AR-ACT-09",
    strength: "MAY",
    name: "NLWeb ask endpoint",
    what: "A lighter alternative to a full tool surface for content-heavy sites.",
    bestPractice:
      "Serve /ask, which takes a natural-language question and returns schema.org-shaped results, and expose the same ask tool over MCP. Suits publishers, catalogs, and docs whose value is content rather than operations.",
  },
  {
    id: "sdks-cli",
    arId: "AR-ACT-06",
    strength: "SHOULD",
    name: "SDKs and a CLI",
    what: "The forms agents act in: code and shell.",
    bestPractice:
      "Publish SDKs on npm and PyPI and a CLI; show install and first call in the docs.",
  },
  {
    id: "payments",
    arId: "AR-ACT-08",
    strength: "MAY",
    name: "Let agents pay",
    what: "The last gate of acting. Applies only if the product charges.",
    bestPractice:
      "Per-call pricing: x402 or MPP, so an agent can settle a 402 and retry without an account. Checkout: UCP or ACP, so a shopping agent can complete a purchase. On Stripe, enable Link on checkout and accept Shared Payment Tokens, so an agent holding a Link Agent Wallet pays with a one-time credential the user approved, without filling a card form. Do not put a CAPTCHA wall in front of a verified agent.",
    evidence: {
      source: "STUDIES",
      text: "Paying through Link, agents got 92.3% of test checkouts right; 18 of 26 agents got at least 90%.",
    },
    evidenceId: "link-checkout",
  },
];
