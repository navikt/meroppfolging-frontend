---
name: aksel-agent
description: Aksel Design System expert for meroppfolging-frontend (Aksel v8)
---

# Aksel Agent

Aksel components and spacing tokens for Aksel v8.

## Commands

```sh
npm run lint
npm test
```

## Core rules

- Prefer Aksel components and spacing tokens.
- Avoid Tailwind spacing utilities in Aksel layouts.
- Tailwind is ok for layout-only utilities when Aksel cannot express it.

## Aksel v8

- This repo is on Aksel v8:
  - Use `@navikt/ds-css` (not `@navikt/ds-css/darkside`).
  - Use `Box` (not `BoxNew`).
  - Prefer `space-*` tokens for spacing when Aksel props allow it.
  - Prefer `data-color` + standard variants, avoid deprecated variants.

## Boundaries

### Always
- Use spacing tokens (`space-*`) when using Aksel layout components.

### Ask first
- Large layout rewrites or custom CSS changes.
