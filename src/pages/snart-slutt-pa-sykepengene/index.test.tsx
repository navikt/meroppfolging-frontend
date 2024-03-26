import { describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'

import SnartSlutt from './index.page'

describe('SnartSlutt', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<SnartSlutt />)

    await act(async () => {
      const result = await axe(container)
      expect(result).toHaveNoViolations()
    })
  })

  it('should render more guidance panel', async () => {
    render(<SnartSlutt />)

    expect(await screen.findByText('Ønsker du mer veiledning?')).toBeInTheDocument()
  })

  it('should not render more guidance panel when isSykmeldt is false', async () => {
    testServer.use(
      trpcMsw.sykmeldtStatus.query(async (_req, res, ctx) => {
        return res(ctx.status(200), ctx.data({ registrationType: 'SYKMELDT_REGISTRERING', isSykmeldt: false }))
      }),
    )

    render(<SnartSlutt />)

    expect(screen.queryByText('Ønsker du mer veiledning?')).not.toBeInTheDocument()
  })
})
