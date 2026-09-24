# agentready.org

The open standard for agent readiness.

The site publishes **"Make your site readable by AI agents"** — the spec of
what a site should implement to be found, read, and used by AI agents, with
every requirement grounded in real agent runs and a controlled experiment.
A collaboration between Ora, Vercel, Mintlify, and Auth0.

The spec is published as a single page. Key anchors:

- `/#essentials` — compact checklist of what to ship
- `/#guide` — the spec's opening
- `/#reachable` — Be reachable and citable (find)
- `/#read` — Put the answer where agents read
- `/#act` — Let agents act, not just read
- `/#beyond` — Check your site (is-agentic.com, ora.ai, Mintlify Agent Score)
- `/#changelog` — spec version history

Machine-readable artifacts:

- `/llms.txt` — the spec's content in markdown, tuned for AI agents
- [`spec/spec.md`](https://github.com/agentready-org/standard/blob/main/spec/spec.md)
  — the spec's markdown source of truth
- [`data/`](https://github.com/agentready-org/standard/tree/main/data) — the
  dataset behind every `[STUDIES]` number, with a per-claim breakdown

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 via PostCSS
- Newsreader (serif) + IBM Plex Mono (mono)

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
    page.tsx           # The one-pager (spec prose, code samples, sections)
    llms.txt/route.ts  # Machine-readable spec summary for AI agents
    robots.ts          # robots.txt (allowlist for AI crawlers)
    sitemap.ts         # sitemap.xml
    globals.css        # Tailwind + design tokens + scroll-smooth
    icon.svg           # Favicon
  components/
    navbar.tsx         # Sticky nav
    footer.tsx         # Compact footer with partner logos
    partners.tsx       # Collaboration logo strip (Ora, Vercel, Mintlify, Auth0)
  lib/
    guide-data.ts      # Practice tables (AR ids, strengths) shared by the page and /llms.txt
    ora-stats.ts       # Build-time fetch of the hero numbers from ora.ai/api/stats
```

`src/lib/guide-data.ts` holds the spec's structured practice rows, each
with its stable identifier (`AR-FIND-01` and so on), BCP 14 strength
(MUST / SHOULD / MAY), and evidence tag (`[STUDIES]` / `[ORA SCANNER]`);
prose and code samples live in `src/app/page.tsx`.

The hero scoreboard reads `sitesScanned`, `avgScore`, `pctAboveB`, and the
grade distribution from `https://ora.ai/api/stats` at build time
(`src/lib/ora-stats.ts`). If the fetch fails, the build uses the snapshot in
that file and the caption says when it was last read. Redeploy to refresh.

## Versioning

The spec is versioned as a document (v1.0, August 2026). It was announced on
March 20, 2026 and first published as v1.0.0 on April 24, 2026 with five
topic sections and `AR-DISC-*`-style identifiers; v1.0 restructured it into
find / read / act with `AR-FIND-*`, `AR-READ-*`, and `AR-ACT-*` identifiers.
Scanner checks and weights may change independently of the spec; see
[`CHANGELOG.md`](./CHANGELOG.md) and [`/#changelog`](https://agentready.org/#changelog).

## Contributing

AgentReady is developed in the open. File issues and pull requests on this
repository, where discussion and proposals happen.

## License

MIT. See [LICENSE](./LICENSE).
