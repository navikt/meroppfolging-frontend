import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import { notPilotStatusDTO, pilotStatusDTO } from '@/mocks/data/fixtures/statusPilotDTO'

import SnartSlutt from './index.page'

describe('SnartSlutt', () => {
  it('should display pilot variation', async () => {
    testServer.use(
      trpcMsw.statusPilot.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(pilotStatusDTO))
      }),
    )

    render(<SnartSlutt />)

    expect(await screen.findByRole('heading', { name: 'Vil du ha hjelp fra oss?', level: 1 })).toBeInTheDocument()
  })

  it('should display normal variation', async () => {
    testServer.use(
      trpcMsw.statusPilot.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(notPilotStatusDTO))
      }),
    )

    render(<SnartSlutt />)

    expect(await screen.findByRole('heading', { name: 'Snart slutt på sykepengene', level: 1 })).toBeInTheDocument()
  })
})
