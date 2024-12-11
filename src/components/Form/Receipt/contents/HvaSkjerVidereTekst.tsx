import { ReactElement } from 'react'
import { BodyLong, Box, Heading } from '@navikt/ds-react'

import { BehovForOppfolgingAnswerTypes } from '@/domain/answerValues'

interface Props {
  behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes
}

function HvaSkjerVidereTekst({ behovForOppfolgingAnswer }: Props): ReactElement {
  const svartJaTilOppfolgingTekst =
    'En veileder som jobber med sykefraværsoppfølging i Nav vil vurdere behovet du har for oppfølging, tiltak og virkemidler. Deretter vil du bli kontaktet på telefon eller i Innboks på nav.no. Vi vil forsøke å kontakte deg så snart som mulig.'

  const svartNeiTilOppfolgingTekst =
    'En veileder som jobber med sykefraværsoppfølging i Nav er forpliktet til å vurdere om du trenger oppfølging, tiltak og virkemidler. Vi bruker svaret ditt når vi vurderer om det er nødvendig å ta kontakt med deg.'

  return (
    <Box>
      <Heading size="medium" spacing>
        Hva skjer videre?
      </Heading>

      <BodyLong>{behovForOppfolgingAnswer === 'JA' ? svartJaTilOppfolgingTekst : svartNeiTilOppfolgingTekst}</BodyLong>
    </Box>
  )
}

export default HvaSkjerVidereTekst
