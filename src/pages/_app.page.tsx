import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TRPCClientError } from '@trpc/client'

import { trpc } from '@/utils/trpc'

function App({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof TRPCClientError) {
              if (error.data.httpStatus === 401) {
                router.push(`/oauth2/login?redirect=${window.location.pathname}`)
              }
            }
          },
        }),
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <main tabIndex={-1} id="maincontent">
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default trpc.withTRPC(App)
