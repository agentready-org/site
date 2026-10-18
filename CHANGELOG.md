# Changelog

All notable changes to AgentReady are recorded here.

---

## Unreleased

- The site now shows each practice's stable identifier (`AR-FIND-01` and
  so on) and BCP 14 strength (`MUST` / `SHOULD` / `MAY`) from the spec
  source, and `/llms.txt` carries them too.
- New practices: `AR-FIND-04` AI Catalog at `/.well-known/ai-catalog.json`
  with ARD as the registry layer (MAY); `AR-ACT-07` WebMCP (MAY, previously
  on the site without an identifier); `AR-ACT-08` agent payments via
  x402 / MPP for per-call pricing and UCP / ACP for checkout, plus Stripe
  Link (Link on checkout and Shared Payment Tokens) for agents paying
  with a Link Agent Wallet (MAY), backed by Ora's October 2026 checkout
  study (92.3% of Link test checkouts done right);
  `AR-ACT-09` NLWeb `/ask` endpoint with an `ask` tool over MCP (MAY).
  These identifiers need matching rows in `spec/spec.md`.
- Hero scoreboard numbers (sites scanned, average score, share at grade B
  or above, grade split) are read from `ora.ai/api/stats` at build time
  instead of being hardcoded. The "action gap" and robots.txt figures are
  dated to the April 2026 report.
- The find section opens with what happens when agents cannot read a
  site, from Ora's AX is the New AEO study (1,056 business sites): the
  agent answers anyway, and those answers are 3.7× as likely to miss
  every fact asked for. `[STUDIES]` now also covers Ora research reports,
  each cited from its evidence block.
- `AR-FIND-01` now covers bot protection as well as robots.txt: let
  verified agents through the WAF or bot manager, and throttle with a
  `429` instead of a challenge page.
- New practice: `AR-READ-10` pricing on a first-party page (SHOULD),
  backed by pricing answers being 60% accurate from the business's own
  pages against 37% from elsewhere. Needs a matching row in
  `spec/spec.md`.
- The crawler notes name agent search APIs (Brave Search API, Exa,
  Parallel, Tavily) as a crawler kind the wildcard rule covers.
- Stripe joins the collaborators.
- Collaborator list unified to Ora, Vercel, Mintlify, and Auth0 across the
  page, metadata, JSON-LD, `/llms.txt`, and README.
- Ora CLI command corrected to `npx ax audit`.

---

## v1.0 — August 2026

First public version of **"Make your site readable by AI agents."**

The spec was restructured from five topic sections (Discoverability,
Content, Capabilities, Identity & Access, Commerce) into the order in
which agents encounter a site — find, read, act — with every requirement
grounded in the studies. Stable identifiers moved from `AR-DISC-*` /
`AR-CONT-*` / `AR-CAPA-*` / `AR-IDEN-*` / `AR-COMM-*` to `AR-FIND-*` /
`AR-READ-*` / `AR-ACT-*`; the old identifiers are retired, not reused.
Strengths (`MUST` / `SHOULD` / `MAY`) are now assigned from measurement:
the two changes that broke an agent in the studies are `MUST`, practices
that measurably shaped where agents went are `SHOULD`, emerging
conventions are `MAY`. Figures are tagged by source (`[STUDIES]` for
traced agent runs and the controlled experiment, `[ORA SCANNER]` for
reachability checks).

Removed in this restructure:

- The `/spec.json` machine-readable artifact (the markdown source in
  `spec/spec.md` is the machine-readable form for now).
- The baseline vs. conditional applicability model; applicability is
  stated in each requirement's text.

The v1.0.0 entry below is the version announced on March 20, 2026
([ora.ai/blog/agentready-open-standard](https://ora.ai/blog/agentready-open-standard))
and published on April 24, 2026.

---

# Historical: the AgentReady specification

AgentReady follows semantic versioning applied to normative commitments, not
to editorial text:

- **MAJOR** — an existing requirement's strength is raised (for example
  `SHOULD` to `MUST`), a requirement is removed, or a stable identifier is
  reassigned.
- **MINOR** — a requirement is added, an existing strength is lowered, or a
  reference is updated to a newer specification.
- **PATCH** — clarifications, editorial fixes, and link updates.

Stable identifiers (`AR-SECT-NN`) are preserved across versions and are the
canonical way to cite a requirement.

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
- Normative strength (`MUST` / `SHOULD` / `MAY` per BCP 14) on every
  requirement.
- Applicability model (`baseline` vs. conditional) on every requirement.
- Stable identifiers for every requirement, preserved across revisions.
- Conformance definition, including the treatment of Commerce as a set of
  alternative, interoperating protocols where at least one applies.
- Machine-readable artifact at [`/spec.json`](https://agentready.org/spec.json).
- Agent-readable summary at [`/llms.txt`](https://agentready.org/llms.txt).
- Versioning policy (`/#versioning`).

### Requirements

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
- `AR-CAPA-04` A2A Agent Card — **MUST** (conditional)
- `AR-CAPA-08` OpenAPI — **MUST** (conditional)
- `AR-CAPA-02` MCP Server Card — **SHOULD** (conditional)
- `AR-CAPA-03` MCP Apps — **MAY** (conditional)
- `AR-CAPA-05` WebMCP — **MAY** (conditional)
- `AR-CAPA-06` NLWeb /ask endpoint — **MAY** (conditional)
- `AR-CAPA-07` Agent Skills — **MAY** (conditional)
- `AR-CAPA-09` ai-plugin.json — **MAY** (conditional)

Identity & Access

- `AR-IDEN-02` OAuth 2.0 — **MUST** (conditional)
- `AR-IDEN-03` OAuth Authorization Server Metadata — **MUST** (conditional)
- `AR-IDEN-05` PKCE — **MUST** (conditional)
- `AR-IDEN-01` Web Bot Auth — **SHOULD** (baseline)
- `AR-IDEN-04` OAuth Protected Resource — **SHOULD** (conditional)
- `AR-IDEN-06` API Catalog — **MAY** (conditional)

Commerce

- `AR-COMM-01` x402 — **MAY** (conditional)
- `AR-COMM-02` Agentic Commerce Protocol (ACP) — **MAY** (conditional)
- `AR-COMM-03` ACP Delegate Payment — **MAY** (conditional)
- `AR-COMM-04` Universal Commerce Protocol (UCP) — **MAY** (conditional)
- `AR-COMM-05` Machine Payments Protocol (MPP) — **MAY** (conditional)

### Notes

- This is the first version that assigns normative strength. Earlier drafts
  of the page exposed the same requirements without applicability or
  strength; those drafts are not semver-tracked.
- Commerce requirements are intentionally all **MAY**; conformance in that
  section is defined as "at least one applicable requirement implemented,"
  reflecting the current state of the ecosystem where ACP, UCP, x402, and
  MPP each address the same underlying need through different designs.
- Requirements tagged `emerging` are expected to graduate to stable as
  their underlying specifications stabilize; a graduation is a PATCH-level
  change unless it also moves the strength.
