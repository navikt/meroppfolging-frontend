import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'
import { DecoratorComponents, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'

interface DocumentProps {
  Decorator: DecoratorComponents
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)

    const Decorator = await fetchDecoratorReact({
      env: 'dev',
      params: { language: 'nb', context: 'privatperson' },
    })

    return { ...initialProps, Decorator }
  }

  render(): JSX.Element {
    const { Decorator } = this.props

    return (
      <Html lang="no">
        <Head>
          <Decorator.Styles />
        </Head>
        <body className="h-screen">
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
