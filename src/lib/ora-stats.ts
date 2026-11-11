/**
 * Live scanner numbers for the hero scoreboard, fetched from Ora's public
 * stats API at build time so the page never drifts from ora.ai. If the
 * fetch fails the build falls back to the last snapshot below, and the
 * caption says which one it is showing.
 */

export type OraStats = {
  sitesScanned: number;
  /** ora.ai reports an average (mean) score, not a median. */
  avgScore: number;
  /** Share of scanned sites at grade A or above, unrounded: it is below 1%. */
  pctAboveA: number;
  /** Grade split in whole percents that sum to 100. */
  gradeShare: { dOrF: number; c: number; bPlus: number };
  /** ISO date the numbers were read. */
  asOf: string;
  /** False when the build served the snapshot instead of the live API. */
  live: boolean;
};

export const ORA_STATS_URL = "https://ora.ai/api/stats";

/** Last known values, read from ORA_STATS_URL on 2026-11-11. */
const SNAPSHOT: OraStats = {
  sitesScanned: 151448,
  avgScore: 44,
  pctAboveA: 0.57,
  gradeShare: { dOrF: 57, c: 36, bPlus: 7 },
  asOf: "2026-11-11",
  live: false,
};

type ApiGrade = { grade: string; pct: number };
type ApiStats = {
  sitesScanned?: unknown;
  avgScore?: unknown;
  gradeDistribution?: unknown;
};

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function parse(json: ApiStats): OraStats | null {
  const { sitesScanned, avgScore, gradeDistribution } = json;
  if (
    !isFiniteNumber(sitesScanned) ||
    !isFiniteNumber(avgScore) ||
    !Array.isArray(gradeDistribution)
  ) {
    return null;
  }
  const grades = gradeDistribution as ApiGrade[];
  const sum = (pick: (g: string) => boolean) =>
    grades
      .filter((g) => typeof g.grade === "string" && isFiniteNumber(g.pct))
      .filter((g) => pick(g.grade))
      .reduce((acc, g) => acc + g.pct, 0);
  const aRaw = sum((g) => g.startsWith("A"));
  const bPlusRaw = sum((g) => g.startsWith("A") || g.startsWith("B"));
  const cRaw = sum((g) => g.startsWith("C"));
  const dOrFRaw = sum((g) => g.startsWith("D") || g.startsWith("F"));
  if (Math.abs(bPlusRaw + cRaw + dOrFRaw - 100) > 1) return null;
  const bPlus = Math.round(bPlusRaw);
  const c = Math.round(cRaw);
  return {
    sitesScanned: Math.round(sitesScanned),
    avgScore: Math.round(avgScore),
    pctAboveA: aRaw,
    gradeShare: { dOrF: 100 - bPlus - c, c, bPlus },
    asOf: new Date().toISOString().slice(0, 10),
    live: true,
  };
}

export async function getOraStats(): Promise<OraStats> {
  try {
    const res = await fetch(ORA_STATS_URL, {
      cache: "force-cache",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return SNAPSHOT;
    const parsed = parse((await res.json()) as ApiStats);
    return parsed ?? SNAPSHOT;
  } catch {
    return SNAPSHOT;
  }
}

/** "<1%" below one percent, whole percents above. */
export function formatPct(pct: number): string {
  return pct > 0 && pct < 1 ? "<1%" : `${Math.round(pct)}%`;
}

/** "~99,000" style rounding for the caption. */
export function approxThousands(n: number): string {
  return `~${(Math.round(n / 1000) * 1000).toLocaleString("en-US")}`;
}

/** "September 2026" from an ISO date. */
export function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
