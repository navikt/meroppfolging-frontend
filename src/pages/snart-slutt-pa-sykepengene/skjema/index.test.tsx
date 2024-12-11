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
  it('should display start page', async () => {
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

  it(
    'should dipslay receipt with certain texts in "summary of your answer" ' +
      'if user has responded fortsatt syk og trenger oppfølging',
    async () => {
      testServer.use(
        trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
          return res(ctx.status(200), ctx.data(SvartFortsattSykOgTrengerOppfolging))
        }),
      )

      render(<Skjema />)

      expect(await screen.findByText('Jeg er for syk til å jobbe')).toBeInTheDocument()
      expect(await screen.findByText('Ja, jeg ønsker å be om oppfølging')).toBeInTheDocument()
    },
  )

  it(
    'should dipslay receipt with certain texts in "summary of your answer" ' +
      'if user has responded trenger ikke oppfølging',
    async () => {
      testServer.use(
        trpcMsw.senOppfolgingStatus.query(async (_req, res, ctx) => {
          return res(ctx.status(200), ctx.data(SvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging))
        }),
      )

      render(<Skjema />)

      expect(await screen.findByText('Jeg er frisk og tilbake hos arbeidsgiver')).toBeInTheDocument()
      expect(await screen.findByText('Nei, jeg trenger ikke oppfølging nå')).toBeInTheDocument()
    },
  )
})
