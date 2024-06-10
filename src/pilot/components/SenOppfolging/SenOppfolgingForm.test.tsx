import { describe, expect, it, vi } from 'vitest'
import { waitFor, within } from '@testing-library/react'

import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import SenOppfolgingForm from '@/pilot/components/SenOppfolging/SenOppfolgingForm'

import { render, screen } from '../../../test/testUtils'

describe('SenOppfolgingForm', () => {
  it('should submit form', async () => {
    const requestResolver = vi.fn()
    testServer.use(
      trpcMsw.submitPilotForm.mutation(async (req, res, ctx) => {
        requestResolver(await req.json())
        return res(ctx.status(200), ctx.data())
      }),
    )
    const { user } = render(<SenOppfolgingForm />)

    const radioGroup1 = within(
      screen.getByRole('group', {
        name: 'I hvilken situasjon ser du for deg at du står i når sykepengene har tatt slutt?',
      }),
    )
    await user.click(radioGroup1.getByLabelText('Jeg er tilbake i jobb, men skal jobbe gradert'))

    const radioGroup2 = within(
      screen.getByRole('group', {
        name: 'Har du behov for hjelp fra oss i NAV?',
      }),
    )
    await user.click(radioGroup2.getByLabelText('Ja, jeg vil snakke med en veileder i NAV'))

    await user.click(screen.getByRole('button', { name: 'Send svarene' }))

    await waitFor(() =>
      expect(requestResolver).toBeCalledWith({
        senOppfolgingFormV2: [
          {
            answerText: 'Jeg er tilbake i jobb, men skal jobbe gradert',
            answerType: 'TILBAKE_GRADERT',
            questionText: 'I hvilken situasjon ser du for deg at du står i når sykepengene har tatt slutt?',
            questionType: 'FREMTIDIG_SITUASJON',
          },
          {
            answerText: 'Ja, jeg vil snakke med en veileder i NAV',
            answerType: 'JA',
            questionText: 'Har du behov for hjelp fra oss i NAV?',
            questionType: 'BEHOV_FOR_OPPFOLGING',
          },
        ],
      }),
    )
  })
})
