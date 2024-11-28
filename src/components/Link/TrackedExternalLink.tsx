import { ExternalLinkIcon } from '@navikt/aksel-icons'
import { Link } from '@navikt/ds-react'
import React from 'react'

import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

interface Props {
  href: string
  children: string
}

export const TrackedExternalLink = ({ href, children }: Props) => {
  return (
    <>
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
      >
        {children}
        <ExternalLinkIcon title="åpner i ny fane" />
      </Link>{' '}
      (åpner i ny fane)
    </>
  )
}
