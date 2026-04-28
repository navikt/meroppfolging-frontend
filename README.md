# Meroppfølging frontendapp

[![CI](https://github.com/navikt/meroppfolging-frontend/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/navikt/meroppfolging-frontend/actions/workflows/build-and-deploy.yaml)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-lint%20%26%20format-60A5FA?logo=biome)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-test-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

Meroppfølging frontendapp er en Next.js-app for personer som er sykmeldt og nærmer seg slutten på sykepengeperioden. Appen viser maksdato for sykepenger, samler inn svar om situasjonen videre og lar brukeren be om oppfølging fra Nav.

## Miljøer

🚀 [Produksjon](https://www.nav.no/syk/meroppfolging/snart-slutt-pa-sykepengene)

🛠️ [Utvikling](https://www.ekstern.dev.nav.no/syk/meroppfolging/snart-slutt-pa-sykepengene)

🎬 [Demo](https://demo.ekstern.dev.nav.no/syk/meroppfolging/snart-slutt-pa-sykepengene)

Appen ligger bak **basePath**[^basepath]. Eldre lenker under `/syk/info/snart-slutt-pa-sykepengene` videresendes til dagens URL i både dev og prod.

## Formålet med appen

Appen er laget for privatpersoner som har fått tilgang til skjemaet fordi sykepengene snart tar slutt.

Brukeren kan:

- se informasjon om når sykepengene tar slutt
- svare på spørsmål om situasjonen når sykepengene er brukt opp
- be om oppfølging fra en veileder
- se kvittering hvis svar allerede er sendt inn

Hvis brukeren ikke har tilgang, viser appen en egen informasjonsside i stedet for skjemaet.

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

## Backend-referanser

### [meroppfolging-backend](https://github.com/navikt/meroppfolging-backend)

Lagrer og henter brukerens svar i flyten for sen oppfølging.

- **GET** `/api/v2/senoppfolging/status`
- **POST** `/api/v2/senoppfolging/submitform`

### [sykepengedager-informasjon](https://github.com/navikt/sykepengedager-informasjon)

Leverer maksdato for sykepenger som vises i landingssiden og kvitteringen.

- **GET** `/api/v1/sykepenger/maxdate` (`?isoformat=true` legges til i appkoden)

`flexjar-backend` er satt opp i NAIS-manifestet med `accessPolicy` og miljøvariabler, men brukes ikke i applikasjonskoden per i dag.

## Utvikling (kjøre lokalt)

For å komme i gang med å bygge og kjøre appen, se vår [Wiki for frontendapper](https://navikt.github.io/team-esyfo/utvikling/frontend/).

**basePath**[^basepath] `/syk/meroppfolging`

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#esyfo](https://nav-it.slack.com/archives/C012X796B4L).

---

[^basepath]: `basePath`-verdien settes i Next.js-konfigurasjonen i `next.config.js` og angir URL-prefikset som hele appen lever under.
