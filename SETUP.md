# Portfolio — Architecture & Setup

A single pnpm monorepo for working through the 66 GreatFrontend challenges (Design System,
Marketing, E-commerce, Mini-apps) and combining them into a portfolio. The structure serves a
learning curriculum that goes raw HTML/CSS/JS → React → tooling/performance, while staying
atomic and segregated.

## Decisions (and why)

| Area | Decision | Why |
|---|---|---|
| Repo shape | Single monorepo, **pnpm workspaces** | The only setup that teaches "package manager workspaces" and lets things actually combine into one portfolio. |
| Vanilla challenges | **Buildless** (plain `index.html` + `css/` + `js/`, ES modules) | The "learn the platform" items (DOM/fetch/storage, raw CSS) must not be hidden by a bundler. |
| Layering | 3 layers: primitives → composites → products | Keeps the design system atomic; composites and apps stay segregated. |
| App framework | **Vite + React + React Router** SPAs | Vite is a teachable bundler; perf items are learned by hand. Matches GreatFrontend's framework-agnostic solutions. |
| Styling | Plain CSS (challenges) · **CSS Modules + tokens** (design-system) · **Tailwind v4** (apps) | Each layer uses the model that best teaches its purpose; "css architecture" is exercised in the design system. |
| Design tokens | **One source**: `design-system/tokens.css` as CSS variables; Tailwind `@theme` maps to them | Prevents palette/spacing drift across the three styling systems. |
| DS workbench | **Storybook** in `packages/design-system` | Standard component workbench + living docs + a portfolio artifact. |
| Language | **TypeScript** in `packages/*` and `apps/*`; vanilla JS in `challenges/*` | TS is the "type checking" item; challenges stay raw. |
| Lint/format | **ESLint (flat) + Prettier**, shared at root | "linting and formatting" item; broad React ecosystem coverage. |
| Unit tests | **Vitest + React Testing Library + jsdom** | "unit testing" item. |
| E2E | **Playwright** against full apps | "end-to-end tests" item. |
| Bundling | **Vite** per app; **Vite library mode** for design-system `dist/` | "bundling" item; apps still consume DS from TS source in dev. |
| Performance | fonts (`font-display`/`preload`/`@fontsource`), images (`srcset`/lazy/`aspect-ratio`/modern formats), code (`React.lazy` + `import()` + `manualChunks`) | The three perf items, practiced in apps. |
| Git/CI | One repo at root; GitHub Actions: install → typecheck → lint → unit → build → e2e | Good practice; gates the workspace. |

## Folder shape

```
Portfolio/
├─ pnpm-workspace.yaml   package.json   tsconfig.base.json
├─ eslint.config.js   .prettierrc   .gitignore   .github/workflows/ci.yml
├─ challenges/                 # buildless vanilla, plain CSS — fundamentals reps
│   ├─ badge-component/        # migrated from "Design System/badge-component"
│   └─ testimonial-card/       # migrated (double nesting flattened)
├─ packages/
│   └─ design-system/          # 15 atomic primitives · React+TS · CSS Modules · tokens.css · Storybook
│       └─ src/                #   Badge, Button, Input, Textarea, Checkbox, RadioCards, Toggle,
│                              #   Tabs, TabMenu, Tooltip, Dropdown, Pagination, Modal, Toast, Navbar
└─ apps/
    ├─ marketing/   e-commerce/   chat-ai/ (+ other mini-apps)   portfolio/
        └─ src/components/      # app composites (Tailwind) built from @portfolio/design-system
```

## Three layers (resolves the "how do small pieces fit into apps" question)

1. **Atomic primitives** — the 15 Design System challenges → `packages/design-system` (React+TS).
   Reused everywhere via `import { Button } from "@portfolio/design-system"`.
2. **App-specific composites** — testimonial card, hero, pricing, product card, cart line, etc.
   → co-located in `apps/<app>/src/components/`, built FROM primitives. Segregated per product.
3. **Products / mini-apps** — full sites/apps in `apps/*` that compose composites + primitives.

Plus **fundamentals reps** in `challenges/`: a few buildless drills (e.g. testimonial card for
HTML/CSS, order-success-section for JS events). These are throwaway learning, not imported.
Each challenge has exactly one home based on the skill it teaches, so there is no mass duplication.

## Track → home

- **Design System (15)** → `packages/design-system` (atomic, React+TS).
- **Marketing (25)** → composite sections in `apps/marketing/src/components/`; pages + full site = the app.
- **E-commerce (14)** → composites in `apps/e-commerce/src/components/`; full site = the app.
- **Mini-apps (12)** → each its own `apps/<mini-app>` (settings-family can share one Settings app).

## Cleanups before/while scaffolding

- Migrate `Design System/badge-component/` → `challenges/badge-component/`.
- Migrate `testimonial-card/testimonial-card/` → `challenges/testimonial-card/` (flatten nesting).
- Move the `*.fig` files alongside their challenge (e.g. `challenges/<name>/designs/`).
- **Delete the old `Design System/` folder** so "design-system" means only the React package.

## Learning sequence

- **P0** Scaffold monorepo (pnpm, root configs, git) + migrate existing two challenges.
- **P1** `challenges/` buildless reps → HTML semantics/images/forms, CSS basics→architecture, JS events/DOM/fetch/storage.
- **P2** `packages/design-system` + Storybook + `tokens.css` → 15 primitives (React basics/components/events/forms/effects, TS, CSS Modules, unit tests).
- **P3** `apps/marketing` → composites + landing page (React Router, Tailwind, 3 perf items, Playwright).
- **P4** `apps/e-commerce`, then mini-apps (Chat AI…).
- **P5** `apps/portfolio` umbrella.

## Working mode

Somya owns architecture, logic, and review; Claude Code writes the code. The approval gate
sits at the **spec**, not at every keystroke: a phase or app gets a reviewed spec — as a
GitHub issue — before any code, and work an approved spec already covers gets implemented
without further prompting.

Guidance-only mode (no code unless the user said "implement") was retired because the
review effort it bought was going on relaying commands rather than on architecture. The
guardrails it was protecting moved to the spec gate and to a short list of
always-ask actions. See `CLAUDE.md` for the operative rules.
