# Portfolio — working agreement

## How we work

Somya owns architecture, logic, and review. Claude Code writes the code.

- A phase or app gets a **reviewed spec before any code**. Specs are GitHub issues.
- Where an approved spec covers the work: implement it.
- Where no spec covers it: propose the approach first, implement once Somya says go.
- A single ticket doesn't need a spec — it needs a short plan in a comment before code.

## Ask before

- Committing or pushing.
- Rewriting history or force-pushing.
- Closing issues or PRs.
- Deleting or moving files outside the agreed scope.
- Anything touching real secrets or credentials.

## Security-relevant code

Applies to auth and sessions, data access and row scoping, API keys and secrets, and any
path where client input reaches the server.

- Explain it in plain language on the issue or PR — enough that Somya can defend it unaided.
- Test the negative cases, not just the happy path: user B cannot read or modify user A's
  data; unauthenticated access is rejected.

## The public trail is portfolio evidence

- Conventional commits with a scope, issue number in the subject:
  `feat(design-system): button primitive (#7)`.
- Write issues, resolutions, and PR descriptions for a reviewer who wasn't there.
- Every app README and case study carries the AI-assistance note — built with Claude Code;
  architecture, design, and review by Somya. Exact wording is set by the Phase 1 spec.

## Per-app docs

`apps/<app>/design.md`, created when the app is scaffolded, not before: interface
guidelines, then a motion table — element | trigger | property | duration | easing |
reasoning — then reduced-motion behaviour. Apps reference motion tokens from `tokens.css`
rather than restating durations and curves.

## Project shape (see SETUP.md for the full rationale)
- pnpm monorepo. Workspaces: `challenges/*`, `packages/*`, `apps/*`.
- `challenges/*` — buildless vanilla HTML/CSS/JS, plain CSS. Fundamentals reps only.
- `packages/design-system` — 15 atomic primitives, React + TS, CSS Modules, `tokens.css`, Storybook.
- `apps/*` — Vite + React + React Router SPAs, Tailwind v4. App-specific composites live in
  `apps/<app>/src/components/` and are built FROM `@portfolio/design-system`.
- Design tokens have ONE source: `packages/design-system/tokens.css` (CSS custom properties);
  Tailwind `@theme` maps to those same variables.

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues, managed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Multi-context layout: a root `CONTEXT-MAP.md` points at per-context `CONTEXT.md` files. See `docs/agents/domain.md`.

## Strategy notes

`./notes/` is gitignored and local-only — this repo is public. It holds the strategy handoff
behind the current plan; read its README first. Consult it for background, never copy its
contents into tracked files.
