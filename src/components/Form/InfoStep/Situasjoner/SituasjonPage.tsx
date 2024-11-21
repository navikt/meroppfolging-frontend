import { Heading, VStack } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
  heading: string
  children: ReactNode
}

export const SituasjonPage = ({ heading, children }: Props): ReactElement => {
  return (
    <div>
      <Heading size="large" level="2" spacing>
        {heading}
      </Heading>

      <VStack gap="2">{children}</VStack>
    </div>
  )
}
