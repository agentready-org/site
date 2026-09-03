# agentready.org

The open standard for agent readiness.

The site publishes **"Make your site readable by AI agents"** — a practical
guide to making your website work for the agents that now read it, grounded
in real agent runs and a controlled experiment. A collaboration between Ora,
Vercel, Mintlify, Auth0, and Stripe.

The guide is published as a single page. Key anchors:

- `/#essentials` — compact checklist of what to ship
- `/#beyond` — Check your site (is-agentic.com and ora.ai)
- `/#guide` — the guide's opening
- `/#reachable` — Be reachable and citable (find)
- `/#read` — Put the answer where agents read
- `/#act` — Let agents act, not just read
- `/#changelog` — guide version history

Machine-readable artifacts:

- `/llms.txt` — the guide's content in markdown, tuned for AI agents
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
    page.tsx           # The one-pager (guide prose, code samples, sections)
    llms.txt/route.ts  # Machine-readable guide summary for AI agents
    robots.ts          # robots.txt (allowlist for AI crawlers)
    sitemap.ts         # sitemap.xml
    globals.css        # Tailwind + design tokens + scroll-smooth
    icon.svg           # Favicon
  components/
    navbar.tsx         # Sticky nav
    footer.tsx         # Compact footer with partner logos
    partners.tsx       # Collaboration logo strip (Ora, Vercel, Mintlify, Auth0, Stripe)
  lib/
    guide-data.ts      # Practice tables shared by the page and /llms.txt
```

`src/lib/guide-data.ts` holds the guide's structured practice rows and
their evidence tags (`[STUDIES]` / `[ORA SCANNER]`); guide prose and code
samples live in `src/app/page.tsx`.

## Versioning

The guide is versioned as a document (v1.0, August 2026). Checks and
recommendations are revised as new agent behavior is measured; see
[`CHANGELOG.md`](./CHANGELOG.md) and [`/#changelog`](https://agentready.org/#changelog).

## Contributing

AgentReady is developed in the open. File issues and pull requests on this
repository, where discussion and proposals happen.

## License

MIT. See [LICENSE](./LICENSE).
