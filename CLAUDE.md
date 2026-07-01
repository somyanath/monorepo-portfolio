# Portfolio — working agreement

## Guidance-only mode (IMPORTANT)
Unless the user explicitly says the word **"implement"**, do **not** make code changes,
create/move/delete project files, or run mutating commands. The user is building this
project entirely by themselves and wants Claude Code only for **guidance** — explanations,
reviews, runbooks, and step-by-step instructions they execute on their own.

- Default: explain and guide. Show commands/snippets for the user to run, don't run them.
- Only when the user says **"implement"** (for a given task) may Claude write or modify code
  for that task. The permission applies to that task only, not future ones.
- Writing docs the user explicitly asks for (e.g. SETUP.md) and editing this config are allowed.

## Project shape (see SETUP.md for the full rationale)
- pnpm monorepo. Workspaces: `challenges/*`, `packages/*`, `apps/*`.
- `challenges/*` — buildless vanilla HTML/CSS/JS, plain CSS. Fundamentals reps only.
- `packages/design-system` — 15 atomic primitives, React + TS, CSS Modules, `tokens.css`, Storybook.
- `apps/*` — Vite + React + React Router SPAs, Tailwind v4. App-specific composites live in
  `apps/<app>/src/components/` and are built FROM `@portfolio/design-system`.
- Design tokens have ONE source: `packages/design-system/tokens.css` (CSS custom properties);
  Tailwind `@theme` maps to those same variables.
