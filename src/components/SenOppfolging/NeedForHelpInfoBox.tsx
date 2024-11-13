import { ReactElement } from 'react'
import { useWatch } from 'react-hook-form'
import { Alert, Heading } from '@navikt/ds-react'

import { FormInputs } from '@/components/SenOppfolging/SenOppfolgingForm'

function NeedForHelpInfoBox(): ReactElement {
  const fremtidigSituasjonValue = useWatch<Pick<FormInputs, 'FREMTIDIG_SITUASJON'>>({
    name: 'FREMTIDIG_SITUASJON',
  })
  const behovForOppfolgingValue = useWatch<Pick<FormInputs, 'BEHOV_FOR_OPPFOLGING'>>({
    name: 'BEHOV_FOR_OPPFOLGING',
  })

  if (
    behovForOppfolgingValue !== 'NEI' ||
    fremtidigSituasjonValue === 'TILBAKE_HOS_ARBEIDSGIVER' ||
    fremtidigSituasjonValue === 'TILBAKE_MED_TILPASNINGER' ||
    fremtidigSituasjonValue === 'TILBAKE_GRADERT'
  )
    return <></>

  if (fremtidigSituasjonValue === 'BYTTE_JOBB')
    return (
      <Alert variant="info" className="mt-4">
        <Heading spacing size="small" level="2">
          Det kan være lurt å snakke med en veileder
        </Heading>
        En veileder kan hjelpe deg når du skal søke jobber, eller trenger hjelp til å finne annet arbeid. Samtalen er
        helt uforpliktende.
      </Alert>
    )

  if (fremtidigSituasjonValue === 'FORTSATT_SYK')
    return (
      <Alert variant="warning" className="mt-4">
        <Heading spacing size="small" level="2">
          Vi anbefaler deg å snakke med en veileder
        </Heading>
        En veileder kan hjelpe deg med å søke om annen økonomisk støtte og oppfølging etter at sykepengene tar slutt.
        Samtalen er helt uforpliktende.
      </Alert>
    )

  if (fremtidigSituasjonValue === 'USIKKER')
    return (
      <Alert variant="warning" className="mt-4">
        <Heading spacing size="small" level="2">
          Vi anbefaler deg å snakke med en veileder
        </Heading>
        En veileder kan hjelpe deg med å oppdage og bli trygg på hvilke muligheter du har videre. Samtalen er helt
        uforpliktende.
      </Alert>
    )

  const exhaustiveCheck: never = fremtidigSituasjonValue
  return exhaustiveCheck
}

export default NeedForHelpInfoBox
