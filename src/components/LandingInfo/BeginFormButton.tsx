'use client'

import { Button } from '@navikt/ds-react'
import Link from 'next/link'
import { ArrowRightIcon } from '@navikt/aksel-icons'
import { logAnalyticsEvent } from '@/libs/analytics/analytics'
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
          logAnalyticsEvent({
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
