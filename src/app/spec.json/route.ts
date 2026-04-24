import { NextResponse } from "next/server";
import {
  SECTIONS,
  SPEC_VERSION,
  SPEC_DATE,
  TOTAL_REQUIREMENTS,
  sortedRequirements,
} from "@/lib/spec-data";

export const dynamic = "force-static";

/**
 * Machine-readable AgentReady specification.
 *
 * This artifact is the canonical normative form of the spec. Stable
 * identifiers (e.g. AR-DISC-01) are preserved across versions; see the
 * versioning policy on the site for the rules governing MAJOR / MINOR /
 * PATCH bumps.
 */
export function GET() {
  const body = {
    $schema: "https://agentready.org/schemas/agentready.v1.json",
    standard: "AgentReady",
    version: SPEC_VERSION,
    date: SPEC_DATE,
    license: "MIT",
    homepage: "https://agentready.org",
    repository: "https://github.com/assafelovic/agentready",
    normativeReferences: [
      {
        id: "BCP14",
        refs: ["RFC 2119", "RFC 8174"],
        url: "https://www.rfc-editor.org/info/bcp14",
        note: "The keywords MUST, SHOULD, and MAY are interpreted per BCP 14 when they appear in all capitals.",
      },
    ],
    conformance: {
      summary:
        "A product conforms when it implements every MUST requirement that applies to its surfaces. It should implement every applicable SHOULD requirement unless it documents a reason not to. It may implement MAY requirements as appropriate.",
      applicability: {
        baseline:
          "Applies to every agent-addressable product, regardless of surface.",
        conditional:
          "Applies only when the product exposes the surface named in the requirement's `applies` field.",
      },
      strengths: {
        MUST: "Mandatory for products within the requirement's scope.",
        SHOULD:
          "Strongly recommended; deviation permitted only with documented rationale.",
        MAY: "Optional; implementation adds value but is not required for conformance.",
      },
      alternatives: {
        commerce:
          "Requirements in the Commerce section are alternative, interoperating approaches. A product that accepts agent payment conforms by implementing at least one applicable Commerce requirement.",
      },
    },
    versioning: {
      scheme: "semver",
      rules: {
        MAJOR:
          "An existing requirement's strength is raised (for example SHOULD to MUST), a requirement is removed, or a stable identifier is reassigned.",
        MINOR:
          "A requirement is added, an existing strength is lowered, or a reference is updated to a newer specification.",
        PATCH: "Clarifications, editorial fixes, and link updates.",
      },
      stableIdFormat: "AR-<SECTION>-<NN>",
      stableIdPolicy:
        "Stable identifiers are preserved across spec versions and are the canonical way to cite a requirement.",
    },
    counts: {
      sections: SECTIONS.length,
      requirements: TOTAL_REQUIREMENTS,
    },
    sections: SECTIONS.map((section) => ({
      id: section.id,
      name: section.name,
      summary: section.summary,
      requirements: sortedRequirements(section).map((req) => ({
        stableId: req.stableId,
        slug: req.id,
        name: req.name,
        summary: req.summary,
        applies: req.applies,
        strength: req.strength,
        emerging: Boolean(req.emerging),
        reference: req.reference ?? null,
        referenceUrl: req.referenceUrl ?? null,
        anchor: `https://agentready.org/#${req.id}`,
      })),
    })),
  };

  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
