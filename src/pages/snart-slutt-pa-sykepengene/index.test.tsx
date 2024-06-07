import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'

import SnartSlutt from './index.page'

describe('SnartSlutt', () => {
  it('should display pilot variation', async () => {
    render(<SnartSlutt />)

    expect(await screen.findByRole('heading', { name: 'Trenger du hjelp fra oss?', level: 1 })).toBeInTheDocument()
  })

  it('should display normal variation', async () => {
    testServer.use(
      trpcMsw.statusPilot.query(async (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.data({
            isPilot: false,
            responseStatus: ResponseStatus.NO_RESPONSE,
          }),
        )
      }),
    )

    render(<SnartSlutt />)

    expect(await screen.findByRole('heading', { name: 'Snart slutt på sykepengene', level: 1 })).toBeInTheDocument()
  })
})
