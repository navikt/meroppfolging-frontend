import '@testing-library/user-event'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import fetch from 'node-fetch'

import { expect } from 'vitest'
import * as matchers from 'vitest-dom/matchers'
import { testServer } from '../mocks/testServer'
import 'vitest-dom/extend-expect'

expect.extend(matchers)

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

// polyfill fetch & websocket
const globalAny = global as any
globalAny.AbortController = AbortController
globalAny.fetch = fetch
