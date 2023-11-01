import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'
import { within } from '@testing-library/react'

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
        trpcMsw.featureToggles.query(async (req, res, ctx) => {
          return res(ctx.status(200), ctx.data(enabledFeatureToggles))
        }),
      )

      render(<FormPage />)

      expect(await screen.findByText('Vedlikehold pågår')).toBeInTheDocument()
    })
  })

  describe('filling out form', () => {
    it('should submit form', async () => {
      const { user } = render(<FormPage />)

      const radioGroup1 = within(
        await screen.findByRole('group', {
          name: 'Hva tenker du om din fremtidige situasjon?',
        }),
      )
      await user.click(radioGroup1.getByLabelText('Jeg skal tilbake til jobben jeg har'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const radioGroup2 = within(
        await screen.findByRole('group', {
          name: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
        }),
      )
      await user.click(radioGroup2.getByLabelText('Ja, i full stilling'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      await user.click(screen.getByRole('button', { name: 'Uenig, jeg trenger mer veiledning' }))

      const summaryTable = within(await screen.findByRole('table', { name: 'Sammendrag av svar' }))
      summaryTable.getByRole('link', { name: 'Endre svaret på Fremtidig situasjon' })
      summaryTable.getByRole('link', { name: 'Endre svaret på Tilbake i jobb før sykmeldt i 52 uker' })
    })
  })
})
