import { Button, Heading, HStack, VStack } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons'

interface Props {
  heading: string
  children: ReactNode
  goToPreviousStep?: () => void
  customNextButtonLabel?: string
  customNextButtonIcon?: ReactNode
}

export const Step = ({
  heading,
  children,
  goToPreviousStep,
  customNextButtonLabel,
  customNextButtonIcon,
}: Props): ReactElement => {
  return (
    <>
      <VStack gap="6">
        <Heading size={goToPreviousStep ? 'medium' : 'large'} level="1">
          {heading}
        </Heading>
        {children}
        <HStack gap="8">
          {goToPreviousStep && (
            <Button
              variant="secondary"
              onClick={goToPreviousStep}
              icon={<ArrowLeftIcon aria-hidden />}
              iconPosition="left"
            >
              Forrige
            </Button>
          )}
          <Button type="submit" icon={customNextButtonIcon ?? <ArrowRightIcon aria-hidden />} iconPosition="right">
            {customNextButtonLabel ?? 'Neste'}
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
