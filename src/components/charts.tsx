/** Figures for the spec. Editorial, not dashboard. */

import { approxThousands, getOraStats, monthYear } from "@/lib/ora-stats";

export async function Scoreboard() {
  const stats = await getOraStats();
  const { pctAboveB, avgScore, sitesScanned, gradeShare, asOf, live } = stats;
  const cells = Array.from({ length: 100 }, (_, i) => i < pctAboveB);
  const sites = approxThousands(sitesScanned);
  const when = monthYear(asOf);
  return (
    <figure className="max-w-2xl mt-10 mb-2">
      <p className="font-mono text-[13px] tracking-widest text-muted-foreground/60 mb-4">
        ora scanner
      </p>

      <div className="flex items-baseline gap-5">
        <p className="font-serif text-6xl sm:text-7xl text-foreground tracking-tight leading-none tabular-nums">
          {pctAboveB}%
        </p>
        <p className="font-serif text-base text-foreground/80 leading-snug">
          of scanned sites grade B or above
        </p>
      </div>

      <div
        className="mt-5 grid gap-[3px] grid-cols-[repeat(20,minmax(0,1fr))]"
        role="img"
        aria-label={`${pctAboveB} of 100 cells filled, one per percent of sites at grade B or above`}
      >
        {cells.map((on, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[1px] ${
              on ? "bg-foreground" : "bg-foreground/14"
            }`}
          />
        ))}
      </div>
      <p className="font-mono text-[13px] text-muted-foreground/60 tracking-wide mt-2">
        each square is 1% of {sites} sites
      </p>

      <div
        className="mt-4 flex h-1.5 rounded-sm overflow-hidden"
        role="img"
        aria-label={`${gradeShare.dOrF}% grade D or F, ${gradeShare.c}% grade C, ${gradeShare.bPlus}% grade B or above`}
      >
        <span className="bg-foreground/20" style={{ width: `${gradeShare.dOrF}%` }} />
        <span className="bg-foreground/50" style={{ width: `${gradeShare.c}%` }} />
        <span className="bg-foreground" style={{ width: `${gradeShare.bPlus}%` }} />
      </div>
      <p className="mt-2 font-mono text-[13px] text-muted-foreground/70 tracking-wide">
        D or F · {gradeShare.dOrF}%
        <span className="text-muted-foreground/35 mx-2.5">/</span>
        C · {gradeShare.c}%
        <span className="text-muted-foreground/35 mx-2.5">/</span>
        B+ · {gradeShare.bPlus}%
      </p>

      <figcaption className="mt-5 font-serif text-sm text-foreground/70 leading-relaxed">
        Average score is {avgScore}. {live ? "Read from" : "Last read from"}{" "}
        <a
          href="https://ora.ai"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-border decoration-2 underline-offset-4 hover:text-foreground"
        >
          ora.ai
        </a>{" "}
        in {when}; the live figures are there.
      </figcaption>
    </figure>
  );
}

export function Cliff() {
  return (
    <figure className="max-w-2xl my-8">
      <p className="font-mono text-[13px] tracking-widest text-muted-foreground/60 mb-5">
        what agents reach · studies
      </p>
      <ol className="space-y-1">
        <CliffRow value="83%" label="docs pages" size="lg" />
        <CliffRow value="69%" label="homepage" size="lg" />
      </ol>
      <p className="font-mono text-[12px] tracking-widest text-muted-foreground/45 py-4">
        — then a cliff —
      </p>
      <ol className="space-y-1">
        <CliffRow value="23%" label=".well-known/*" size="sm" />
        <CliffRow value="21%" label="openapi.json, when shipped" size="sm" />
        <CliffRow value="4%" label="sitemap.xml" size="sm" />
      </ol>
      <figcaption className="mt-5 font-serif text-sm text-foreground/70 leading-relaxed">
        Share of traced runs that reached each surface. Agents use the
        same pages people do. Files built for machines are reached only if
        something already fetched points to them.
      </figcaption>
    </figure>
  );
}

function CliffRow({
  value,
  label,
  size,
}: {
  value: string;
  label: string;
  size: "lg" | "sm";
}) {
  return (
    <li className="flex items-baseline gap-4">
      <span
        className={`font-serif tabular-nums tracking-tight ${
          size === "lg"
            ? "text-3xl sm:text-4xl text-foreground w-[4.5rem] sm:w-[5.5rem]"
            : "text-lg text-foreground/55 w-[4.5rem] sm:w-[5.5rem]"
        }`}
      >
        {value}
      </span>
      <span
        className={`font-serif leading-snug ${
          size === "lg"
            ? "text-base sm:text-lg text-foreground/85"
            : "text-sm text-foreground/55"
        }`}
      >
        {label}
      </span>
    </li>
  );
}

export function SplitStat() {
  return (
    <figure className="max-w-2xl my-8">
      <p className="font-mono text-[13px] tracking-widest text-muted-foreground/60 mb-6">
        the action gap · ora scanner · april 2026 report
      </p>
      <div className="grid grid-cols-2 gap-6 sm:gap-10">
        <div>
          <p className="font-serif text-5xl sm:text-6xl text-foreground tracking-tight leading-none">
            80%
          </p>
          <p className="font-serif text-sm sm:text-base text-foreground/80 mt-3 leading-snug">
            reachable to every major AI crawler
          </p>
        </div>
        <div>
          <p className="font-serif text-5xl sm:text-6xl text-foreground tracking-tight leading-none">
            3%
          </p>
          <p className="font-serif text-sm sm:text-base text-foreground/80 mt-3 leading-snug">
            ship a spec-grade MCP server
          </p>
        </div>
      </div>
      <figcaption className="mt-6 font-serif text-sm text-foreground/70 leading-relaxed">
        Read access is close to solved. OAuth metadata and PKCE, the internals
        an agent needs to log in, pass on about 1% of sites. Agents can read.
        They cannot act. Figures from the April 2026 state of agent readiness
        report; the live per-check numbers are on ora.ai.
      </figcaption>
    </figure>
  );
}
