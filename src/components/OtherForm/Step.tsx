import { Button, Heading, HStack, Page, VStack } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
  heading: string
  children: ReactNode
  nextStep?: () => void
  previousStep?: () => void
  displaySubmitButton?: boolean
}

export const Step = ({ heading, children, previousStep, nextStep, displaySubmitButton }: Props): ReactElement => {
  return (
    <Page background="bg-subtle">
      <Page.Block as="div" width="md" gutters>
        <VStack className="bg-bg-default p-4 py-8 mt-4 md:p-12" gap="8">
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
      </Page.Block>
    </Page>
  )
}
