import { Link } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

interface Props {
  href: string
  children: string
}

export const TrackedExternalLink = ({ href, children }: Props): ReactElement => {
  return (
    <Link
      href={href}
      target="_blank"
      onClick={() => {
        logAmplitudeEvent({
          eventName: 'navigere',
          data: {
            lenketekst: children,
            destinasjon: href,
          },
        })
      }}
      inlineText
    >
      {children} (åpner i ny fane)
    </Link>
  )
}
