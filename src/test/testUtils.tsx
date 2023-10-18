import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions, screen, Screen } from '@testing-library/react'
import React, { ReactElement, ReactNode } from 'react'
import open from 'open'
import userEvent from '@testing-library/user-event'

import { MerOppfolgingFormProvider } from '@/contexts/formContext'
import { createTRPCNext } from '@trpc/next'
import { AppRouter } from '@/server/routers/_app'
import { httpBatchLink } from '@trpc/client'
import { BASE_PATH } from '@/constants/paths'
import { trpc } from '@/utils/trpc'

type CustomRenderReturnType = { user: ReturnType<typeof userEvent.setup>; render: ReturnType<typeof render> }

const trpcSomething = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${BASE_PATH}/api/trpc`,
        }),
      ],
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})

const AllTheProviders = ({ children }: { children: ReactNode }): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const AllWithTRPC = trpcSomething.withTRPC(AllTheProviders)

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): CustomRenderReturnType => {
  return {
    user: userEvent.setup({ delay: null }),
    render: render(ui, { wrapper: AllWithTRPC, ...options }),
  }
}

export async function openPlayground(screen: Screen): Promise<void> {
  // eslint-disable-next-line testing-library/no-debugging-utils
  await open(screen.logTestingPlaygroundURL())
}

const customScreen = {
  ...screen,
  openPlayground: () => openPlayground(screen),
}

export { customScreen as screen }
export { customRender as render }

export function renderWithFormContext(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): CustomRenderReturnType {
  return {
    user: userEvent.setup({ delay: null }),
    render: render(<MerOppfolgingFormProvider>{ui}</MerOppfolgingFormProvider>, {
      wrapper: AllTheProviders,
      ...options,
    }),
  }
}
