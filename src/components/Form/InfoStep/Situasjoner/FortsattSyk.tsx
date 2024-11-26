import React, { ReactElement } from 'react'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import AlleredeSoktOmPengestotteExpansionCard from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'

export const FortsattSyk = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP) <ExternalLinkIcon title="åpner i ny fane" />
        </Link>{' '}
        (åpner i en ny fane), eller en annen økonomisk støtte. Merk at det er egne vilkår for å motta AAP, som du bør
        sette deg inn i før du søker.
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

      <BodyShort>
        <Link href="https://www.nav.no/start/soknad-aap" target="_blank" rel="noopener noreferrer">
          Gå til søknaden om AAP <ExternalLinkIcon title="åpner i ny fane" />
        </Link>{' '}
        (lenken åpner i en ny fane, husk å komme tilbake hit etterpå).
      </BodyShort>
    </>
  )
}
