# agentready.org

The open standard for agent readiness.

The site publishes **"Make your site readable by AI agents"** — the spec of
what a site should implement to be found, read, and used by AI agents, with
every requirement grounded in real agent runs and a controlled experiment.
A collaboration between Ora, Vercel, Stripe, Auth0, Mintlify, Tavily, Google,
Elementor, Netlify, Shopify, and Wix.

The spec is published as a single page. Key anchors:

- `/#essentials` — compact checklist of what to ship
- `/#guide` — the spec's opening
- `/#reachable` — Be reachable and citable (find)
- `/#read` — Put the answer where agents read
- `/#act` — Let agents act, not just read
- `/#beyond` — Check your site (is-agentic.com, ora.ai, Mintlify Agent Score,
  Tavily Agent Visibility Report, AXIS by Netlify)
- `/#changelog` — spec version history

Machine-readable artifacts:

- `/llms.txt` — the spec's content in markdown, tuned for AI agents
- [`spec/spec.md`](https://github.com/agentready-org/standard/blob/main/spec/spec.md)
  — the spec's markdown source of truth
- [`data/`](https://github.com/agentready-org/standard/tree/main/data) — the
  dataset behind the trace and experiment `[STUDIES]` numbers, with a
  per-claim breakdown

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
npm run check:spec            # Fail if the page disagrees with the pinned spec (also runs before build)
npm run sync:spec             # Pin the latest spec release
npm run sync:spec -- v2.1.0   # Pin a specific release
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
    opengraph-image.tsx  # Share image with the collaborator logos
    twitter-image.tsx  # Re-exports the share image for X
    fonts/             # Newsreader and IBM Plex Mono for the share image
  components/
    navbar.tsx         # Sticky nav
    footer.tsx         # Compact footer with partner logos
    partners.tsx       # Collaboration logos, also used by the share image
  spec/
    practices.json     # Pinned copy of the spec release's practices.json (never edit by hand)
  lib/
    spec.ts            # Reads the pinned spec: version, level(id), requirement(id)
    guide-data.ts      # Practice tables (AR ids, site copy) shared by the page and /llms.txt
    ora-stats.ts       # Build-time fetch of the hero numbers from ora.ai/api/stats
```

`src/lib/guide-data.ts` holds the spec's structured practice rows, each
with its stable identifier (`AR-FIND-01` and so on) and evidence tag
(`[STUDIES]` / `[ORA SCANNER]`); prose and code samples live in
`src/app/page.tsx`.

### Staying consistent with the spec

[agentready-org/standard](https://github.com/agentready-org/standard) is the
source of truth. Each release publishes `spec/practices.json`, generated from
the tables in `spec.md`, and this site pins one release in
`src/spec/practices.json`:

- The version, date, and every MUST / SHOULD / MAY on the page and in
  `/llms.txt` come from that file. Write `level("AR-READ-02")`, never the
  level itself.
- `scripts/check-spec.mjs` runs before every build and fails if the site
  mentions an identifier the release lacks or has retired, leaves out one of
  its requirements, or shows a hand-typed level that disagrees with it.
  Wording stays editorial.
- CI also checks the pinned file byte for byte against its release.
- A daily workflow (`spec-bump.yml`) opens a PR when a newer release
  appears. A release that adds or retires a requirement fails that PR's build
  until the page covers it.

The hero scoreboard reads `sitesScanned`, `avgScore`, and the grade
distribution from `https://ora.ai/api/stats` at build time
(`src/lib/ora-stats.ts`), and shows the share of sites at grade A or above,
"<1%" while it is under one percent. If the fetch fails, the build uses the
snapshot in that file and the caption says when it was last read. Redeploy
to refresh.

## Versioning

The spec is versioned as a document; the site shows the release pinned in
`src/spec/practices.json` (v2.0.1, November 2026). It was announced on
March 20, 2026 and first published as v1.0.0 on April 24, 2026 with five
topic sections and `AR-DISC-*`-style identifiers; v1.0 (August 2026)
restructured it into find / read / act with `AR-FIND-*`, `AR-READ-*`, and
`AR-ACT-*` identifiers; v2.0 made an MCP server or a CLI a `MUST` for
products agents act on (`AR-ACT-10`).
Scanner checks and weights may change independently of the spec; see
[`CHANGELOG.md`](./CHANGELOG.md) and [`/#changelog`](https://agentready.org/#changelog).

## Contributing

AgentReady is developed in the open. File issues and pull requests on this
repository, where discussion and proposals happen.

## License

MIT. See [LICENSE](./LICENSE).
