'use client'

import { Link } from '@navikt/ds-react'
import NextLink from 'next/link'

import { logAnalyticsEvent } from '@/libs/analytics/analytics'
import { CONTACT_NAV_URL } from '@/constants/appConstants'

const DEFAULT_LINK_TEXT = 'skriv til oss her på nav.no'

interface Props {
  linkText?: string
}

function WriteToUsLink({ linkText }: Props): React.ReactElement {
  const linkTextToUse = linkText ?? DEFAULT_LINK_TEXT

  return (
    <Link
      as={NextLink}
      target="_blank"
      href={CONTACT_NAV_URL}
      onClick={() =>
        logAnalyticsEvent(
          {
            eventName: 'navigere',
            data: {
              lenketekst: linkTextToUse,
              destinasjon: 'Nav.no - skriv til oss',
            },
          },
          { fra: 'Landingsside' },
        )
      }
    >
      {linkTextToUse}
    </Link>
  )
}

export default WriteToUsLink
