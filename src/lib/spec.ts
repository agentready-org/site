/**
 * The AgentReady spec as data: a pinned copy of `spec/practices.json` from
 * a release of agentready-org/standard. Every requirement's identifier and
 * level on this site comes from here, never from hand-typed copy.
 *
 * Update with `npm run sync:spec` (latest release) or
 * `npm run sync:spec -- v2.1.0`; a scheduled workflow opens that PR when a
 * new release appears. Do not edit `src/spec/practices.json` by hand: CI
 * checks it byte for byte against the release.
 */
import data from "@/spec/practices.json";

export type Level = "MUST" | "SHOULD" | "MAY";

export type Requirement = {
  id: string;
  category: string;
  level: Level;
  /** Requirement text, as markdown. */
  requirement: string;
  evidence?: string;
  bestPractice?: string;
};

type SpecData = {
  version: string;
  date: string;
  stages: { category: string; name: string; title: string }[];
  requirements: Requirement[];
  retired: string[];
};

export const SPEC = data as SpecData;

/** e.g. "2.0.1" */
export const SPEC_VERSION = SPEC.version;
/** e.g. "November 2026" */
export const SPEC_DATE_LABEL = SPEC.date;
/** The release tag this site is pinned to, e.g. "v2.0.1". */
export const SPEC_TAG = `v${SPEC.version}`;

export const SPEC_REPO_URL = "https://github.com/agentready-org/standard";

const byId = new Map(SPEC.requirements.map((r) => [r.id, r]));

/** The requirement with this identifier. Throws (and fails the build) if the pinned spec lacks it. */
export function requirement(id: string): Requirement {
  const r = byId.get(id);
  if (!r) {
    const why = SPEC.retired.includes(id) ? "is retired" : "does not exist";
    throw new Error(
      `${id} ${why} in AgentReady ${SPEC_TAG} (src/spec/practices.json).`,
    );
  }
  return r;
}

/** MUST / SHOULD / MAY for this identifier, from the pinned spec. */
export function level(id: string): Level {
  return requirement(id).level;
}
