'use client'

import { Box, Page, VStack } from '@navikt/ds-react'
import React from 'react'
import { TestScenarioSelector } from '@/components/TestscenarioSelector/TestScenarioSelector'
import { isLocalOrDemo } from '@/constants/envs'

export const MerOppfolgingPageLayout = ({
  children,
  footer,
}: {
  children: React.ReactNode
  footer: React.ReactNode
}) => {
  return (
    <Box background="sunken" asChild>
      <Page contentBlockPadding="none" footer={footer}>
        <main tabIndex={-1} id="maincontent">
          <VStack
            align="center"
            width="100%"
            padding={{ xs: 'space-16', md: 'space-32' }}
          >
            <Box background="default" padding={{ xs: 'space-32', md: 'space-40' }} asChild>
              <Page.Block width="md">{children}</Page.Block>
            </Box>
          </VStack>
          {isLocalOrDemo && <TestScenarioSelector />}
        </main>
      </Page>
    </Box>
  )
}
