import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'
import { axe } from 'vitest-axe'

import FormPage from '@/pages/reg/[form].page'
import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { enabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { trpcMsw } from '@/utils/trpc'
import { statusDtoTrengerIkkeOppfolging } from '@/mocks/data/fixtures/statusDtoFixtures'

describe('FormPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<FormPage />)

    await act(async () => {
      const result = await axe(container)
      expect(result).toHaveNoViolations()
    })
  })

  it('should display already registered when user has responded', async () => {
    testServer.use(
      trpcMsw.sykmeldtStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data(statusDtoTrengerIkkeOppfolging))
      }),
    )

    render(<FormPage />)

    expect(
      await screen.findByText('For at NAV skal kunne hjelpe deg videre, må vi hjelpe deg i andre kanaler.'),
    ).toBeInTheDocument()
  })

  describe('with feature toggles', () => {
    it('should render form ', async () => {
      render(<FormPage />)

      expect(await screen.findByText('Hva tenker du om din fremtidige situasjon?')).toBeInTheDocument()
    })

    it('should render maintenance info', async () => {
      testServer.use(
        trpcMsw.featureToggles.query(async (_req, res, ctx) => {
          return res(ctx.status(200), ctx.data(enabledFeatureToggles))
        }),
      )

      render(<FormPage />)

      expect(await screen.findByText('Vedlikehold pågår')).toBeInTheDocument()
    })
  })
})
