import { describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { render, screen } from '@/test/testUtils'
import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'
import Landing from '@/components/SnartSluttPaSykepengene/Landing'

describe('Landing', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<Landing />)

    await act(async () => {
      const result = await axe(container)
      expect(result).toHaveNoViolations()
    })
  })

  it('should render more guidance panel', async () => {
    render(<Landing />)

    expect(await screen.findByText('Trenger du oppfølging fra oss?')).toBeInTheDocument()
  })

  it('should not render more guidance panel when isSykmeldt is false', async () => {
    testServer.use(
      trpcMsw.sykmeldtStatus.query(async (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.data({
            registrationType: 'SYKMELDT_REGISTRERING',
            isSykmeldt: false,
            responseStatus: ResponseStatus.NO_RESPONSE,
          }),
        )
      }),
    )

    render(<Landing />)

    expect(screen.queryByText('Ønsker du mer veiledning?')).not.toBeInTheDocument()
  })
})
