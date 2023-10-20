import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'

import Page from '@/pages/reg/[form].page'
import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { enabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { trpcMsw } from '@/utils/trpc'

describe('FormPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
  })

  describe('router mock should return', () => {
    it('Should render form ', async () => {
      render(<Page />)

      expect(await screen.findByText('Hva tenker du om din fremtidige situasjon?')).toBeInTheDocument()
    })

    it('Should render form 2', async () => {
      testServer.use(
        trpcMsw.featureToggles.query(async (req, res, ctx) => {
          return res(ctx.status(200), ctx.data(enabledFeatureToggles))
        }),
      )

      render(<Page />)

      expect(await screen.findByText('Vedlikehold pågår')).toBeInTheDocument()
    })
  })
})
