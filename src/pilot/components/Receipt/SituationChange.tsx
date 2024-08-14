import { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

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
            Du kan alltid kontakte oss og be om å få snakke med en veileder hvis behovet ditt endrer seg.
          </BodyShort>
        </>
      )
    default:
      const exhaustiveCheck: never = behovForOppfolgingAnswer
      return exhaustiveCheck
  }
}

export default SituationChange
