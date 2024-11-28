import React, { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import AlleredeSoktOmPengestotteExpansionCard from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const FortsattSyk = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <TrackedExternalLink href="https://www.nav.no/aap">arbeidsavklaringspenger (AAP)</TrackedExternalLink>, eller en
        annen økonomisk støtte. Merk at det er egne vilkår for å motta AAP, som du bør sette deg inn i før du søker.
      </BodyShort>
      <BodyShort>
        <b>Du må selv søke om AAP eller annen økonomisk støtte.</b> Dette skjer ikke automatisk.
      </BodyShort>
      <AlleredeSoktOmPengestotteExpansionCard />
      <BodyShort>
        Du må være forberedt på å gå ned i inntekt når sykepengene tar slutt. Dette er fordi våre andre støtteordninger
        ikke gir like mye utbetalt som sykepenger. Husk at du også kan ha rettigheter hos forsikringsselskapet eller
        pensjonskassen din.
      </BodyShort>
      <BodyShort>
        Veileder kan hjelpe deg med å finne ut hvilken økonomisk støtte som kan være aktuelt for deg, og med
        søkeprosessen.
      </BodyShort>
      <Alert variant="info">
        <Heading size="xsmall" level="3">
          Saksbehandlingstiden for AAP-søknader er omtrent 15 uker.
        </Heading>
        <BodyShort className="mb-2">
          Hvis du bor eller oppholder deg i et annet EØS-land og får oppfølging av Nav utland, så er
          saksbehandlingstiden for AAP-søknader betydelig lenger.
        </BodyShort>
        <BodyShort>Husk å søke tidlig nok.</BodyShort>
      </Alert>
    </>
  )
}
