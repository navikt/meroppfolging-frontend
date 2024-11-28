import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { ReactElement, useEffect, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureLogger } from '@navikt/next-logger'
import Head from 'next/head'
import { Page } from '@navikt/ds-react'

import { trpc } from '@/utils/trpc'
import { server } from '@/mocks/server'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { BASE_PATH } from '@/constants/appConstants'
import { initFaro } from '@/libs/faro/faro'
import { ToggleProvider } from '@/contexts/toggleContext'
import { TestScenarioSelector } from '@/components/TestscenarioSelector/TestScenarioSelector'
import { isLocalOrDemo } from '@/constants/envs'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line no-console
  console.log('Starting msw...')
  server.listen({ onUnhandledRequest: 'bypass' })
}

configureLogger({
  basePath: BASE_PATH,
})

function App({ Component, pageProps }: AppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    initFaro()
  }, [])

  return (
    <ErrorBoundary>
      <Head>
        <title>Registering av mer oppfølging</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ToggleProvider>
          <main tabIndex={-1} id="maincontent">
            <div className="flex flex-col items-center w-full p-4 md:p-8">
              <Page.Block width="md" className="bg-bg-default p-4 py-8 md:p-12">
                <Component {...pageProps} />
              </Page.Block>
            </div>
            {isLocalOrDemo && <TestScenarioSelector />}
          </main>
        </ToggleProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default trpc.withTRPC(App)
