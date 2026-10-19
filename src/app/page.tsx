import type { ReactNode } from "react";
import {
  ACT_PRACTICES,
  ANNOUNCEMENT_URL,
  CHANGELOG_URL,
  DATASET_URL,
  DESCRIBING_FILES,
  GUIDE_DATE_LABEL,
  GUIDE_VERSION,
  READ_PRACTICES,
  REACHABLE_PRACTICES,
  SPEC_SOURCE_URL,
} from "@/lib/guide-data";
import {
  PracticeTable,
  ProseEvidence,
  SourceTag,
} from "@/components/evidence";
import { Partners } from "@/components/partners";
import { Cliff, Scoreboard, SplitStat } from "@/components/charts";
import { Essentials } from "@/components/essentials";

const ROBOTS_TXT_SNIPPET = `# Apply the default policy to current and future agents.
User-agent: *
# Block low-value public paths only. Do not list secret paths.
Disallow: /search/

Sitemap: https://example.com/sitemap.xml`;

const CURL_SNIPPET = `curl -iL -A 'Claude-User/1.0' https://example.com/your-page`;

const LLMS_TXT_SNIPPET = `# Acme
> Acme ships a payments API for developers.

## Docs
- [Quickstart](https://example.com/docs/quickstart): first charge in one request
- [Authentication](https://example.com/docs/auth): API keys, scopes, rotation

## API
- [OpenAPI](https://example.com/openapi.json): full request and response contract`;

const MARKDOWN_ALTERNATE_SNIPPET = `<!-- A mirror nothing points to is a file nothing fetches. -->
<link rel="alternate" type="text/markdown" href="/docs/quickstart.md">`;

const AI_CATALOG_SNIPPET = `<!-- In the homepage head, and as an HTTP Link header from the CDN. -->
<link rel="ai-catalog" href="/.well-known/ai-catalog.json">`;

const SCAN_IS_AGENTIC_SNIPPET = `npx is-agentic example.com`;
const SCAN_CLI_SNIPPET = `npx ax audit https://example.com`;
const SCAN_MINTLIFY_SNIPPET = `npx mint score docs.example.com`;

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <section className="pt-12 sm:pt-16 pb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
          The open standard for agent readiness
        </h1>
        <Partners />
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          Agents are a new class of user. Many protocols now serve them
          (MCP, WebMCP, A2A, x402, llms.txt, Web Bot Auth, and more), but there is
          no shared definition of what it means to be ready for them.
          AgentReady is an open specification of what a product should
          implement to be usable by AI agents, from discovery to completion.
          It does not promote a protocol or a vendor. The practices below
          are based on measured agent behavior, and are revised as that
          behavior changes.
        </p>
        <Scoreboard />
      </section>

      <section
        id="essentials"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § essentials
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
          The short version
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-8 max-w-2xl">
          Two changes broke an agent: hiding the answer behind JavaScript,
          and blocking access. Everything else is find, then read, then
          act. Find and read are the essentials every site needs. Act
          applies when the product should complete a task, not only be
          readable, and then an agent needs an MCP server or a CLI to act
          through.
        </p>
        <Essentials />
      </section>

      <section
        id="guide"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § the guide
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
          Make your site readable by AI agents
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Together with the{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora.ai
          </a>{" "}
          research lab we learned from more than 250,000 real agent runs
          and a controlled experiment. The sections below follow the order agents encounter
          a site: find, then read, then act. Each practice carries its
          stable identifier from the{" "}
          <a
            href={SPEC_SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            spec source
          </a>{" "}
          (AR-FIND-01 and so on) and its strength: MUST for what an agent
          fails without (the changes that broke an agent in the studies,
          and an interface to act through when it should finish a task),
          SHOULD for practices that measurably shaped where agents went or
          make acting reliable, MAY for emerging conventions.
        </p>
        <p className="font-serif text-sm text-foreground/70 leading-relaxed max-w-2xl">
          <span className="font-mono text-[13px] tracking-widest text-muted-foreground/55 mr-2">
            how we know
          </span>
          <SourceTag>STUDIES</SourceTag>
          is ora.ai research: the traced runs and experiment, plus the
          reports linked from each evidence block;{" "}
          <a
            href={DATASET_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            the dataset is public
          </a>
          . <SourceTag>ORA SCANNER</SourceTag>
          is live reachability across every scored site. Untagged statements
          are recommendations.
        </p>
      </section>

      <section
        id="reachable"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § find
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          Be reachable and citable
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-6 max-w-2xl">
          Agents can cite only pages they can discover and fetch. They may
          receive or recall a URL, follow a link, or find a page through a
          crawl-built search index. Pages blocked from crawlers do not
          appear in those indexes at all. Blocking can also stop an agent
          from fetching a page while answering a user. Publish the answer
          on one canonical, current first-party docs page, and write the
          crawl policy as one rule for all agents instead of an allowlist
          of named crawlers.
        </p>
        <p className="font-serif text-base text-foreground/80 leading-relaxed mb-4 max-w-2xl">
          <SourceTag>STUDIES</SourceTag> When an agent cannot read your
          site, it answers anyway, from web search and other people’s
          pages. Across 1,056 business sites, those answers were 3.7× as
          likely to contain none of the facts the user asked for, and
          agent-ready businesses were clearly recommended 1.9× as often.
        </p>
        <ProseEvidence evidenceId="off-site-answers" />
        <div className="mb-6" />

        <PracticeTable
          practices={REACHABLE_PRACTICES}
          lastHeader="what the runs show"
          className="mb-8"
        />

        <CodeBlock label="robots.txt" code={ROBOTS_TXT_SNIPPET} />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-6 max-w-2xl">
          Bot protection is the second gate, and robots.txt does not
          control it. A WAF or bot manager that answers agents with a{" "}
          <Mono>403</Mono> or a challenge page blocks them however
          permissive the file is. Let verified agents through by the
          providers&apos; published IP ranges or Web Bot Auth signatures,
          and throttle with a <Mono>429</Mono> instead of a challenge. In
          the study above, sites that were not agent-ready blocked agents
          2.1× as often.
        </p>

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          An AI Catalog is the one place an agent can learn what you ship
          for it: a JSON manifest at{" "}
          <Mono>/.well-known/ai-catalog.json</Mono> whose entries point to
          your MCP server card, OpenAPI, GraphQL schema, A2A agent card,
          docs, llms.txt, and skills, each typed by media type. Agentic
          Resource Discovery (ARD) is the registry layer on top: a registry
          such as{" "}
          <a
            href="https://ora.ai/directory"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            Ora Directory
          </a>{" "}
          indexes published catalogs and answers search across them.
          Publish the catalog, then link it from the homepage head, since
          files nothing points to are files nothing fetches.
        </p>
        <CodeBlock label="index.html" code={AI_CATALOG_SNIPPET} />

        <Fold label="crawler jobs and how to test">
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            The wildcard still leaves you one deliberate choice. The model
            providers run a separate crawler for each job:
          </p>
          <ul className="mb-4 max-w-2xl space-y-1.5">
            {[
              ["Training crawlers", "GPTBot, ClaudeBot"],
              ["Search-index crawlers", "OAI-SearchBot, Claude-SearchBot"],
              ["User-initiated fetchers", "ChatGPT-User, Claude-User"],
            ].map(([kind, bots]) => (
              <li
                key={kind}
                className="font-serif text-base text-foreground/85 leading-relaxed pl-5 relative before:content-['·'] before:absolute before:left-1 before:text-muted-foreground/60"
              >
                {kind}{" "}
                <span className="font-mono text-[15px] text-foreground/70">
                  ({bots})
                </span>
              </li>
            ))}
          </ul>
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            Each obeys its own robots.txt rule, so you can block a training
            crawler and opt out of training without dropping out of search
            indexes or agent answers. Two catches: a more specific group such
            as <Mono>User-agent: GPTBot</Mono> overrides your <Mono>*</Mono>{" "}
            group, so audit existing rules; and user-initiated fetchers may
            not consult robots.txt at all.
          </p>
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            Agents also find pages through agent search APIs such as the
            Brave Search API, Exa, Parallel, and Tavily, which run their
            own crawlers and indexes. The wildcard rule covers them;
            an allowlist of named crawlers does not.
          </p>
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            Then fetch a page with an agent user-agent string to inspect the
            response:
          </p>
          <CodeBlock label="Terminal" code={CURL_SNIPPET} />
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            The request should end with a <Mono>200</Mono> response;
            intermediate <Mono>301</Mono> or <Mono>308</Mono> redirects are
            acceptable. The returned HTML should contain the answer. A{" "}
            <Mono>403</Mono>, empty app shell, or JavaScript-only answer
            prevents fetch-only agents from reading the page.
          </p>
          <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
            The curl does not prove much either way: bot blockers weigh
            where a request comes from more than its user-agent string, so
            your laptop may pass where the real agent is blocked, or the
            reverse. The dependable test is your server logs. OpenAI and
            Anthropic publish their crawlers’ IP ranges (separate per-bot
            lists from OpenAI, one combined list from Anthropic). Find those
            requests and confirm they return <Mono>200</Mono>.
          </p>
        </Fold>
      </section>

      <section
        id="read"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § read
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          Put the answer where agents read
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-6 max-w-2xl">
          After reaching a page, an agent has to extract the answer from
          the returned content. In the studies they used the same homepage
          and docs as human visitors. Agent-specific files help only if
          those pages point to them. If the site is client-rendered, the
          answer has to be in the initial HTML. That is the prerequisite.
          Content negotiation, .md endpoints, and agent detection did not
          change whether agents succeeded.
        </p>

        <Cliff />
        <PracticeTable
          practices={READ_PRACTICES}
          lastHeader="what the runs show"
          className="mb-10"
        />

        <p className="font-serif text-base text-foreground/80 leading-relaxed mb-4 max-w-2xl">
          <SourceTag>STUDIES</SourceTag> Agents typically opened these
          resources after visiting the homepage. Depending on the file
          type, 86–100% of visits came through links rather than guessed
          paths. Link each resource from content agents already visited,
          such as the footer, page metadata like{" "}
          <Mono>&lt;link rel=&quot;alternate&quot;&gt;</Mono> in the head,
          or a resources section.
        </p>
        <ProseEvidence evidenceId="discovery-file-linkage" />
        <div className="mb-4" />
        <PracticeTable
          practices={DESCRIBING_FILES}
          firstHeader="file"
          lastHeader="what the runs show"
          className="mb-8"
        />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Inject JSON-LD at strategic places, starting with the homepage,
          so an agent fetching the raw HTML gets your key facts and routes
          in one machine-readable block.
        </p>

        <div
          id="status-codes"
          className="scroll-mt-20 mb-4 max-w-2xl"
        >
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground/55 mr-2">
              AR-READ-02 · MUST
            </span>
            Return <Mono>404</Mono> for a missing path or a valid redirect
            to a replacement. Do not return <Mono>200</Mono> for a missing
            page, even if the body suggests alternatives; agents cannot
            distinguish that response from a live page. In one observed
            case, a single-page app returned <Mono>200</Mono> for every
            path, making dead URLs appear valid.
          </p>
          <p className="font-serif text-base text-foreground/85 leading-relaxed">
            The same applies when you throttle: answer with a{" "}
            <Mono>429</Mono> and a <Mono>Retry-After</Mono> header (RFC
            6585) rather than a silent challenge page. Agents and crawlers
            treat <Mono>429</Mono> as a back-off signal and will return.
          </p>
        </div>

        <Fold label="llms.txt shape and markdown mirrors">
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            When shipping an llms.txt, make it a lean, described index:
          </p>
          <CodeBlock label="llms.txt" code={LLMS_TXT_SNIPPET} />
          <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground/55 mr-2">
              AR-READ-09 · MAY
            </span>
            <SourceTag>STUDIES</SourceTag> Agents requested markdown on
            about 65% of web fetches. When they specified a format, they
            chose markdown 96% of the time. Format did not determine task
            success in the studies, so ensure the HTML works before adding
            a .md mirror.
          </p>
          <ProseEvidence evidenceId="markdown-requests" />
          <CodeBlock
            label="docs/quickstart.html"
            code={MARKDOWN_ALTERNATE_SNIPPET}
          />
          <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
            The same relation can also be sent as an HTTP{" "}
            <Mono>Link:</Mono> header, so a CDN can advertise the mirror
            without touching page heads.
          </p>
        </Fold>
      </section>

      <section
        id="act"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § act
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          Let agents act, not just read
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-2 max-w-2xl">
          Reading documentation does not let an agent complete a task. To
          act, it needs an API, MCP server, WebMCP tools, SDK, or CLI, plus
          authentication it can finish, and, if the product charges, a way
          to pay. The last step happens only if the first two did.
        </p>
        <SplitStat />
        <PracticeTable
          practices={ACT_PRACTICES}
          lastHeader="best practice"
        />
      </section>

      <section
        id="beyond"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § check your site
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-3 leading-tight">
          Check your site
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-5 max-w-2xl">
          Three public rankers score the site itself, each on a different
          surface, and one report shows how you rank when agents search
          your market. None of them is the spec. The rankers have a free
          browser score; the report runs on a free Tavily API key.
        </p>

        <div className="max-w-2xl mb-4 divide-y divide-border/50 border-y border-border/50">
          <ScanCard
            href="https://is-agentic.com"
            name="is-agentic.com"
            kicker="essentials"
            body="Vercel × Ora, for sites whose job is content. Essentials carry the score; capability checks sit in a recommended tier."
          />
          <ScanCard
            href="https://ora.ai"
            name="ora.ai"
            kicker="full ranker"
            body="The population ranker for products agents transact with: 100+ checks, per-layer breakdown, and a leaderboard."
          />
          <ScanCard
            href="https://www.mintlify.com/score"
            name="mintlify.com/score"
            kicker="docs"
            body="Mintlify's Agent Score for documentation sites. 29 checks on the Agent-Friendly Documentation Spec."
          />
          <ScanCard
            href="https://avr.tavily.com"
            name="avr.tavily.com"
            kicker="visibility"
            body="Tavily's report on who agents find when they search your market."
          />
        </div>

        <Fold label="CLI">
          <CodeBlock label="is-agentic.com" code={SCAN_IS_AGENTIC_SNIPPET} />
          <CodeBlock label="ora.ai" code={SCAN_CLI_SNIPPET} />
          <CodeBlock label="mintlify.com/score" code={SCAN_MINTLIFY_SNIPPET} />
        </Fold>

        <p className="font-serif text-sm text-foreground/70 leading-relaxed max-w-2xl mt-5">
          Methodology:{" "}
          <a
            href="https://is-agentic.com/docs"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            is-agentic.com/docs
          </a>
          ,{" "}
          <a
            href="https://ora.ai/docs"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora.ai/docs
          </a>
          , and{" "}
          <a
            href="https://www.mintlify.com/blog/agent-score"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            Mintlify Agent Score
          </a>
          . Scanner checks and weights may change independently of this
          spec.
        </p>
      </section>

      <section
        id="references"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § references
        </p>
        <ul className="max-w-2xl space-y-2">
          {[
            {
              title: "What agents actually reach",
              href: "https://ora.ai/blog/what-agents-actually-reach",
              blurb:
                "the field report behind the trace numbers in this guide, drawing on part of the data used for this spec.",
            },
            {
              title: "AX is the New AEO",
              href: "https://ora.ai/blog/ax-is-the-new-aeo",
              blurb:
                "the study of 1,056 business sites behind the find-section numbers, with web search through Tavily.",
            },
            {
              title: "The state of agent readiness",
              href: "https://ora.ai/blog/state-of-agent-readiness-2026",
              blurb: "the scanner report behind the reachability figure.",
            },
            {
              title: "WebMCP",
              href: "https://webmachinelearning.github.io/webmcp/",
              blurb:
                "the W3C Community Group draft for in-page MCP tools on document.modelContext.",
            },
            {
              title: "is-agentic.com",
              href: "https://is-agentic.com",
              blurb:
                "the Vercel × Ora scanner for site essentials, powered by the same engine as the Ora ranker.",
            },
            {
              title: "Mintlify Agent Score",
              href: "https://www.mintlify.com/score",
              blurb:
                "the docs ranker: 29 checks on the Agent-Friendly Documentation Spec.",
            },
            {
              title: "ora research",
              href: "https://ora.ai",
              blurb: "the ongoing research program behind the standard.",
            },
            {
              title: "The agent readiness dataset",
              href: DATASET_URL,
              blurb:
                "the runs and probes behind the trace and experiment [STUDIES] numbers, with a per-claim breakdown to reproduce them.",
            },
          ].map(({ title, href, blurb }) => (
            <li
              key={title}
              className="font-serif text-base text-foreground/85 leading-relaxed pl-5 relative before:content-['·'] before:absolute before:left-1 before:text-muted-foreground/60"
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-border decoration-2 underline-offset-4 hover:text-foreground/70"
              >
                {title}
              </a>
              : {blurb}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="changelog"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § changelog
        </p>
        <ul className="max-w-2xl space-y-3">
          <li className="font-mono text-[15px] text-foreground/80 tracking-wide">
            v{GUIDE_VERSION} · {GUIDE_DATE_LABEL}
            <span className="block mt-1 font-serif text-sm text-foreground/70 leading-relaxed tracking-normal">
              Restructured into find / read / act with AR-FIND, AR-READ,
              and AR-ACT identifiers, strengths assigned from the studies,
              and every figure tagged by source. The earlier identifiers
              and /spec.json are retired.
            </span>
          </li>
          <li className="font-mono text-[15px] text-foreground/80 tracking-wide">
            v1.0.0 · April 2026
            <span className="block mt-1 font-serif text-sm text-foreground/70 leading-relaxed tracking-normal">
              First published version, announced March 20, 2026 in{" "}
              <a
                href={ANNOUNCEMENT_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
              >
                Introducing AgentReady
              </a>
              : five topic sections, AR-DISC / AR-CONT / AR-CAPA / AR-IDEN /
              AR-COMM identifiers, and a /spec.json artifact.
            </span>
          </li>
        </ul>
        <p className="mt-4 font-serif text-sm text-foreground/70 leading-relaxed max-w-2xl">
          Full history, including every retired identifier, in the{" "}
          <a
            href={CHANGELOG_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            changelog
          </a>
          .
        </p>
      </section>

      <section className="pt-12 mt-6 border-t border-border/50">
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          contribute
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-5 max-w-2xl">
          AgentReady is developed in the open. The{" "}
          <a
            href={SPEC_SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            spec source
          </a>
          , the{" "}
          <a
            href={DATASET_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            dataset
          </a>{" "}
          behind the trace and experiment <SourceTag>STUDIES</SourceTag>{" "}
          numbers, and this site
          live on{" "}
          <a
            href="https://github.com/agentready-org/standard"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
          , where discussion and proposals happen. Recommendations are
          revised as new agent behavior is measured.
        </p>
        <p className="font-mono text-xs text-muted-foreground/55 tracking-wide">
          MIT · revised as protocols emerge
        </p>
      </section>
    </main>
  );
}

function Fold({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details className="max-w-2xl mt-6 group">
      <summary className="cursor-pointer font-mono text-[13px] tracking-wide text-muted-foreground underline decoration-border decoration-2 underline-offset-4 hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden list-none">
        <span aria-hidden="true" className="text-[10px] mr-1 group-open:hidden">
          ▸
        </span>
        <span aria-hidden="true" className="text-[10px] mr-1 hidden group-open:inline">
          ▾
        </span>
        {label}
      </summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[15px] text-foreground">{children}</span>
  );
}

function ScanCard({
  href,
  name,
  kicker,
  body,
}: {
  href: string;
  name: string;
  kicker: string;
  body: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid sm:grid-cols-[7.5rem_1fr] gap-x-4 gap-y-0.5 py-3.5 hover:bg-muted/20 -mx-2 px-2 transition-colors"
    >
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground/55 sm:pt-1">
        {kicker}
      </p>
      <div>
        <p className="font-mono text-[13px] font-bold text-foreground leading-snug">
          {name}
        </p>
        <p className="font-serif text-[13px] text-foreground/70 leading-relaxed mt-0.5">
          {body}
        </p>
      </div>
    </a>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="my-6 max-w-2xl">
      <figcaption className="font-mono text-xs text-muted-foreground/60 tracking-wide mb-2">
        {label}
      </figcaption>
      <pre className="font-mono text-[15px] leading-relaxed text-foreground/85 bg-muted/40 border border-border/50 rounded-lg p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
