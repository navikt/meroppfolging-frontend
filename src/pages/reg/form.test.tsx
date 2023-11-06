import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'

import FormPage from '@/pages/reg/[form].page'
import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { enabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { trpcMsw } from '@/utils/trpc'

describe('FormPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
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
