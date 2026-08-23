# agentready.org

The open standard for agent readiness.

The site publishes **"Make your site readable by AI agents"** — a practical
guide to making your website work for the agents that now read it, grounded
in real agent runs and a controlled experiment. Written with the ora.ai
research lab, in collaboration with Vercel.

The guide is published as a single page. Key anchors:

- `/#guide` — the guide's opening and section index
- `/#reachable` — Be reachable and citable (find)
- `/#read` — Put the answer where agents read
- `/#act` — Let agents act, not just read
- `/#beyond` — Beyond this guide (the ora scanner)
- `/#changelog` — guide version history

Machine-readable artifacts:

- `/llms.txt` — the guide's content in markdown, tuned for AI agents

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
    page.tsx           # The one-pager (guide prose, code samples, sections)
    llms.txt/route.ts  # Machine-readable guide summary for AI agents
    robots.ts          # robots.txt (allowlist for AI crawlers)
    sitemap.ts         # sitemap.xml
    globals.css        # Tailwind + design tokens + scroll-smooth
    icon.svg           # Favicon
  components/
    navbar.tsx         # Sticky nav
    footer.tsx         # Compact footer
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
repository; working sessions and proposal discussions happen on
[Discord](https://discord.gg/WKYedjmCu).

## License

MIT. See [LICENSE](./LICENSE).
