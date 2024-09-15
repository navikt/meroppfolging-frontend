import { ReactElement } from 'react'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

function FortsattSykInformasjon(): ReactElement {
  return (
    <>
      <BodyShort spacing>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP) <ExternalLinkIcon />
        </Link>{' '}
        (åpner i ny fane), eller en annen økonomisk støtte.
      </BodyShort>
      <BodyShort spacing>
        <b>Du må selv søke om AAP eller annen økonomisk støtte.</b> Dette skjer ikke automatisk.
      </BodyShort>
      <BodyShort spacing>
        Du må være forberedt på å gå ned i inntekt når sykepengene tar slutt. Dette er fordi våre andre støtteordninger
        ikke gir like mye utbetalt som sykepenger. Husk at du også kan ha rettigheter hos forsikringsselskapet eller
        pensjonskassen din.
      </BodyShort>
      <BodyShort spacing>
        Veileder kan hjelpe deg med å finne ut hvilken økonomisk støtte som kan være aktuelt for deg, og med
        søkeprosessen.
      </BodyShort>
      <Alert variant="info" className="mb-6">
        <Heading size="xsmall" level="3">
          Saksbehandlingstiden på AAP-søknader er beregnet til 15 uker.
        </Heading>
        Søk tidlig nok slik at du sikrer at du har inntekt etter at sykepengene tar slutt.
      </Alert>

      <BodyShort>
        <strong>
          <Link href="https://www.nav.no/start/soknad-aap" target="_blank" rel="noopener noreferrer">
            Gå til søknaden om AAP <ExternalLinkIcon />
          </Link>
        </strong>{' '}
        (åpner i ny fane).
      </BodyShort>
    </>
  )
}

export default FortsattSykInformasjon
