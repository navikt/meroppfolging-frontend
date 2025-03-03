'use client'

import { Button } from '@navikt/ds-react'
import Link from 'next/link'
import { ArrowRightIcon } from '@navikt/aksel-icons'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import React, { ReactElement } from 'react'

export const BeginFormButton = (): ReactElement => {
  return (
    <div>
      <Button
        as={Link}
        href="/snart-slutt-pa-sykepengene/skjema"
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
        onClick={() => {
          logAmplitudeEvent({
            eventName: 'skjema startet',
            data: {
              skjemanavn: 'Snart slutt på sykepengene',
            },
          })
        }}
      >
        Gå videre
      </Button>
    </div>
  )
}
