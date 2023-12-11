import { BaggageIcon, BandageIcon, Buldings3Icon } from '@navikt/aksel-icons'
import { BodyLong, Box, Heading, List } from '@navikt/ds-react'
import { ReactElement } from 'react'

import IconContainer from '../Containers/BoxIconContainer'

function InfoSection(): ReactElement {
  return (
    <>
      <IconContainer icon={<Buldings3Icon />}>
        <Box>
          <Heading size="medium" level="2">
            Kan du gå tilbake til jobben din?
          </Heading>
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
        </Box>
      </IconContainer>
      <IconContainer icon={<BaggageIcon />}>
        <Box>
          <Heading size="medium" level="2">
            Bør du bytte jobb?
          </Heading>
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
        </Box>
      </IconContainer>
      <IconContainer icon={<BandageIcon />}>
        <Box>
          <Heading size="medium" level="2">
            Er du fortsatt syk?
          </Heading>
          <BodyLong size="medium">
            Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om
            arbeidsavklaringspenger (AAP), eller en annen økonomisk støtte. Du må være forberedt på å gå ned i inntekt
            når sykepengene tar slutt, fordi andre støtter fra NAV gir mindre enn sykepenger.
          </BodyLong>
          <List as="ul">
            <List.Item>
              Husk at du selv må søke om AAP eller annen økonomisk støtte. Dette skjer ikke automatisk.
            </List.Item>
            <List.Item>
              Husk å søke støtte i god tid før sykepengene tar slutt, behandlingstiden kan være lang.
            </List.Item>
            <List.Item>Husk at du også kan ha rettigheter hos forsikringsselskapet eller pensjonskassen din.</List.Item>
            <List.Item>Ikke alle har rett til AAP. Les mer om AAP og om hvordan du kan søke.</List.Item>
            <List.Item>Snakk gjerne med en av våre veiledere om hva du kan gjøre hvis du fortsatt er syk.</List.Item>
          </List>
        </Box>
      </IconContainer>
    </>
  )
}

export default InfoSection
