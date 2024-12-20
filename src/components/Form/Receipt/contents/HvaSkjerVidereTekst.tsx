import { ReactElement } from 'react'
import { BodyLong, Box, Heading } from '@navikt/ds-react'

import { BehovForOppfolgingAnswerTypes } from '@/domain/answerValues'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'
import { CONTACT_NAV_URL } from '@/constants/appConstants'
import { NavPhoneNumber } from '@/components/UI/NavPhoneNumber'

interface Props {
  behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes
}

function HvaSkjerVidereTekst({ behovForOppfolgingAnswer }: Props): ReactElement {
  const svartJaTilOppfolgingContent =
    'Svarene dine deles med veilederen din som jobber med sykefraværsoppfølging. Svarene brukes til å vurdere behovet du har for oppfølging fra Nav. Du får beskjed når veilederen din har vurdert behovet ditt.'

  const svartNeiTilOppfolgingContent = (
    <>
      Du har svart at du ikke trenger oppfølging nå. Hvis du allerede har kontakt med en veileder, så vil du ikke miste
      den kontakten. Dersom du senere ønsker råd og veiledning kan du når som helst ta kontakt med oss på telefon{' '}
      <NavPhoneNumber /> eller{' '}
      <TrackedExternalLink href={CONTACT_NAV_URL}>skrive til oss her på nav.no</TrackedExternalLink>.
    </>
  )

  return (
    <Box>
      <Heading size="medium" spacing>
        Hva skjer videre?
      </Heading>

      <BodyLong>
        {behovForOppfolgingAnswer === 'JA' ? svartJaTilOppfolgingContent : svartNeiTilOppfolgingContent}
      </BodyLong>
    </Box>
  )
}

export default HvaSkjerVidereTekst
