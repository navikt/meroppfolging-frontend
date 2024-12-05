import { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import WriteToUsLink from '@/components/UI/WriteToUsLink'
import { NAV_PHONE_NUMBER } from '@/constants/appConstants'

function SituationChange({ behovForOppfolgingAnswer }: { behovForOppfolgingAnswer: 'JA' | 'NEI' }): ReactElement {
  switch (behovForOppfolgingAnswer) {
    case 'JA':
      return <></>
    case 'NEI':
      return (
        <>
          <Heading level="2" size="medium">
            Hvis situasjonen din endrer seg
          </Heading>
          <BodyShort>
            Du kan når som helst ta kontakt med oss på tlf. {NAV_PHONE_NUMBER} eller på <WriteToUsLink /> (åpner i ny
            fane).
          </BodyShort>
        </>
      )
    default:
      const exhaustiveCheck: never = behovForOppfolgingAnswer
      return exhaustiveCheck
  }
}

export default SituationChange
