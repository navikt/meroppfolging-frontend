import { setupServer } from 'msw/node'

import { testHandlers } from '@/mocks/handlers'

export const testServer = setupServer(...testHandlers)
