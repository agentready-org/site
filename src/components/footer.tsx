export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm font-bold text-foreground">
            agentready.org
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/55 mt-1 tracking-wide">
            the open standard for agent readiness · MIT
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="#guide"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Guide
          </a>
          <a
            href="https://ora.ai"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Deep Scan
          </a>
          <a
            href="https://github.com/agentready-org/standard"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
