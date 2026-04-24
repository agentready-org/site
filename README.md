# agentready.org

The open, vendor-neutral standard for agent readiness.

The spec is published as a single page. Key anchors:

- `/#spec` — the specification, grouped by section
- `/#conformance` — what it means to claim AgentReady conformance
- `/#versioning` — rules for MAJOR / MINOR / PATCH bumps
- Individual entries are addressable by slug, e.g. `/#mcp`
- Entries are also citable by stable identifier, e.g. `AR-CAPA-01`

Machine-readable artifacts:

- `/spec.json` — the canonical machine-readable spec
- `/llms.txt` — a summary tuned for AI agents

Deep Scan by Ora at [orank.ai](https://www.orank.ai) is a public implementation
that checks any site against the current spec.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 via PostCSS
- Lora (serif) + Space Mono (mono)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

```bash
npm run dev    # Next dev server
npm run build  # Production build
npm run start  # Run the built app
npm run lint   # ESLint via eslint-config-next
```

## Structure

```
src/
  app/
    layout.tsx         # Root layout, fonts, metadata
    page.tsx           # The one-pager
    llms.txt/route.ts  # Machine-readable site summary for AI agents
    spec.json/route.ts # Machine-readable specification artifact
    robots.ts          # robots.txt (allowlist for AI crawlers)
    sitemap.ts         # sitemap.xml
    globals.css        # Tailwind + design tokens + scroll-smooth
    icon.svg           # Favicon
  components/
    navbar.tsx         # Sticky nav
    footer.tsx         # Compact footer
  lib/
    spec-data.ts       # Canonical SECTIONS + entries (source of truth)
```

`src/lib/spec-data.ts` is the single source of truth for the specification.
Stable identifiers (`AR-SECT-NN`), applicability (baseline vs. conditional),
and normative strength (`MUST` / `SHOULD` / `MAY` per BCP 14) live here.

## Versioning

AgentReady follows semantic versioning applied to normative commitments, not
editorial text. See [`CHANGELOG.md`](./CHANGELOG.md) for the full history and
[`/#versioning`](https://agentready.org/#versioning) for the policy.

## Contributing

AgentReady is developed in the open. File issues and pull requests on this
repository; working sessions and proposal discussions happen on
[Discord](https://discord.gg/WKYedjmCu). New entries join the spec as
`emerging` so adoption can be observed before they stabilize.

## License

MIT. See [LICENSE](./LICENSE).
