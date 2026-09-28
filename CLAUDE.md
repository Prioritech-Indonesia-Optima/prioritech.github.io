# Prioritech Indonesia Optima — Landing Site

## What this is
A statically-exported Next.js 14 marketing site for **Prioritech Indonesia Optima**, an Indonesian AI & engineering company. Lives at `prioritech.github.io`.

## What it's for
Showcases the company and its 5 engineering divisions (AI Systems & Orchestration, Cybersecurity Intelligence, Quantitative Engineering, Automation & Robotics, Applied Product Engineering), plus interactive demos of case-study projects (finance, fraud detection, robotics, threat graphs, etc.).

The Next.js app lives in `frontend/`. **Always `cd frontend` before running npm scripts.**

## Tech stack
- Next.js 14.2.25 (App Router) — `output: 'export'` (static site, no server runtime)
- TypeScript, React 18
- Tailwind CSS 4 + shadcn/ui + Radix UI
- framer-motion / motion for animations
- lucide-react for icons
- Geist Sans/Mono fonts
- sharp + critters for build-time image and CSS optimization

## Architecture (under `frontend/`)
- `app/` — App Router pages (home, about, divisions, projects, tech, contact) + `layout.tsx`, `sitemap.ts`, `robots.ts`
- `components/common/` — Navbar, Footer, PageHero, SplashScreen, ResourceHints
- `components/projects/demos/` — 12 interactive demos (messenger-style chat UIs, charts, graphs)
- `components/projects/shared/` — reusable demo primitives
- `components/aceternity/` — advanced visual components
- `components/ui/` — shadcn/ui base components
- `lib/` — utilities: `animations.ts` (useInView, useParallax hooks), `structured-data.ts` (SEO schema), `logo-bounds.ts`, helpers
- `scripts/` — build-time scripts: `optimize-images.js`, `generate-responsive-images.js`, `precompute-logo-bounds.js`
- `public/` — static assets, logo WebP variants (450w/900w/1800w), `manifest.json`
- `styles/` — global CSS
- `next.config.mjs` — static export config, chunk splitting (244KB max), modularized lucide-react imports, `optimizeCss` (Critters), `removeConsole` in prod

## Design bible (ui-ux-pro-max)
- **Every UI decision must go through the `ui-ux-pro-max` skill** at `.prioricode/skills/ui-ux-pro-max/` — it is the bible for style, color, typography, motion, accessibility, and stack guidance.
- Before any UI change, read `design-system/prioritech/MASTER.md` (the persisted source of truth; page overrides live in `design-system/prioritech/pages/`).
- Run targeted lookups from the repo root, e.g.:
  `python3 .prioricode/skills/ui-ux-pro-max/scripts/search.py "focus not obscured" --domain ux`
- Deliver UI only after passing the skill's Pre-Delivery Checklist (contrast 4.5:1, visible focus, `prefers-reduced-motion`, no emoji icons, `cursor-pointer`).

## Design system
- **Dark-first.** Default theme is near-black `#0a0a0a` + gold `#daa520` accent + silver `#e8e8e8` text (tokens in `frontend/app/globals.css`). Light mode is cream `#f5f1e8` + ink `#121212`; full-orange surfaces are retired. Gold is accent-only — never body text on cream (use `#7a5c0e` there).
- Panels over the 3D canvas are solid (≥85% opacity + hairline border); backdrop-blur is reserved for sticky chrome (navbar/footer/modal).
- One shared three.js scroll engine (`components/three/`) renders the wireframe terrain on all pages — extend via `sceneConfigs.ts`, don't fork new scenes.
- Mobile-first responsive: 320px / 768px / 1024px breakpoints

## Local development
```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # runs: optimize:images → generate:images → precompute:bounds → next build
npm run lint
```
The build is multi-stage: image scripts must run before `next build` or the responsive image references will be stale. `build:analyze` runs the build with bundle analyzer.

## Deployment
- **Target**: GitHub Pages (`prioritech.github.io`)
- **Trigger**: push to `main` (or manual `workflow_dispatch`)
- **Workflow**: `.github/workflows/deploy.yml`
- **Pipeline**: checkout → Node 20 → `npm ci` in `frontend/` → `npm run build` → upload `frontend/out` → `actions/deploy-pages@v4`
- Output dir: `frontend/out/` (gitignored)
- Static export means no API routes, no server components doing runtime work, no `next/image` optimization at runtime (`images.unoptimized: true`). All optimization is at build time.

## Things to know before changing code
- `typescript.ignoreBuildErrors: true` in `next.config.mjs` — type errors won't fail the build; check `npm run lint` and type-check manually.
- Any new image asset should go through `scripts/optimize-images.js` / `generate-responsive-images.js` or follow the same WebP + responsive-size pattern used for logos.
- Use `lib/animations.ts` hooks rather than rolling new IntersectionObserver / scroll logic.
- Use `lib/structured-data.ts` helpers for SEO schema rather than hand-writing JSON-LD.
- Prefer CSS animations over framer-motion for splash/hero-critical paths (see `SplashScreen.tsx`).
