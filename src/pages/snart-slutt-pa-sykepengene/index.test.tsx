import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import { pilotIkkeSvart } from '@/mocks/data/fixtures/statusPilotDtoFixtures'
import SnartSlutt from '@/pages/snart-slutt-pa-sykepengene/index.page'

describe('SnartSlutt', () => {
  it('should display pilot variation', async () => {
    testServer.use(
      trpcMsw.statusPilot.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(pilotIkkeSvart))
      }),
    )

    render(<SnartSlutt />)

    expect(await screen.findByRole('heading', { name: 'Vil du ha hjelp fra oss?', level: 1 })).toBeInTheDocument()
  })
})
