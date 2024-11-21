import { Button, Heading, HStack, VStack } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'

import PageContainer from '@/components/containers/PageContainer'

interface Props {
  heading: string
  children: ReactNode
  nextStep?: () => void
  previousStep?: () => void
  displaySubmitButton?: boolean
}

export const Step = ({ heading, children, previousStep, nextStep, displaySubmitButton }: Props): ReactElement => {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack className="bg-bg-default p-4 py-8 md:p-12" gap="8">
        <>
          <Heading size="large" level="1">
            {heading}
          </Heading>
          {children}
          <HStack gap="8">
            {previousStep && <Button onClick={previousStep}>Forrige</Button>}
            {nextStep && <Button onClick={nextStep}>Neste</Button>}
            {displaySubmitButton && <Button type="submit">Send svarene</Button>}
          </HStack>
        </>
      </VStack>
    </PageContainer>
  )
}
