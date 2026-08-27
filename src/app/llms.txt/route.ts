import { NextResponse } from "next/server";
import {
  ACT_PRACTICES,
  DESCRIBING_FILES,
  GUIDE_DATE_LABEL,
  GUIDE_VERSION,
  READ_PRACTICES,
  REACHABLE_PRACTICES,
  type Practice,
} from "@/lib/guide-data";

export const dynamic = "force-static";

function renderPractice(p: Practice): string {
  const tag = p.evidence?.source ? `[${p.evidence.source}] ` : "";
  const detail = p.evidence
    ? `${tag}${p.evidence.text}`
    : p.bestPractice
      ? `Best practice: ${p.bestPractice}`
      : "";
  return `- ${p.name}: ${p.what}${detail ? ` ${detail}` : ""}`;
}

export function GET() {
  const body = `# AgentReady: Make your site readable by AI agents

> AgentReady is a community-driven standard for the agentic web: an open specification of the protocols, standards, and conventions a product should implement to be usable by AI agents, from discovery to completion. It does not promote any specific protocol or vendor, and it does not prescribe how builders should score compliance. The current version is a practical guide based on real agent runs and a controlled experiment, developed by ora.ai and Vercel.

Version: v${GUIDE_VERSION}
Last updated: ${GUIDE_DATE_LABEL}
License: MIT

## How we know

Numbers in this guide are tagged by source. [STUDIES] refers to research from the ora.ai research lab: over 1,000 real agent runs across 25 sites traced turn by turn and a controlled experiment that toggled one feature at a time; the full dataset is public at https://github.com/agentready-org/standard/tree/main/data, with a per-claim breakdown to reproduce every [STUDIES] number. [ORA SCANNER] refers to agent-reachability checks across every scored site. Statements without a tag are recommendations rather than measured findings.

In the studies, two changes caused agents to fail: hiding answers behind JavaScript and blocking access. The guide follows the order in which agents encounter a site: find, read, then act. All recommendations share one prerequisite: the agent must be able to reach the page and find the answer in the returned HTML.

## Be reachable and citable

Agents can cite only pages they can discover and fetch. Pages blocked from crawlers do not appear in search indexes at all.

${REACHABLE_PRACTICES.map(renderPractice).join("\n")}

Publish answers on one canonical, current first-party docs page. Write the crawl policy as one rule for all agents (User-agent: *) instead of an allowlist of named crawlers. Model providers run separate crawlers per job: training crawlers (GPTBot, ClaudeBot), search-index crawlers (OAI-SearchBot, Claude-SearchBot), and user-initiated fetchers (ChatGPT-User, Claude-User). Each obeys its own rule, so you can block training without dropping out of search indexes or agent answers. A more specific group such as "User-agent: GPTBot" overrides the * group, and user-initiated fetchers may not consult robots.txt at all. The dependable reachability test is your server logs: find requests from the published OpenAI and Anthropic crawler IP ranges and confirm they return 200.

## Put the answer where agents read

Agents use the same homepage and docs pages as human visitors. Agent-specific files (llms.txt, markdown mirrors, JSON-LD) help agents find, fetch, and use those same answers. Getting answers into the initial HTML (SSR or prerendering) is the prerequisite for agents that fetch rather than run JavaScript. Links matter: agents rarely found pages or files that were not linked from content they had already reached.

Pages agents read:

${READ_PRACTICES.map(renderPractice).join("\n")}

Files that describe the site. Link each from content agents already visit (footer, <link rel="alternate"> in the head, or a resources section); 86–100% of visits came through links rather than guessed paths [STUDIES]:

${DESCRIBING_FILES.map(renderPractice).join("\n")}

[STUDIES] Agents requested markdown on about 65% of web fetches; when they specified a format, they chose markdown 96% of the time. Format did not determine task success, so ensure the HTML works before adding a .md mirror, then advertise it with <link rel="alternate" type="text/markdown"> or an HTTP Link: header.

Return accurate HTTP status codes: 404 for a missing path (never 200), and 429 with a Retry-After header when throttling.

## Let agents act, not just read

To act, an agent needs an operable interface (API, MCP server, SDK, or CLI) plus authentication it can complete.

${ACT_PRACTICES.map(renderPractice).join("\n")}

## Beyond this guide

The ora scanner covers additional agent-readiness checks through its public methodology, per-check breakdown, and leaderboard. Scan any domain at https://ora.ai, run "npx @ora-ai/ax audit https://example.com" from the CLI, or POST {"url": "example.com"} to https://ora.ai/api/scan.

## Links

- Guide: https://agentready.org/#guide
- Be reachable and citable: https://agentready.org/#reachable
- Put the answer where agents read: https://agentready.org/#read
- Let agents act: https://agentready.org/#act
- GitHub: https://github.com/agentready-org/standard
- Spec source: https://github.com/agentready-org/standard/blob/main/spec/spec.md
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
