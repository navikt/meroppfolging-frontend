import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions, screen, Screen } from '@testing-library/react'
import React, { ReactElement, ReactNode } from 'react'
import open from 'open'
import userEvent from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { FormProvider, useForm } from 'react-hook-form'

import { trpc } from '@/utils/trpc'
import { ToggleProvider } from '@/contexts/toggleContext'
import { FormInputs } from '@/components/SenOppfolging/SenOppfolgingForm'

type CustomRenderReturnType = { user: ReturnType<typeof userEvent.setup> } & ReturnType<typeof render>

const AllTheProviders = ({ children }: { children: ReactNode }): ReactElement => {
  const methods = useForm<FormInputs>()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <MemoryRouterProvider>
      <ToggleProvider>
        <FormProvider {...methods}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </FormProvider>
      </ToggleProvider>
    </MemoryRouterProvider>
  )
}

const ProvidersWithTRPC = trpc.withTRPC(AllTheProviders)

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): CustomRenderReturnType => {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(ui, { wrapper: ProvidersWithTRPC, ...options }),
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
