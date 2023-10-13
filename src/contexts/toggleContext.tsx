import { createContext, PropsWithChildren, useContext } from 'react'
import { IToggle } from '@unleash/nextjs'

import { ExpectedToggles } from '@/libs/unleash/toggles'
import { trpc } from '@/utils/trpc'
import { getDefaultToggleValues, getFallbackToggles } from '@/libs/unleash/utils'

const ToggleContext = createContext<{ toggles: IToggle[] }>({ toggles: [] })

export function ToggleProvider({ children }: PropsWithChildren): JSX.Element {
  const data = trpc.featureToggles.useQuery()
  const toggles = data.isSuccess ? data.data : getFallbackToggles()

  return <ToggleContext.Provider value={{ toggles }}>{children}</ToggleContext.Provider>
}

export function useToggle(name: ExpectedToggles): IToggle {
  const context = useContext(ToggleContext)
  const toggle = context.toggles.find((toggle) => toggle.name === name)

  if (toggle == null) {
    return getDefaultToggleValues(name)
  }

  return toggle
}
