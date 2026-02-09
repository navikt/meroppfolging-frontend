---
applyTo: "src/**/*.{ts,tsx,css}"
---

# Aksel + Tailwind rules

## Aksel-first

- Prefer Aksel components for layout and spacing.
- Do not introduce new Tailwind spacing utilities (`p-*`, `m-*`, `gap-*`, `space-x-*`, `space-y-*`) in Aksel layouts.
- If Tailwind spacing already exists in a file, it's ok to leave it unless you're already touching that layout; prefer refactoring toward Aksel over time.

## Tailwind allowed (when needed)

- Layout-only utilities are ok when Aksel cannot express the layout.
- Examples: `flex`, `grid`, `items-*`, `justify-*`, `max-w-*`, `w-*`, `h-*`.
- Do not use Tailwind for margins/padding/gaps when Aksel can do it.

## Aksel v8

- Use `@navikt/ds-css` (not `@navikt/ds-css/darkside`).
- Use `Box` (not `BoxNew`).
- Prefer `space-*` tokens for spacing when Aksel props allow it.
- Prefer `data-color` + standard variants, avoid deprecated variants.

## Boundaries

### Always
- Use Aksel components where possible.
- Use spacing tokens when using Aksel layout components.

### Ask first
- Large layout rewrites or custom CSS changes.
