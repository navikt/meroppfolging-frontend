# Copilot instructions for meroppfolging-frontend

## Scope

Store Copilot guidance under `./.github/`. `AGENTS.md` is allowed as the agent runbook, but avoid duplicating Copilot-specific rules outside `.github`.

## Quick map

- App Router: `src/app/*`
- Auth: `src/auth/*`
- Components: `src/components/*`
- Server: `src/server/*`
- Env validation: `src/constants/envs.ts`
- NAIS config: `nais/*`

## Stack

- Next.js App Router (version in `package.json`)
- React 19
- TypeScript
- Biome
- Vitest
- Aksel v8
- Tailwind v4
- Auth: OASIS + TokenX + IdPorten
- Logging: `@navikt/next-logger`

## Commands

```sh
pnpm run dev
pnpm run lint
pnpm run test --run
pnpm run build
# `.mise.toml` also defines `mise run verify`; its check tasks write fixes.
```

## Defaults

- Prefer Aksel components and spacing tokens.
- Tailwind is allowed only when Aksel cannot express the layout or a small one-off style.
- Keep RSC/client boundaries correct: add "use client" only when needed.
- Use `@navikt/next-logger` for server-side logs.

## Local specializations

Repository-specific Aksel, authentication, environment and UI rules are in
`.github/instructions/`. Read the matching path instructions instead of
selecting a duplicate local specialist role.

## Boundaries

### Always
- Keep RSC/client boundaries intact.
- Use env helpers for environment variables.

### Ask first
- Changes to auth flow (OASIS/TokenX/IdPorten).
- Changes to CSP/basePath handling.

### Never
- Log tokens, headers, or PII.
- Edit `.github/*` without explicit approval.

## Repository guidance

This repository owns its instructions, local specialists and issue/PR templates.
Update these files with verified repository facts when an authorized change
makes them stale. Shared agent roles and skills come from the selected
Grillmester plugin through nav-pilot; do not copy them into `.github/` or add a
file-sync workflow. Use the active client's catalog for exact callable IDs.
