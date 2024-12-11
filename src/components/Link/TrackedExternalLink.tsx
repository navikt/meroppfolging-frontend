import React, { ReactElement } from 'react'
import { Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

interface Props {
  href: string
  includeOpeningInNewTabText?: boolean
  openingInNewTabIconInsteadOfText?: boolean
  children: string
}

export const TrackedExternalLink = ({
  href,
  openingInNewTabIconInsteadOfText = false,
  children,
}: Props): ReactElement => {
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
      {openingInNewTabIconInsteadOfText ? (
        <>
          <span className="mr-1">{children}</span>
          <ExternalLinkIcon title="åpner i ny fane" />
        </>
      ) : (
        <>{children} (åpner i ny fane)</>
      )}
    </Link>
  )
}
