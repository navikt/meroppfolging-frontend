import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react'
import { logger } from '@navikt/next-logger'

import ErrorFallback from './ErrorFallback'

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren<unknown>, State> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error({ error, errorInfo })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-8">
          <div className="p-8 max-w-prose">
            <ErrorFallback />
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
