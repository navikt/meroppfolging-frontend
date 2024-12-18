import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import SnartSlutt from '@/pages/snart-slutt-pa-sykepengene/index.page'
import {
  IkkeSvart,
  IkkeSvartAndShouldNotHaveAccess,
  SvartFortsattSykOgTrengerOppfolging,
  SvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging,
} from '@/mocks/data/fixtures/statusDtoFixtures'
import Skjema from '@/pages/snart-slutt-pa-sykepengene/skjema/index.page'

describe('SnartSlutt', () => {
  it('should display form', async () => {
    testServer.use(
      trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(IkkeSvart))
      }),
    )

    render(<SnartSlutt />)

    expect(
      await screen.findByRole('heading', { name: 'Sykepengene dine tar snart slutt', level: 1 }),
    ).toBeInTheDocument()
  })

  it('should display heading for no access screen if user should not have access to sen oppfølging solution', async () => {
    testServer.use(
      trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(IkkeSvartAndShouldNotHaveAccess))
      }),
    )

    render(<Skjema />)

    expect(
      await screen.findByRole('heading', { name: 'Beklager, du kan ikke svare på dette skjemaet nå.', level: 1 }),
    ).toBeInTheDocument()
  })

  it('should dipslay display receipt with certain headings if user has responded fortsatt syk og trenger oppfølging', async () => {
    testServer.use(
      trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(SvartFortsattSykOgTrengerOppfolging))
      }),
    )

    render(<Skjema />)

    expect(await screen.findByRole('heading', { name: 'Vi tar kontakt med deg', level: 1 })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Når du er for syk til å jobbe', level: 2 })).toBeInTheDocument()
  })

  it('should dipslay display receipt with correct heading if user has responded trenger ikke oppfølging', async () => {
    testServer.use(
      trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(SvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging))
      }),
    )

    render(<Skjema />)

    expect(await screen.findByRole('heading', { name: 'Det kan hende du hører fra oss', level: 1 })).toBeInTheDocument()
  })
})
