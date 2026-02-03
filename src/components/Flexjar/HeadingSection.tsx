import { MagnifyingGlassIcon } from '@navikt/aksel-icons'
import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export const HeadingSection = (): ReactElement => {
  return (
    <Box background="neutral-soft" padding="space-24">
      <HStack gap="space-16" align="center">
        <HStack align="center" justify="center" asChild>
          <Box background="neutral-strong" borderRadius="full" width="2.5rem" height="2.5rem">
            <MagnifyingGlassIcon
              aria-hidden={true}
              className="axe-exclude"
              style={{ color: 'var(--ax-text-neutral-contrast)' }}
            />
          </Box>
        </HStack>
        <VStack gap="space-4">
          <Heading level="3" size="small">
            Hjelp oss med å gjøre denne siden bedre
          </Heading>
          <BodyShort>Anonym tilbakemelding på tjenesten</BodyShort>
        </VStack>
      </HStack>
    </Box>
  )
}
