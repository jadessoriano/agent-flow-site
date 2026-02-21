# AgentFlow Site

The official website and documentation for [AgentFlow](https://github.com/jadessoriano/agent-flow) — a visual AI agent pipeline builder for Claude Code.

**Live site:** [agentflow.dev](https://agentflow.dev)

## Overview

A statically exported Next.js site that serves as the landing page, documentation hub, and download portal for the AgentFlow desktop application.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, features, node types, architecture, tech stack |
| `/download` | Platform downloads (Windows, macOS, Linux) with versioned binaries |
| `/docs` | Documentation overview |
| `/docs/installation` | Prerequisites, system deps, build steps, dev mode |
| `/docs/configuration` | App settings, Claude CLI detection, Tauri/Vite config |
| `/docs/pipelines` | Pipeline JSON schema, validation, variable substitution |
| `/docs/node-types` | All 6 node types with props, examples, status tables |
| `/docs/agents` | Agent markdown format, management, IPC commands |
| `/docs/execution` | Execution flow, streaming, cancellation, resume logic |
| `/docs/cost-tracking` | Cost extraction, metrics, dashboard, usage stats |
| `/docs/keyboard-shortcuts` | Shortcut tables for execution, canvas, editing, panels |
| `/docs/best-practices` | Tips for cost efficiency, pipeline design, debugging |
| `/docs/example-pipeline` | Full CI/CD pipeline walkthrough using all 6 node types |
| `/docs/api-reference` | All IPC commands, events, database schema |
| `/docs/faq` | 16 frequently asked questions |

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, static export)
- **UI:** [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript 5
- **Deployment:** [Vercel](https://vercel.com/) (zero-config)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/jadessoriano/agent-flow-site.git
cd agent-flow-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Generates a static export in the `out/` directory, ready for deployment.

## Project Structure

```
agent-flow-site/
├── public/
│   ├── icon.svg              # SVG favicon
│   ├── robots.txt            # Search engine directives
│   └── sitemap.xml           # Sitemap for all pages
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with SEO metadata
│   │   ├── page.tsx          # Landing page
│   │   ├── not-found.tsx     # Custom 404
│   │   ├── globals.css       # Tailwind + custom theme
│   │   ├── download/
│   │   │   └── page.tsx      # Download page
│   │   └── docs/
│   │       ├── layout.tsx    # Docs shell (sidebar + content)
│   │       ├── page.tsx      # Docs overview
│   │       └── .../          # 12 doc pages
│   └── components/
│       ├── logo.tsx          # Reusable logo with SVG gradient
│       ├── navbar.tsx        # Landing page nav (desktop + mobile)
│       └── docs-layout.tsx   # Sidebar nav, Breadcrumb, CodeBlock, InfoBox, PropTable
├── next.config.ts            # Static export config
├── postcss.config.mjs        # Tailwind PostCSS plugin
└── tsconfig.json             # TypeScript config with @/* alias
```

## Deployment

### Vercel (recommended)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Next.js — no configuration needed
3. Deploys on every push to `main`

### Other Hosts

Run `npm run build` and serve the `out/` directory from any static host (Netlify, GitHub Pages, Cloudflare Pages, etc.).

## Updating Download Versions

Download links are managed by a single constant in `src/app/download/page.tsx`:

```tsx
const LATEST_VERSION = "0.1.0";
```

Update this value to point all download buttons at the new release. Filenames follow the patterns set in the `platforms` array in the same file.

## SEO

- Per-page `<title>` and `<meta description>` via Next.js metadata API
- Open Graph and Twitter Card tags on all pages
- JSON-LD structured data (SoftwareApplication schema) on the landing page
- Static `robots.txt` and `sitemap.xml` in `public/`
- Canonical URLs and `metadataBase` configured in root layout

> **Note:** Add a 1200x630 PNG at `public/og-image.png` for social media link previews.

## License

MIT
