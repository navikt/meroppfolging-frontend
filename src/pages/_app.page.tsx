import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, useEffect, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureLogger } from '@navikt/next-logger'

import { trpc } from '@/utils/trpc'
import { server } from '@/mocks/server'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import { BASE_PATH } from '@/constants/paths'
import { initFaro } from '@/libs/faro/faro'
import { ToggleProvider } from '@/contexts/toggleContext'

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
      <QueryClientProvider client={queryClient}>
        <ToggleProvider>
          <section className="flex flex-col items-center p-8">
            <main className="flex flex-col max-w-4xl w-full" tabIndex={-1} id="maincontent">
              <Component {...pageProps} />
            </main>
          </section>
        </ToggleProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default trpc.withTRPC(App)
