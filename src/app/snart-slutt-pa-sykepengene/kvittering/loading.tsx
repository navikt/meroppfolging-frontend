import React, { ReactElement } from 'react'
import ThankYouAlert from '@/components/Form/Receipt/contents/ThankYouAlert'
import OppsummeringAvDineSvar from '@/components/Form/Receipt/contents/OppsummeringAvDineSvar'
import HvaSkjerVidereTekst from '@/components/Form/Receipt/contents/HvaSkjerVidereTekst'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'
import NyttigeLenker from '@/components/Form/Receipt/contents/NyttigeLenker'
import KontaktInformasjon from '@/components/Form/Receipt/contents/KontaktInformasjon'
import { Skeleton, VStack } from '@navikt/ds-react'

export default function Loading(): ReactElement {
  return (
    <VStack gap="6">
      <Skeleton>
        <ThankYouAlert responseDateISOString={''} />
      </Skeleton>

      <Skeleton>
        <OppsummeringAvDineSvar fremtidigSituasjonAnswer={'TILBAKE_HOS_ARBEIDSGIVER'} behovForOppfolgingAnswer={'JA'} />
      </Skeleton>

      <Skeleton>
        <HvaSkjerVidereTekst behovForOppfolgingAnswer={'JA'} />
      </Skeleton>

      <Skeleton variant="rounded">
        <MaxDateInfo
          maxDate={{
            maxDate: new Date().toISOString(),
            gjenstaendeSykedager: '60',
            utbetaltTom: new Date().toISOString(),
          }}
        />
      </Skeleton>

      <NyttigeLenker />

      <KontaktInformasjon />
    </VStack>
  )
}
