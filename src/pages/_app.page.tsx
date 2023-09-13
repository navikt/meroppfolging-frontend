import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc } from '@/utils/trpc'
import { server } from '@/mocks/server'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line no-console
  console.log('Starting msw...')
  server.listen({ onUnhandledRequest: 'bypass' })
}

function App({ Component, pageProps }: AppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col items-center p-8">
        <main className="flex flex-col max-w-4xl w-full" tabIndex={-1} id="maincontent">
          <Component {...pageProps} />
        </main>
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default trpc.withTRPC(App)
