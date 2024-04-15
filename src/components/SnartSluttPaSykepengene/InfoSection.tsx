import { Accordion, BodyLong, BodyShort, Box, Heading, List } from '@navikt/ds-react'
import { ReactElement } from 'react'

function InfoSection(): ReactElement {
  return (
    <>
      <Box>
        <Heading size="medium" level="2" spacing>
          Er du fortsatt syk?
        </Heading>
        <BodyShort spacing>
          Hvis du ikke er frisk nok til å gå tilbake til jobb, kan du søke om arbeidsavklaringspenger (AAP) eller en
          annen økonomisk støtte.
        </BodyShort>
        <BodyShort spacing>Du må selv søke om dette i god tid før sykepengene tar slutt.</BodyShort>
        <BodyShort>Du kan også ha rettigheter hos forsikringsselskapet eller pensjonskassen din.</BodyShort>
      </Box>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Kan du gå tilbake til jobben din?</Accordion.Header>
          <Accordion.Content>
            <BodyLong size="medium">
              Arbeidsgiveren din skal, så langt det er mulig, tilpasse arbeidsplassen og oppgavene dine slik at du kan
              jobbe.
            </BodyLong>
            <List as="ul">
              <List.Item>Snakk med lederen din.</List.Item>
              <List.Item>Det er arbeidsgiverens ansvar å legge til rette for at du kan jobbe.</List.Item>
              <List.Item>
                Det er ditt ansvar å være med å finne løsninger slik at du kan komme tilbake til jobb.
              </List.Item>
            </List>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Bør du bytte jobb?</Accordion.Header>
          <Accordion.Content>
            <BodyLong size="medium">
              Av og til er det mulig å fungere bedre i en annen jobb enn den man ble sykmeldt fra.
            </BodyLong>
            <List as="ul">
              <List.Item>Er det vanskelig for deg å utføre oppgavene du hadde før du ble syk?</List.Item>
              <List.Item>
                Er det andre forhold hos arbeidsgiveren din som gjør det vanskelig for deg å fungere i jobben?.
              </List.Item>
              <List.Item>Snakk gjerne med en av våre veiledere om en ny jobb kan være bedre for deg.</List.Item>
              <List.Item>Du kan finne alle utlyste stillinger i landet på arbeidsplassen.no.</List.Item>
            </List>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default InfoSection
