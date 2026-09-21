import Link from "next/link";

const footerLink =
  "font-mono text-[15px] text-muted-foreground hover:text-foreground transition-colors";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              aria-label="agentready.org"
              className="font-mono text-[22px] font-bold tracking-wide text-foreground hover:opacity-70 transition-opacity"
            >
              agentready
              <span className="font-normal text-muted-foreground/55">.org</span>
            </Link>
            <p className="font-mono text-[15px] text-muted-foreground/55 mt-1 tracking-wide">
              the open standard for agent readiness · MIT
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#essentials" className={footerLink}>
              Essentials
            </a>
            <a href="#guide" className={footerLink}>
              Guide
            </a>
            <a href="#beyond" className={footerLink}>
              Scan
            </a>
            <a
              href="https://is-agentic.com"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              is-agentic
            </a>
            <a
              href="https://ora.ai"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              ora.ai
            </a>
            <a
              href="https://www.mintlify.com/score"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              mintlify
            </a>
            <a
              href="https://github.com/agentready-org/standard"
              target="_blank"
              rel="noreferrer"
              className={footerLink}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
