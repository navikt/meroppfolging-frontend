import mockRouter from 'next-router-mock'
import { beforeEach, describe, it } from 'vitest'

import Page from '@/pages/reg/[form].page'
import { render } from '@/test/testUtils'

describe('FormPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
  })

  describe('router mock should return', () => {
    it('Should render form ', async () => {
      render(<Page />)
    })
  })
})
