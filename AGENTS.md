# meroppfolging-frontend agents guide

Start with one primary agent. If a task spans multiple domains, either switch primary agent or delegate explicitly, but avoid conflicting guidance.

## Quick map

- App Router: `src/app/*`
- Auth: `src/auth/*`
- Components: `src/components/*`
- Server: `src/server/*`
- Env validation: `src/constants/envs.ts`
- NAIS config: `nais/*`

## Commands

```sh
npm run dev
npm run lint
npm test
npx tsc --noEmit
```

## Defaults

- Prefer Aksel components and spacing tokens.
- Use Tailwind only when Aksel cannot express a layout or a small one-off style.
- Log with `@navikt/next-logger` on the server; avoid `console.*` in app code.

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
