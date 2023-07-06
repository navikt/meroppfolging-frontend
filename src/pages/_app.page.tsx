import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

import { trpc } from '@/utils/trpc'

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <main tabIndex={-1} id="maincontent">
      <Component {...pageProps} />
    </main>
  )
}

export default trpc.withTRPC(App)
