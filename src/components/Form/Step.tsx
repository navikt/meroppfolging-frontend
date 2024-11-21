import { Button, Heading, HStack, Page, VStack } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons'

interface Props {
  heading: string
  children: ReactNode
  nextStep?: () => void
  previousStep?: () => void
  displaySubmitButton?: boolean
}

export const Step = ({ heading, children, previousStep, nextStep, displaySubmitButton }: Props): ReactElement => {
  return (
    <Page.Block width="md">
      <VStack className="bg-bg-default p-4 py-8 md:p-12" gap="6">
        <>
          <Heading size="large" level="1">
            {heading}
          </Heading>
          {children}
          <HStack gap="8">
            {previousStep && (
              <Button
                variant="secondary"
                onClick={previousStep}
                icon={<ArrowLeftIcon aria-hidden />}
                iconPosition="left"
              >
                Forrige
              </Button>
            )}
            {nextStep && (
              <Button onClick={nextStep} icon={<ArrowRightIcon aria-hidden />} iconPosition="right">
                Neste
              </Button>
            )}
            {displaySubmitButton && (
              <Button type="submit" icon={<PaperplaneIcon aria-hidden />} iconPosition="right">
                Send svarene
              </Button>
            )}
          </HStack>
        </>
      </VStack>
    </Page.Block>
  )
}
