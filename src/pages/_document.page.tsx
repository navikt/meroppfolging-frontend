import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import { Page } from '@navikt/ds-react'

import { browserEnv } from '@/constants/envs'

interface DocumentProps {
  Decorator: DecoratorComponentsReact
}

function createDecoratorEnv(): 'dev' | 'prod' {
  switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case 'local':
    case 'test':
    case 'dev':
      return 'dev'
    default:
      return 'prod'
  }
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)

    const Decorator = await fetchDecoratorReact({
      env: createDecoratorEnv(),
      params: { language: 'nb', context: 'privatperson', logoutWarning: true },
    })

    return { ...initialProps, Decorator }
  }

  render(): JSX.Element {
    const { Decorator } = this.props

    return (
      <Html lang="no">
        <Head>
          <Decorator.HeadAssets />
        </Head>
        <body>
          <Page background="bg-subtle" contentBlockPadding="none" footer={<Decorator.Footer />}>
            <Decorator.Header />
            <Main />
          </Page>
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
