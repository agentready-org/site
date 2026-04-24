# Changelog

All notable changes to the AgentReady specification are recorded here.

AgentReady follows semantic versioning applied to normative commitments, not
to editorial text:

- **MAJOR** — an existing entry's strength is raised (for example `SHOULD`
  to `MUST`), an entry is removed, or a stable identifier is reassigned.
- **MINOR** — an entry is added, an existing strength is lowered, or a
  reference is updated to a newer specification.
- **PATCH** — clarifications, editorial fixes, and link updates.

Stable identifiers (`AR-SECT-NN`) are preserved across versions and are the
canonical way to cite an entry.

---

## v1.0.0 — 2026-04-24

First published version of AgentReady.

### Added

- Five sections, organized by topic rather than by agent journey:
  - **Discoverability** (`AR-DISC-01` … `AR-DISC-06`)
  - **Content for agents** (`AR-CONT-01` … `AR-CONT-04`)
  - **Capabilities** (`AR-CAPA-01` … `AR-CAPA-09`)
  - **Identity & Access** (`AR-IDEN-01` … `AR-IDEN-06`)
  - **Commerce** (`AR-COMM-01` … `AR-COMM-05`)
- Normative strength (`MUST` / `SHOULD` / `MAY` per BCP 14) on every entry.
- Applicability model (`baseline` vs. conditional) on every entry.
- Stable identifiers for every entry, preserved across revisions.
- Conformance definition, including the treatment of Commerce as a set of
  alternative, interoperating protocols where at least one applies.
- Machine-readable artifact at [`/spec.json`](https://agentready.org/spec.json).
- Agent-readable summary at [`/llms.txt`](https://agentready.org/llms.txt).
- Versioning policy (`/#versioning`).

### Entries

Discoverability

- `AR-DISC-01` robots.txt with AI policy — **MUST** (baseline)
- `AR-DISC-02` Sitemap — **SHOULD** (baseline)
- `AR-DISC-03` llms.txt — **SHOULD** (baseline)
- `AR-DISC-04` llms-full.txt — **MAY** (baseline)
- `AR-DISC-05` HTTP Link response header — **MAY** (baseline)
- `AR-DISC-06` NLWeb schema feeds — **MAY** (conditional)

Content for agents

- `AR-CONT-01` JSON-LD structured data — **SHOULD** (baseline)
- `AR-CONT-02` Markdown content negotiation — **MAY** (baseline)
- `AR-CONT-03` /index.md fallback — **MAY** (baseline)
- `AR-CONT-04` Speakable content markup — **MAY** (conditional)

Capabilities

- `AR-CAPA-01` Model Context Protocol (MCP) — **MUST** (conditional)
- `AR-CAPA-02` MCP Server Card — **SHOULD** (conditional)
- `AR-CAPA-03` MCP Apps — **MAY** (conditional)
- `AR-CAPA-04` A2A Agent Card — **MUST** (conditional)
- `AR-CAPA-05` WebMCP — **MAY** (conditional)
- `AR-CAPA-06` NLWeb /ask endpoint — **MAY** (conditional)
- `AR-CAPA-07` Agent Skills — **MAY** (conditional)
- `AR-CAPA-08` OpenAPI — **MUST** (conditional)
- `AR-CAPA-09` ai-plugin.json — **MAY** (conditional)

Identity & Access

- `AR-IDEN-01` Web Bot Auth — **SHOULD** (baseline)
- `AR-IDEN-02` OAuth 2.0 — **MUST** (conditional)
- `AR-IDEN-03` OAuth Authorization Server Metadata — **MUST** (conditional)
- `AR-IDEN-04` OAuth Protected Resource — **SHOULD** (conditional)
- `AR-IDEN-05` PKCE — **MUST** (conditional)
- `AR-IDEN-06` API Catalog — **MAY** (conditional)

Commerce

- `AR-COMM-01` x402 — **MAY** (conditional)
- `AR-COMM-02` Agentic Commerce Protocol (ACP) — **MAY** (conditional)
- `AR-COMM-03` ACP Delegate Payment — **MAY** (conditional)
- `AR-COMM-04` Universal Commerce Protocol (UCP) — **MAY** (conditional)
- `AR-COMM-05` Machine Payments Protocol (MPP) — **MAY** (conditional)

### Notes

- This is the first version that assigns normative strength. Earlier drafts
  of the page exposed the same entries without applicability or strength;
  those drafts are not semver-tracked.
- Commerce entries are intentionally all **MAY**; conformance in that
  section is defined as "at least one applicable entry implemented,"
  reflecting the current state of the ecosystem where ACP, UCP, x402, and
  MPP each address the same underlying need through different designs.
- Entries tagged `emerging` are expected to graduate to stable as their
  underlying specifications stabilize; a graduation is a PATCH-level
  change unless it also moves the strength.
