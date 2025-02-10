import '@testing-library/user-event'
import 'vitest-dom/extend-expect'

import dotenv from 'dotenv'
import { expect, vi } from 'vitest'
import * as matchers from 'vitest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  const { useRouter } = await vi.importActual<typeof import('next-router-mock')>('next-router-mock')
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter()
    return router.pathname
  })
  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter()
    return new URLSearchParams(router.query?.toString())
  })
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  }
})

dotenv.config({
  path: '.env.test',
})

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})
