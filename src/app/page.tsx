import { SECTIONS } from "@/lib/spec-data";

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
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          The agentic web moves faster than any traditional standards process.
          AgentReady is designed to keep up: new protocols join the spec as
          they emerge, tagged <InlineTag>emerging</InlineTag> while the
          ecosystem adopts them. For products, it is a checklist of what
          every business building for agents should consider; for
          builders, it is a shared vocabulary so scanners and badges can
          compare like with like.
        </p>
      </section>

      {/* Spec */}
      <section
        id="spec"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § the spec
        </p>
        <p className="font-serif text-base text-foreground/80 leading-relaxed max-w-2xl mb-6">
          Each entry below is a published protocol, standard, or convention a
          product implements directly. Entries tagged{" "}
          <InlineTag>emerging</InlineTag> are still evolving or pre-RFC. The
          spec is provisional and will grow with the ecosystem.
        </p>

        <nav
          aria-label="Spec sections"
          className="flex flex-wrap gap-x-5 gap-y-2 mb-14"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-mono text-sm font-medium text-foreground hover:text-foreground/60 transition-colors"
            >
              {section.name}
            </a>
          ))}
        </nav>

        <div className="space-y-14">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-20"
            >
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-2 leading-tight">
                {section.name}
              </h2>
              <p className="font-serif text-base text-foreground/80 leading-relaxed mb-6 max-w-2xl">
                {section.summary}
              </p>

              <div className="space-y-0">
                {section.entries.map((entry) => (
                  <div
                    key={entry.id}
                    id={entry.id}
                    className="py-4 border-b border-border/50 scroll-mt-20"
                  >
                    <p className="font-serif text-base text-foreground">
                      <a
                        href={`#${entry.id}`}
                        className="hover:underline decoration-border decoration-2 underline-offset-4"
                      >
                        {entry.name}
                      </a>
                      {entry.emerging && (
                        <InlineTag className="ml-2">emerging</InlineTag>
                      )}
                      {entry.reference &&
                        (entry.referenceUrl ? (
                          <a
                            href={entry.referenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground/70 bg-muted/60 rounded align-middle hover:text-foreground transition-colors"
                          >
                            {entry.reference}
                          </a>
                        ) : (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground/60 bg-muted/60 rounded align-middle">
                            {entry.reference}
                          </span>
                        ))}
                    </p>
                    <p className="font-serif text-[15px] text-foreground/70 mt-1 leading-relaxed max-w-2xl">
                      {entry.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contribute */}
      <section className="pt-12 mt-6 border-t border-border/50">
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          contribute
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-5 max-w-2xl">
          AgentReady is developed in the open. The spec and this site live on{" "}
          <a
            href="https://github.com/assafelovic/agentready"
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
          . New entries join the spec as <InlineTag>emerging</InlineTag> so
          adoption can be observed before they stabilize.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-5 max-w-2xl">
          Check out{" "}
          <a
            href="https://www.orank.ai"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            Deep Scan by Ora
          </a>
          , a free, public implementation that checks any site against the
          current spec.
        </p>
        <p className="font-mono text-xs text-muted-foreground/55 tracking-wide">
          MIT · revised as protocols emerge
        </p>
      </section>
    </main>
  );
}

function InlineTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] tracking-wider border rounded align-middle text-muted-foreground/70 border-border/60 ${className}`}
    >
      {children}
    </span>
  );
}
