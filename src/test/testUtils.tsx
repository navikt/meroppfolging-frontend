import { render, RenderOptions, screen, Screen } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'
import open from 'open'
import userEvent from '@testing-library/user-event'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInputs } from '@/components/Form/StepHandler'

type CustomRenderReturnType = { user: ReturnType<typeof userEvent.setup> } & ReturnType<typeof render>

const AllTheProviders = ({ children }: { children: ReactNode }): ReactElement => {
  const methods = useForm<FormInputs>()

  return (
    <MemoryRouterProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </MemoryRouterProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): CustomRenderReturnType => {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  }
}

export async function openPlayground(screen: Screen): Promise<void> {
  await open(screen.logTestingPlaygroundURL())
}

const customScreen = {
  ...screen,
  openPlayground: () => openPlayground(screen),
}

export { customScreen as screen }
export { customRender as render }
