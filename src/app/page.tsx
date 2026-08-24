import {
  ACT_PRACTICES,
  DESCRIBING_FILES,
  GUIDE_DATE_LABEL,
  GUIDE_VERSION,
  READ_PRACTICES,
  REACHABLE_PRACTICES,
  type Practice,
} from "@/lib/guide-data";

const GUIDE_SECTIONS: { id: string; name: string }[] = [
  { id: "reachable", name: "Be reachable and citable" },
  { id: "read", name: "Put the answer where agents read" },
  { id: "act", name: "Let agents act, not just read" },
  { id: "beyond", name: "Beyond this guide" },
];

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

const SCAN_CURL_SNIPPET = `curl -X POST https://ora.ai/api/scan \\
  -H 'Content-Type: application/json' \\
  -d '{"url": "example.com"}'`;

const SCAN_RESPONSE_SNIPPET = `{
  "score": 72,
  "grade": "B",
  "layers": [
    { "id": "accessibility", "score": 43, "maxScore": 62, "checks": [
      { "id": "content-no-js", "status": "pass", "score": 3, "maxScore": 3 },
      { "id": "markdown-link-alternate", "status": "fail", "score": 0, "maxScore": 1,
        "recommendation": "Advertise a markdown twin with
          <link rel=\\"alternate\\" type=\\"text/markdown\\"> …" }
    ] },
    …
  ]
}`;

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      {/* Intro */}
      <section className="pt-12 sm:pt-16 pb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-8">
          The open standard for agent readiness
        </h1>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Agents are a new class of user. A growing set of protocols has
          emerged to serve them (MCP, A2A, x402, llms.txt, Web Bot Auth, and
          more). What has not emerged is a shared definition of what being
          ready for them means. Scanners, badges, and readiness grades are
          already everywhere, and none of them agree.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          AgentReady is the first community-driven standard for the agentic
          web. It is an open specification of the protocols, standards, and
          conventions a product should implement to be usable by AI agents,
          from discovery to completion. It does not promote any specific
          protocol or vendor, and it does not prescribe how builders
          should score compliance.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          The agentic web moves faster than any traditional standards
          process. AgentReady is designed to keep up: the guide below is
          grounded in measured agent behavior, and its recommendations are
          revised as new protocols and conventions emerge.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          AgentReady is developed in collaboration with{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            Vercel
          </a>{" "}
          and written with the{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora.ai
          </a>{" "}
          research lab.
        </p>
      </section>

      {/* Guide */}
      <section
        id="guide"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § the guide
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3 leading-tight">
          Make your site readable by AI agents
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-3 max-w-2xl">
          A practical guide to making your website work for the agents that
          now read it — grounded in real agent runs and a controlled
          experiment.
        </p>
        <p className="font-mono text-[12px] text-muted-foreground/70 tracking-wide mb-8">
          Written with the{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border underline-offset-4 hover:text-foreground"
          >
            ora.ai
          </a>{" "}
          research lab · in collaboration with Vercel · v{GUIDE_VERSION} ·
          last updated {GUIDE_DATE_LABEL}
        </p>

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          AI agents visit websites on users’ behalf to answer questions,
          integrate APIs, and complete tasks. Together with the{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora.ai
          </a>{" "}
          research lab, we measured which site features help them succeed.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          In the studies, two changes caused agents to fail: hiding answers
          behind JavaScript and blocking access. Other practices shaped
          where agents went and which pages their answers were built from.
          This guide follows the order in which agents encounter a site:
          find, read, then act. Each stage depends on the previous one, and
          unlinked files are unlikely to be discovered.
        </p>

        <aside className="my-8 max-w-2xl border border-border/50 rounded-lg p-5">
          <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-3">
            how we know
          </p>
          <p className="font-serif text-sm text-foreground/80 leading-relaxed">
            Numbers in this guide are tagged by source.{" "}
            <SourceTag>STUDIES</SourceTag> refers to research from the{" "}
            <a
              href="https://ora.ai"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
            >
              ora.ai
            </a>{" "}
            research lab: over 1,000 real agent runs across 25 sites
            traced turn by turn and a controlled experiment that toggled one
            feature at a time. <SourceTag>ORA SCANNER</SourceTag> refers to
            agent-reachability checks across every scored site. Statements
            without a tag are recommendations rather than measured findings.
          </p>
        </aside>

        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          All recommendations in this guide share one prerequisite: the
          agent must be able to reach the page and find the answer in the
          returned HTML.
        </p>

        <nav
          aria-label="Guide sections"
          className="flex flex-wrap gap-x-5 gap-y-2 mt-8"
        >
          {GUIDE_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-mono text-sm font-medium text-foreground hover:text-foreground/60 transition-colors"
            >
              {section.name}
            </a>
          ))}
        </nav>
      </section>

      {/* Be reachable and citable */}
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
          crawl-built search index. Pages blocked from crawlers cannot
          enter those indexes; they are absent rather than ranked lower.
          Blocking can also stop an agent from fetching a page while
          answering a user.
        </p>

        <PracticeTable
          practices={REACHABLE_PRACTICES}
          lastHeader="what the runs show"
          className="mb-8"
        />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          To make information citable, publish it on one canonical, current
          first-party docs page. The number above is why: your docs are the
          page agents build their answers from.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          That covers what to publish; the crawl policy covers who may read
          it. Write it as one rule for all agents, not an allowlist of
          named crawlers:
        </p>

        <CodeBlock label="robots.txt" code={ROBOTS_TXT_SNIPPET} />

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
              <span className="font-mono text-[13px] text-foreground/70">
                ({bots})
              </span>
            </li>
          ))}
        </ul>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Each obeys its own robots.txt rule, so you can block a training
          crawler — opting out of training — without dropping out of search
          indexes or agent answers. Two catches: a more specific group such
          as <Mono>User-agent: GPTBot</Mono> overrides your <Mono>*</Mono>{" "}
          group, so audit existing rules; and user-initiated fetchers may
          not consult robots.txt at all.
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
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          The curl is not proof either way: bot blockers weigh where a
          request comes from more than its user-agent string, so your
          laptop may pass where the real agent is blocked, or the reverse.
          The dependable test is your server logs. OpenAI and Anthropic
          publish their crawlers’ IP ranges (separate per-bot lists from
          OpenAI, one combined list from Anthropic) — find those requests
          and confirm they return <Mono>200</Mono>.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          llms.txt belongs in the reading section because an agent can
          request it only after discovering and reaching the site.
        </p>
      </section>

      {/* Put the answer where agents read */}
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
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          After reaching a page, an agent must be able to extract the
          answer from the returned content. In the studies, agents used the
          same homepage and docs pages as human visitors. The
          agent-specific files (llms.txt, AGENTS.md, markdown mirrors,
          JSON-LD) just help agents find, fetch, and use those same
          answers.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-8 max-w-2xl">
          If your site is client-rendered, getting answers into the initial
          HTML is a real migration — SSR, prerendering, or a hybrid — but
          it is the prerequisite for agents that fetch rather than run
          JavaScript. The machinery beyond that — content negotiation, .md
          endpoints, agent detection, frontmatter — did not change whether
          agents succeeded in the studies. Links also matter: agents rarely
          found pages or files that were not linked from content they had
          already reached.
        </p>

        <h3 className="font-serif text-lg text-foreground mb-3 leading-tight">
          Agents read the same pages people do
        </h3>
        <p className="font-serif text-base text-foreground/80 leading-relaxed mb-4 max-w-2xl">
          Where agents go on your site, and what lets them pull the answer
          once there:
        </p>
        <PracticeTable
          practices={READ_PRACTICES}
          lastHeader="what the runs show"
          className="mb-10"
        />

        <h3 className="font-serif text-lg text-foreground mb-3 leading-tight">
          Link the files that describe your site
        </h3>
        <p className="font-serif text-base text-foreground/80 leading-relaxed mb-4 max-w-2xl">
          <SourceTag>STUDIES</SourceTag> Agents typically opened these
          resources after visiting the homepage. Depending on the file
          type, 86–100% of visits came through links rather than guessed
          paths. Link each resource from content agents already visited,
          such as the footer, page metadata like{" "}
          <Mono>&lt;link rel=&quot;alternate&quot;&gt;</Mono> in the head,
          or a resources section.
        </p>
        <PracticeTable
          practices={DESCRIBING_FILES}
          firstHeader="file"
          lastHeader="what the runs show"
          className="mb-8"
        />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          When shipping an llms.txt, make it a lean, described index:
        </p>

        <CodeBlock label="llms.txt" code={LLMS_TXT_SNIPPET} />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-8 max-w-2xl">
          Inject JSON-LD at strategic places — the homepage above all — so
          an agent fetching the raw HTML gets your key facts and routes in
          one machine-readable block.
        </p>

        <h3 className="font-serif text-lg text-foreground mb-3 leading-tight">
          Agents request markdown when offered — make it reachable
        </h3>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          <SourceTag>STUDIES</SourceTag> Agents requested markdown on about
          65% of web fetches. When they specified a format, they chose
          markdown 96% of the time. Format did not determine task success
          in the studies, so ensure the HTML works before adding a .md
          mirror.
        </p>

        <CodeBlock
          label="docs/quickstart.html"
          code={MARKDOWN_ALTERNATE_SNIPPET}
        />

        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-8 max-w-2xl">
          The same relation can also ride as an HTTP <Mono>Link:</Mono>{" "}
          header, so a CDN can advertise the mirror without touching page
          heads.
        </p>

        <h3 className="font-serif text-lg text-foreground mb-3 leading-tight">
          Return accurate HTTP status codes
        </h3>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Return <Mono>404</Mono> for a missing path or a valid redirect to
          a replacement. Do not return <Mono>200</Mono> for a missing page,
          even if the body suggests alternatives; agents cannot distinguish
          that response from a live page. In one observed case, a
          single-page app returned <Mono>200</Mono> for every path, making
          dead URLs appear valid.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          The same honesty applies when you throttle: answer with a{" "}
          <Mono>429</Mono> and a <Mono>Retry-After</Mono> header (RFC
          6585), not a silent challenge page — agents and crawlers treat{" "}
          <Mono>429</Mono> as a back-off signal and will return.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          By the end of this layer the agent has found you and read you.
          Whether it can act on what it reads is the final layer —
          usability.
        </p>
      </section>

      {/* Let agents act */}
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
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-6 max-w-2xl">
          Reading documentation does not let an agent complete a task. To
          act, an agent needs an operable interface such as an API, MCP
          server, SDK, or CLI, plus authentication it can complete. These
          interfaces still depend on discoverable and readable
          documentation.
        </p>

        <PracticeTable
          practices={ACT_PRACTICES}
          lastHeader="best practice"
          className="mb-6"
        />

        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          That is the full journey — find, read, act. The last step happens
          only if the first two did.
        </p>
      </section>

      {/* Beyond this guide */}
      <section
        id="beyond"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § beyond this guide
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          Beyond this guide
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          This guide covers the main practices, not the full surface of
          agent readiness. The{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora scanner
          </a>{" "}
          covers additional
          agent-readiness checks through its public methodology, per-check
          breakdown, and leaderboard. The protocol changes as new agent
          behavior is measured, so checks and weights may change between
          guide versions.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Scan any domain at{" "}
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            ora.ai
          </a>
          , or from the API:
        </p>

        <CodeBlock label="Terminal" code={SCAN_CURL_SNIPPET} />
        <CodeBlock label="Response (abridged)" code={SCAN_RESPONSE_SNIPPET} />
      </section>

      {/* References */}
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
              title: "The state of agent readiness",
              href: "https://ora.ai/blog/state-of-agent-readiness-2026",
              blurb: "the scanner report behind the reachability figure.",
            },
            {
              title: "ora research",
              href: "https://ora.ai",
              blurb: "the ongoing research program behind the protocol.",
            },
          ].map(({ title, href, blurb }) => (
            <li
              key={title}
              className="font-serif text-base text-foreground/85 leading-relaxed pl-5 relative before:content-['·'] before:absolute before:left-1 before:text-muted-foreground/60"
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline decoration-border decoration-2 underline-offset-4 hover:text-foreground/70"
                >
                  {title}
                </a>
              ) : (
                <span className="text-foreground">{title}</span>
              )}{" "}
              — {blurb}
            </li>
          ))}
        </ul>
      </section>

      {/* Changelog */}
      <section
        id="changelog"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § changelog
        </p>
        <p className="font-mono text-[13px] text-foreground/80 tracking-wide">
          v{GUIDE_VERSION} · {GUIDE_DATE_LABEL} · first public version.
        </p>
      </section>

      {/* Contribute */}
      <section className="pt-12 mt-6 border-t border-border/50">
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          contribute
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-5 max-w-2xl">
          AgentReady is developed in the open. The guide and this site live
          on{" "}
          <a
            href="https://github.com/agentready-org/standard"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
          . Discussion, proposals, and builder conversations happen on{" "}
          <a
            href="https://discord.gg/WKYedjmCu"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            Discord
          </a>
          . Recommendations are revised as new agent behavior is measured.
        </p>
        <p className="font-mono text-xs text-muted-foreground/55 tracking-wide">
          MIT · revised as protocols emerge
        </p>
      </section>
    </main>
  );
}

function PracticeTable({
  practices,
  firstHeader = "practice",
  lastHeader,
  className = "",
}: {
  practices: readonly Practice[];
  firstHeader?: string;
  lastHeader: string;
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="w-[26%] py-2.5 pr-4 font-mono text-[11px] font-normal tracking-widest text-muted-foreground/60">
              {firstHeader}
            </th>
            <th className="w-[30%] py-2.5 pr-4 font-mono text-[11px] font-normal tracking-widest text-muted-foreground/60">
              what it does
            </th>
            <th className="py-2.5 font-mono text-[11px] font-normal tracking-widest text-muted-foreground/60">
              {lastHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {practices.map((practice) => (
            <tr
              key={practice.id}
              id={practice.id}
              className="border-b border-border/50 align-top scroll-mt-20"
            >
              <td className="py-4 pr-4 font-serif text-base text-foreground leading-snug">
                {practice.name}
              </td>
              <td className="py-4 pr-4 font-serif text-sm text-foreground/75 leading-relaxed">
                {practice.what}
              </td>
              <td className="py-4 font-serif text-sm text-foreground/75 leading-relaxed">
                {practice.evidence ? (
                  <>
                    {practice.evidence.source && (
                      <SourceTag>{practice.evidence.source}</SourceTag>
                    )}
                    {practice.evidence.text}
                  </>
                ) : (
                  practice.bestPractice
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SourceTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 mr-2 font-mono text-[10px] tracking-wider border rounded align-middle text-muted-foreground/70 border-border/60 whitespace-nowrap">
      {children}
    </span>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[13px] text-foreground">{children}</span>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <figure className="my-6 max-w-2xl">
      <figcaption className="font-mono text-xs text-muted-foreground/60 tracking-wide mb-2">
        {label}
      </figcaption>
      <pre className="font-mono text-[13px] leading-relaxed text-foreground/85 bg-muted/40 border border-border/50 rounded-lg p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
