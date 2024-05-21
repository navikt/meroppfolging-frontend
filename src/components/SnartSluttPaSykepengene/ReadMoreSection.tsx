import { BodyLong, Box, Heading, Link, List } from '@navikt/ds-react'
import { ReactElement } from 'react'

function ReadMoreSection(): ReactElement {
  return (
    <>
      <Box>
        <Heading size="medium" level="2" spacing>
          Aktuell informasjon
        </Heading>
        <List>
          <List.Item>
            <Link href="https://www.nav.no/syk-lenge" target="_blank" rel="noopener noreferrer">
              Mulighetene dine fremover
            </Link>
          </List.Item>

          <List.Item>
            <Link href="http://arbeidsplassen.no/" target="_blank" rel="noopener noreferrer">
              Utlyste ledige stillinger på arbeidsplassen.no
            </Link>
          </List.Item>

          <List.Item>
            <Link
              href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/friskmelding-til-arbeidsformidling"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sykepenger mens du søker ny jobb
            </Link>
          </List.Item>

          <List.Item>
            <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
              Om AAP og om hvordan du kan søke
            </Link>
          </List.Item>
        </List>
      </Box>
      <Box>
        <Heading size="medium" level="2" spacing>
          Er du usikker?
        </Heading>
        <BodyLong size="medium">
          Har du spørsmål du ikke finner svar på her, for eksempel om sykepenger,{' '}
          <Link href="https://www.nav.no/person/kontakt-oss/nb/" target="_blank" rel="noopener noreferrer">
            ta kontakt med NAV.
          </Link>
        </BodyLong>
      </Box>
    </>
  )
}

export default ReadMoreSection
