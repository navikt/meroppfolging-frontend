# Meroppfølging frontendapp

[![CI](https://github.com/navikt/meroppfolging-frontend/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/navikt/meroppfolging-frontend/actions/workflows/build-and-deploy.yaml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-lint%20%26%20format-60A5FA?logo=biome)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-test-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

Meroppfølging frontendapp er en Next.js-app for personer som er sykmeldt og nærmer seg slutten på sykepengeperioden. Appen viser maksdato for sykepenger, samler inn svar om situasjonen videre og lar brukeren be om oppfølging fra Nav.

## Formål

Appen er laget for privatpersoner som har fått tilgang til skjemaet fordi sykepengene snart tar slutt.

Brukeren kan:

- se informasjon om når sykepengene tar slutt
- svare på spørsmål om situasjonen når sykepengene er brukt opp
- be om oppfølging fra en veileder
- se kvittering hvis svar allerede er sendt inn

Hvis brukeren ikke har tilgang, viser appen en egen informasjonsside i stedet for skjemaet.

## Miljøer

- [Dev](https://www.ekstern.dev.nav.no/syk/meroppfolging/snart-slutt-pa-sykepengene)
- [Prod](https://www.nav.no/syk/meroppfolging/snart-slutt-pa-sykepengene)

Appen ligger bak base path `/syk/meroppfolging`. Eldre lenker under `/syk/info/snart-slutt-pa-sykepengene` videresendes til dagens URL i både dev og prod.

## Teknologier

- Next.js 15 med App Router og React 18
- TypeScript 5
- Aksel v8 (`@navikt/ds-react`) og Tailwind CSS v3
- `@navikt/oasis` for validering av IdPorten-token og TokenX-utveksling
- `@navikt/next-logger` for serverlogger
- Grafana Faro for klienttelemetri når `NEXT_PUBLIC_TELEMETRY_URL` er satt
- Zod for validering av miljøvariabler og API-data
- Vitest, Testing Library og `vitest-axe` for tester
- Biome for linting og formattering
- Lefthook for Git hooks
- NAIS og Docker `standalone`-build for deploy

## Arkitektur

```mermaid
flowchart LR
    U[Bruker] --> F[meroppfolging-frontend]
    F --> I[IdPorten sidecar + OASIS]
    F --> D[NAV-dekoratøren]
    F -->|TokenX OBO| M[meroppfolging-backend]
    F -->|TokenX OBO| S[sykepengedager-informasjon]
    F --> L[@navikt/next-logger]
    F --> T[Grafana Faro]
```

Kort fortalt:

- Appen rendrer skjermbildene i Next.js og bruker NAV-dekoratøren for header og footer.
- IdPorten-sidecar i NAIS håndterer innlogging. Appen validerer token med OASIS.
- Før kall til backendene veksler appen IdPorten-token til TokenX på vegne av brukeren.
- I `local` og `demo` brukes mock-data for status, maksdato og innsending.

## Backend-referanser

### [meroppfolging-backend](https://github.com/navikt/meroppfolging-backend)

Lagrer og henter brukerens svar i flyten for sen oppfølging.

- **GET** `/api/v2/senoppfolging/status`
- **POST** `/api/v2/senoppfolging/submitform`

### [sykepengedager-informasjon](https://github.com/navikt/sykepengedager-informasjon)

Leverer maksdato for sykepenger som vises i landingssiden og kvitteringen.

- **GET** `/api/v1/sykepenger/maxdate?isoformat=true`

`flexjar-backend` er satt opp i NAIS-manifestet med `accessPolicy` og miljøvariabler, men brukes ikke i applikasjonskoden per i dag.

## Kom i gang lokalt

Forutsetninger:

- Node.js 24
- pnpm 10

Slik jobber du lokalt:

1. Installer avhengigheter med pnpm.
2. Se oppdatert liste over scripts med `pnpm run`.
3. Start appen med repoets dev-script.
4. Åpne [http://localhost:3000/syk/meroppfolging/snart-slutt-pa-sykepengene](http://localhost:3000/syk/meroppfolging/snart-slutt-pa-sykepengene).

Nyttig å vite:

- `NEXT_PUBLIC_BASE_PATH` er `/syk/meroppfolging`.
- Påkrevde miljøvariabler valideres i `src/constants/envs.ts`.
- Testoppsettet bruker `.env.test`.
- Git hooks kjører Biome på staged filer før commit og `tsc --noEmit` før push.

## Drift og deploy

- CI og deploy styres av GitHub Actions-workflowen `build-and-deploy.yaml`.
- Appen deployes til NAIS i `dev` og `prod`.
- Helseendepunkter finnes på `/api/isAlive` og `/api/isReady` under base path.
- `POST /api/logger` videresender klientlogger via `@navikt/next-logger`.
- Filer i `public/` lastes opp til NAV CDN av en egen workflow.

## For Nav-ansatte

- Team: `team-esyfo`
- Kodeeiere: `@navikt/team-esyfo`
- Kontakt: [#esyfo på Slack](https://nav-it.slack.com/archives/C012X796B4L)
