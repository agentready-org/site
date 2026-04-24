import {
  SECTIONS,
  SPEC_VERSION,
  sortedEntries,
  type SpecStrength,
} from "@/lib/spec-data";

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

      {/* Conformance */}
      <section
        id="conformance"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § conformance
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          What it means to be AgentReady
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          A product conforms to AgentReady{" "}
          <span className="font-mono text-[13px] text-foreground">
            v{SPEC_VERSION}
          </span>{" "}
          when it implements every{" "}
          <StrengthInline value="MUST" /> entry that applies to its
          surfaces. It should implement every{" "}
          <StrengthInline value="SHOULD" /> entry unless it documents
          a reason not to, and may implement{" "}
          <StrengthInline value="MAY" /> entries as appropriate.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Each entry carries two qualifiers. Applicability determines
          whether the entry binds the product at all:{" "}
          <span className="font-mono text-[13px] text-foreground">baseline</span>{" "}
          entries apply to every agent-addressable product, while
          conditional entries apply only when the product exposes their
          stated surface. Strength then says how firmly the entry binds
          within that scope. A conditional{" "}
          <StrengthInline value="MUST" /> entry has no force for products
          outside its condition; a docs site is never asked to implement
          commerce, and a payments API is never asked to publish voice
          markup.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          Commerce is the one section where multiple entries address the
          same underlying need through competing protocols. A product that
          accepts agent payment conforms by implementing at least one
          applicable Commerce entry; it is not required to implement them
          all.
        </p>
        <p className="font-serif text-sm text-muted-foreground/75 leading-relaxed max-w-2xl">
          The keywords MUST, SHOULD, and MAY in this document are to be
          interpreted as described in BCP 14 (
          <a
            href="https://www.rfc-editor.org/rfc/rfc2119.html"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            RFC 2119
          </a>
          ,{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8174.html"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            RFC 8174
          </a>
          ) when, and only when, they appear in all capitals.
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
        <p className="font-serif text-base text-foreground/80 leading-relaxed max-w-2xl mb-4">
          Each entry below is a published protocol, standard, or convention
          a product implements directly. Every entry carries a stable
          identifier (for example{" "}
          <span className="font-mono text-[13px] text-foreground">
            AR-DISC-01
          </span>
          ) preserved across revisions, an applicability scope, and a
          normative strength. A machine-readable version of the spec is
          available at{" "}
          <a
            href="/spec.json"
            className="font-mono text-[13px] underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            /spec.json
          </a>
          .
        </p>

        <nav
          aria-label="Spec sections"
          className="flex flex-wrap gap-x-5 gap-y-2 mb-14 mt-6"
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
                {sortedEntries(section).map((entry) => (
                  <div
                    key={entry.id}
                    id={entry.id}
                    className="py-5 border-b border-border/50 scroll-mt-20"
                  >
                    <div className="flex items-center gap-3 mb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground/70">
                      <a
                        href={`#${entry.id}`}
                        className="text-muted-foreground/90 hover:text-foreground transition-colors"
                      >
                        {entry.stableId}
                      </a>
                      <span className="text-muted-foreground/30">·</span>
                      <StrengthBadge value={entry.strength} />
                    </div>
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
                    {entry.applies !== "baseline" && (
                      <p className="font-mono text-[12px] text-muted-foreground/80 mt-2 tracking-wide">
                        applies to:{" "}
                        <span className="text-foreground/70">
                          {entry.applies}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Versioning */}
      <section
        id="versioning"
        className="py-10 border-t border-border/50 scroll-mt-20"
      >
        <p className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">
          § versioning
        </p>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight">
          How the spec changes
        </h2>
        <p className="font-serif text-base text-foreground/85 leading-relaxed mb-4 max-w-2xl">
          AgentReady follows semantic versioning applied to normative
          commitments, not to editorial text. A{" "}
          <span className="font-mono text-[13px] text-foreground">MAJOR</span>{" "}
          bump happens when an existing entry changes its strength to a
          stricter level, when an entry is removed, or when a stable ID is
          reassigned. A{" "}
          <span className="font-mono text-[13px] text-foreground">MINOR</span>{" "}
          bump happens when an entry is added, when a strength becomes
          looser, or when a reference is updated. A{" "}
          <span className="font-mono text-[13px] text-foreground">PATCH</span>{" "}
          bump covers clarifications and link fixes.
        </p>
        <p className="font-serif text-base text-foreground/85 leading-relaxed max-w-2xl">
          Stable identifiers (
          <span className="font-mono text-[13px] text-foreground">
            AR-SECT-NN
          </span>
          ) are preserved across versions and are the canonical way to cite
          an entry. The full change history lives in the{" "}
          <a
            href="https://github.com/assafelovic/agentready/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            changelog
          </a>
          , and the machine-readable form of the current version is at{" "}
          <a
            href="/spec.json"
            className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
          >
            /spec.json
          </a>
          .
        </p>
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

function StrengthBadge({ value }: { value: SpecStrength }) {
  const toneClass =
    value === "MUST"
      ? "text-foreground font-semibold"
      : value === "SHOULD"
        ? "text-foreground/85 font-medium"
        : "text-muted-foreground/70";
  return <span className={`font-mono tracking-wider ${toneClass}`}>{value}</span>;
}

function StrengthInline({ value }: { value: SpecStrength }) {
  return (
    <span className="font-mono text-[13px] tracking-wider text-foreground">
      {value}
    </span>
  );
}
