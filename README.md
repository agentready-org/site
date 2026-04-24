# agentready.org

The open, vendor-neutral standard for agent readiness.

The spec is published as a single page. Key anchors:

- `/#spec` — the check catalog, grouped by layer
- Individual checks are addressable by id, e.g. `/#check-mcp-server`

Deep Scan by Ora at [orank.ai](https://www.orank.ai) is an implementation of the
catalog.

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
    layout.tsx        # Root layout, fonts, metadata
    page.tsx          # The one-pager
    llms.txt/route.ts # Machine-readable site summary for AI agents
    robots.ts         # robots.txt (allowlist for AI crawlers)
    sitemap.ts        # sitemap.xml
    globals.css       # Tailwind + design tokens + scroll-smooth
    icon.svg          # Favicon
  components/
    navbar.tsx        # Sticky nav
    footer.tsx        # Compact footer
  lib/
    spec-data.ts      # The canonical LAYERS + helpers
```

`src/lib/spec-data.ts` is the single source of truth for the check catalog.

## Contributing

AgentReady is developed in the open. File issues and pull requests on this
repository; working sessions and proposal discussions happen on
[Discord](https://discord.gg/WKYedjmCu). New checks enter the catalog as
`bonus` so adoption can be observed before anything becomes core.

## License

MIT. See [LICENSE](./LICENSE).
