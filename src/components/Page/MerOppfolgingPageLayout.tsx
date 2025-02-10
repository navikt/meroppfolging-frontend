'use client'

import { Page } from '@navikt/ds-react'
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
    <Page background="bg-subtle" contentBlockPadding="none" footer={footer}>
      <main tabIndex={-1} id="maincontent">
        <div className="flex flex-col items-center w-full p-4 md:p-8">
          <Page.Block width="md" className="bg-bg-default p-4 py-8 md:p-12">
            {children}
          </Page.Block>
        </div>
        {isLocalOrDemo && <TestScenarioSelector />}
      </main>
    </Page>
  )
}
