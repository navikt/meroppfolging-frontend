import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'

import { render } from '../../../test/testUtils'
import MerOppfolgingForm from '../MerOppfolgingForm'

describe('MerOppfolgingForm', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/reg/0')
  })

  describe('router mock should return', () => {
    it('initial form path ', async () => {
      render(<MerOppfolgingForm />)

      expect(mockRouter).toMatchObject({
        pathname: '/reg/[form]',
        query: { form: '0' },
      })
    })

    it('initial form path when form path query is invalid ', async () => {
      mockRouter.setCurrentUrl('/reg/invalid')

      render(<MerOppfolgingForm />)

      expect(mockRouter).toMatchObject({
        pathname: '/reg/[form]',
        query: { form: '0' },
      })
    })

    it('initial form path when path query is valid form but missing form state data', async () => {
      mockRouter.setCurrentUrl('/reg/6')

      render(<MerOppfolgingForm />)

      expect(mockRouter).toMatchObject({
        pathname: '/reg/[form]',
        query: { form: '0' },
      })
    })
  })
})
