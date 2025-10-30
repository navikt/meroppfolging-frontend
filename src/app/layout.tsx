import './globals.css'
import { configureLogger } from '@navikt/next-logger'
import type { Metadata } from 'next'
import { BASE_PATH } from '@/constants/appConstants'
import React from 'react'
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import Script from 'next/script'
import { publicEnv } from '@/constants/envs'
import { MerOppfolgingPageLayout } from '@/components/Page/MerOppfolgingPageLayout'
import { Providers } from '@/app/providers'
import { UmamiScript } from '@/libs/analytics/umamiScript'

configureLogger({
  basePath: BASE_PATH,
})

function createDecoratorEnv(): 'dev' | 'prod' {
  switch (publicEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case 'local':
    case 'test':
    case 'dev':
      return 'dev'
    default:
      return 'prod'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const Decorator = await fetchDecoratorReact({
    env: createDecoratorEnv(),
    params: {
      language: 'nb',
      context: 'privatperson',
      logoutWarning: true,
      chatbot: true,
      feedback: false,
      redirectToApp: true,
    },
  })

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
        <UmamiScript />
      </head>
      <body>
        <Decorator.Header />
        <Providers>
          <MerOppfolgingPageLayout footer={<Decorator.Footer />}>{children}</MerOppfolgingPageLayout>
        </Providers>
        <Decorator.Scripts loader={Script} />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Registering av mer oppfølging',
}
