import '@testing-library/user-event'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import dotenv from 'dotenv'
import { expect } from 'vitest'
import * as matchers from 'vitest-dom/matchers'
import { cleanup } from '@testing-library/react'

import { testServer } from '../mocks/testServer'

import 'vitest-dom/extend-expect'

expect.extend(matchers)

dotenv.config({
  path: '.env.test',
})

vi.mock('next/router', () => require('next-router-mock'))

beforeAll(() => testServer.listen())
afterEach(() => {
  cleanup()
  testServer.resetHandlers()
})
afterAll(() => testServer.close())
