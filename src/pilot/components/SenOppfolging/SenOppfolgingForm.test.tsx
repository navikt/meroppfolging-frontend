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
      await screen.findByRole('group', {
        name: 'Hvilken situasjon tror du at du er i når sykepengene har tatt slutt?',
      }),
    )
    await user.click(radioGroup1.getByLabelText('Jeg er for syk til å jobbe'))

    const radioGroup2 = within(
      screen.getByRole('group', {
        name: 'Ønsker du å snakke med en veileder?',
      }),
    )
    await user.click(radioGroup2.getByLabelText('Ja, jeg vil bli kontaktet'))

    await user.click(screen.getByRole('button', { name: 'Send svarene' }))

    await waitFor(() =>
      expect(requestResolver).toBeCalledWith({
        senOppfolgingFormV2: [
          {
            answerText: 'Jeg er for syk til å jobbe',
            answerType: 'FORTSATT_SYK',
            questionText: 'Hvilken situasjon tror du at du er i når sykepengene har tatt slutt?',
            questionType: 'FREMTIDIG_SITUASJON',
          },
          {
            answerText: 'Ja, jeg vil bli kontaktet',
            answerType: 'JA',
            questionText: 'Ønsker du å snakke med en veileder?',
            questionType: 'BEHOV_FOR_OPPFOLGING',
          },
        ],
      }),
    )
  })
})
