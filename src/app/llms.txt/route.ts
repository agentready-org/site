import { NextResponse } from "next/server";
import {
  ACT_PRACTICES,
  DESCRIBING_FILES,
  ESSENTIAL_LAYERS,
  GUIDE_DATE_LABEL,
  GUIDE_VERSION,
  READ_PRACTICES,
  REACHABLE_PRACTICES,
  type Practice,
} from "@/lib/guide-data";

export const dynamic = "force-static";

function renderPractice(p: Practice): string {
  const tag = p.evidence?.source ? `[${p.evidence.source}] ` : "";
  const detail = [
    p.bestPractice && `Best practice: ${p.bestPractice}`,
    p.evidence && `${tag}${p.evidence.text}`,
  ]
    .filter(Boolean)
    .join(" ");
  return `- ${p.arId} (${p.strength}) ${p.name}: ${p.what}${detail ? ` ${detail}` : ""}`;
}

export function GET() {
  const body = `# AgentReady: Make your site readable by AI agents

> AgentReady is the open standard for agent readiness: a spec of the protocols, standards, and conventions a product should implement to be found, read, and used by AI agents, from discovery to completion. It does not promote any specific protocol or vendor, and it does not prescribe how scanners should weight or score compliance. Every requirement carries a stable identifier (AR-FIND-01 and so on) and a BCP 14 strength (MUST / SHOULD / MAY) assigned from real agent runs and a controlled experiment. Developed in collaboration with Ora, Vercel, Mintlify, and Auth0.

Version: v${GUIDE_VERSION}
Last updated: ${GUIDE_DATE_LABEL}
License: MIT

## How we know

Numbers in this spec are tagged by source. [STUDIES] refers to research from the ora.ai research lab: over 1,000 real agent runs across 25 sites traced turn by turn and a controlled experiment that toggled one feature at a time; the full dataset is public at https://github.com/agentready-org/standard/tree/main/data, with a per-claim breakdown to reproduce every [STUDIES] number. [ORA SCANNER] refers to agent-reachability checks across every scored site. Statements without a tag are recommendations rather than measured findings.

In the studies, two changes caused agents to fail: hiding answers behind JavaScript and blocking access. The spec follows the order in which agents encounter a site: find, read, then act. Strengths come from measurement: those two changes are MUST, practices that measurably shaped where agents went are SHOULD, emerging conventions are MAY. All recommendations share one prerequisite: the agent must be able to reach the page and find the answer in the returned HTML.

## Essentials

The short version. Find and read are the essentials every site needs. Act applies when agents should complete a task, not only read.

${ESSENTIAL_LAYERS.map(
  (layer) =>
    `### ${layer.label}${layer.note ? ` (${layer.note})` : ""}\n\n${layer.items
      .map((item) => `- ${item.name}: ${item.why}`)
      .join("\n")}`,
).join("\n\n")}

## Check your site

Three public rankers cover different surfaces. None of them is the spec. All three have a free browser score. is-agentic.com is the Vercel × Ora essentials reading for sites whose job is content agents can find and use: scan at https://is-agentic.com or run "npx is-agentic example.com". ora.ai is the full ranker for products agents transact with (API, MCP, payments, leaderboard): scan at https://ora.ai, run "npx ax audit https://example.com", or POST {"url": "example.com"} to https://ora.ai/api/scan. mintlify.com/score is Mintlify's Agent Score for documentation sites (29 checks on the Agent-Friendly Documentation Spec): scan at https://www.mintlify.com/score or run "npx mint score docs.example.com". Docs: https://is-agentic.com/docs, https://ora.ai/docs, and https://www.mintlify.com/blog/agent-score. Scanner checks and weights may change independently of this spec.

## Be reachable and citable

Agents can cite only pages they can discover and fetch. Pages blocked from crawlers do not appear in search indexes at all.

${REACHABLE_PRACTICES.map(renderPractice).join("\n")}

An AI Catalog at /.well-known/ai-catalog.json lists every agent-facing resource (MCP server card, OpenAPI, GraphQL, A2A agent card, docs, llms.txt, skills); link it from the homepage head with <link rel="ai-catalog"> and an HTTP Link header. Agentic Resource Discovery (ARD) registries such as Ora Directory (https://ora.ai/directory) index published catalogs and answer search across them.

Publish answers on one canonical, current first-party docs page. Write the crawl policy as one rule for all agents (User-agent: *) instead of an allowlist of named crawlers. Model providers run separate crawlers per job: training crawlers (GPTBot, ClaudeBot), search-index crawlers (OAI-SearchBot, Claude-SearchBot), and user-initiated fetchers (ChatGPT-User, Claude-User). Each obeys its own rule, so you can block training without dropping out of search indexes or agent answers. A more specific group such as "User-agent: GPTBot" overrides the * group, and user-initiated fetchers may not consult robots.txt at all. The dependable reachability test is your server logs: find requests from the published OpenAI and Anthropic crawler IP ranges and confirm they return 200.

## Put the answer where agents read

Agents use the same homepage and docs pages as human visitors. Agent-specific files (llms.txt, markdown mirrors, JSON-LD) help agents find, fetch, and use those same answers. Getting answers into the initial HTML (SSR or prerendering) is the prerequisite for agents that fetch rather than run JavaScript. Links matter: agents rarely found pages or files that were not linked from content they had already reached.

Pages agents read:

${READ_PRACTICES.map(renderPractice).join("\n")}

Files that describe the site. Link each from content agents already visit (footer, <link rel="alternate"> in the head, or a resources section); 86–100% of visits came through links rather than guessed paths [STUDIES]:

${DESCRIBING_FILES.map(renderPractice).join("\n")}

[STUDIES] Agents requested markdown on about 65% of web fetches; when they specified a format, they chose markdown 96% of the time. Format did not determine task success, so ensure the HTML works before adding a .md mirror, then advertise it with <link rel="alternate" type="text/markdown"> or an HTTP Link: header.

AR-READ-02 (MUST) Return accurate HTTP status codes: 404 for a missing path (never 200), and 429 with a Retry-After header when throttling. AR-READ-09 (MAY) covers the markdown mirror above.

## Let agents act, not just read

To act, an agent needs an operable interface (API, MCP server, WebMCP tools, NLWeb ask endpoint, SDK, or CLI) plus authentication it can complete, and, if the product charges, a way to pay.

${ACT_PRACTICES.map(renderPractice).join("\n")}

## Links

- Essentials: https://agentready.org/#essentials
- Guide: https://agentready.org/#guide
- Be reachable and citable: https://agentready.org/#reachable
- Put the answer where agents read: https://agentready.org/#read
- Let agents act: https://agentready.org/#act
- Check your site: https://agentready.org/#beyond
- is-agentic.com: https://is-agentic.com
- ora.ai: https://ora.ai
- ora docs: https://ora.ai/docs
- Mintlify Agent Score: https://www.mintlify.com/score
- WebMCP draft: https://webmachinelearning.github.io/webmcp/
- GitHub: https://github.com/agentready-org/standard
- Spec source: https://github.com/agentready-org/standard/blob/main/spec/spec.md
- Changelog: https://github.com/agentready-org/standard/blob/main/CHANGELOG.md
- Announcement (March 20, 2026): https://ora.ai/blog/agentready-open-standard
- Dataset: https://github.com/agentready-org/standard/tree/main/data
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
