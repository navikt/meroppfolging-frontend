import '@testing-library/user-event'
import 'vitest-dom/extend-expect'

import dotenv from 'dotenv'
import { cleanup } from '@testing-library/react'
import { vi, beforeAll, afterEach, afterAll, expect } from 'vitest'
import * as matchers from 'vitest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'

import { testServer } from '../mocks/testServer'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

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
