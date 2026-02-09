# Copilot instructions for meroppfolging-frontend

## Scope

Store Copilot guidance under `./.github/`. `AGENTS.md` is allowed as the agent runbook, but avoid duplicating Copilot-specific rules outside `.github`.
Prefer one primary agent per task. If needed, switch primary agent or delegate explicitly, but avoid conflicting guidance.

## Stack

- Next.js App Router (Next 15)
- React 18
- TypeScript
- ESLint + Prettier
- Vitest
- Aksel v8
- Tailwind (v3)
- Auth: OASIS + TokenX + IdPorten
- Logging: `@navikt/next-logger`

## Commands

```sh
npm run dev
npm run lint
npm test
npx tsc --noEmit
```

## Defaults

- Prefer Aksel components and spacing tokens.
- Tailwind is allowed only when Aksel cannot express the layout or a small one-off style.
- Keep RSC/client boundaries correct: add "use client" only when needed.
- Use `@navikt/next-logger` for server-side logs.

## Use these agents when relevant

- `aksel-agent`: Aksel components and spacing tokens (v8).

