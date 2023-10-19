import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'

import Page from '@/pages/reg/[form].page'
import { render, screen } from '@/test/testUtils'

describe('FormPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
  })

  describe('router mock should return', () => {
    it('Should render form ', async () => {
      render(<Page />)

      expect(await screen.findByText('Hva tenker du om din fremtidige situasjon?')).toBeInTheDocument()
    })

    // it('Should render form 2', async () => {
    //   render(<Page />)

    //   expect(await screen.findByText('Vedlikehold pågår')).toBeInTheDocument()
    // })
  })
})
