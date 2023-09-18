import '@testing-library/user-event'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'

import { testServer } from '../mocks/testServer'

vi.mock('next/router', () => require('next-router-mock'))
vi.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    basePath: '/basepath',
  },
}))

beforeAll(() => testServer.listen())
afterEach(() => {
  testServer.resetHandlers()
})
afterAll(() => testServer.close())
