import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { waitFor, within } from '@testing-library/react'
import { invert } from 'remeda'

import { testServer } from '@/mocks/testServer'
import { trpcMsw } from '@/utils/trpc'
import { formPageInverted } from '@/domain/formPages'

import { render, screen } from '../../../test/testUtils'
import MerOppfolgingForm from '../MerOppfolgingForm'
import { summaryTexts } from '../Summary/summaryTexts'

const summaryTextsInverted = invert(summaryTexts)

function checkSummaryRowContent(row: HTMLElement, header: string, userInput: string): void {
  const [input, link] = within(row).getAllByRole('cell')

  expect(within(row).getByRole('rowheader', { name: header })).toBeInTheDocument()
  expect(input).toHaveTextContent(userInput)
  expect(within(link).getByRole('link', { name: `Endre svaret på ${header}` })).toHaveAttribute(
    'href',
    `/reg/${formPageInverted[summaryTextsInverted[header]]}`,
  )
}

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

  describe('filling out form', () => {
    it('with tilbake til jobb and mer veiledning should submit form', async () => {
      const requestResolver = vi.fn()
      testServer.use(
        trpcMsw.submitSenOppfolging.mutation(async (req, res, ctx) => {
          requestResolver(await req.json())
          return res(ctx.status(200), ctx.data())
        }),
      )
      const { user } = render(<MerOppfolgingForm />)

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
      const tableRows = summaryTable.getAllByRole('row')

      checkSummaryRowContent(tableRows[1], 'Fremtidig situasjon', 'Jeg skal tilbake til jobben jeg har')
      checkSummaryRowContent(tableRows[2], 'Tilbake i jobb før sykmeldt i 52 uker', 'Ja, i full stilling')

      await user.click(screen.getByRole('button', { name: 'Fullfør' }))

      await waitFor(() =>
        expect(requestResolver).toBeCalledWith({
          besvarelse: {
            utdanning: 'INGEN_SVAR',
            utdanningGodkjent: 'INGEN_SVAR',
            utdanningBestatt: 'INGEN_SVAR',
            andreForhold: 'INGEN_SVAR',
            fremtidigSituasjon: 'SAMME_ARBEIDSGIVER',
            tilbakeIArbeid: 'JA_FULL_STILLING',
            sisteStilling: 'INGEN_SVAR',
          },
          teksterForBesvarelse: [
            {
              sporsmalId: 'utdanning',
              sporsmal: 'Hva er din høyeste fullførte utdanning?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'utdanningGodkjent',
              sporsmal: 'Er utdanningen din godkjent i Norge?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'utdanningBestatt',
              sporsmal: 'Er utdanningen din bestått?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'andreForhold',
              sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'fremtidigSituasjon',
              sporsmal: 'Hva tenker du om din fremtidige situasjon?',
              svar: 'Jeg skal tilbake til jobben jeg har',
            },
            {
              sporsmalId: 'sisteStilling',
              sporsmal: 'Hva er din siste jobb?',
              svar: 'Ikke oppgitt',
            },
            {
              sporsmalId: 'tilbakeIArbeid',
              sporsmal: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
              svar: 'Ja, i full stilling',
            },
          ],
        }),
      )
    })

    it('with trenger ny jobb should submit form', async () => {
      const requestResolver = vi.fn()
      testServer.use(
        trpcMsw.submitSenOppfolging.mutation(async (req, res, ctx) => {
          requestResolver(await req.json())
          return res(ctx.status(200), ctx.data())
        }),
      )
      const { user } = render(<MerOppfolgingForm />)

      const radioGroup1 = within(
        await screen.findByRole('group', {
          name: 'Hva tenker du om din fremtidige situasjon?',
        }),
      )
      await user.click(radioGroup1.getByLabelText('Jeg trenger ny jobb'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const radioGroup2 = within(
        await screen.findByRole('group', {
          name: 'Hva er din høyeste fullførte utdanning?',
        }),
      )
      await user.click(radioGroup2.getByLabelText('Grunnskole'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const radioGroup3 = within(
        await screen.findByRole('group', {
          name: 'Er utdanningen din godkjent i Norge?',
        }),
      )
      await user.click(radioGroup3.getByLabelText('Ja'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const radioGroup4 = within(
        await screen.findByRole('group', {
          name: 'Er utdanningen din bestått?',
        }),
      )
      await user.click(radioGroup4.getByLabelText('Ja'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const radioGroup5 = within(
        await screen.findByRole('group', {
          name: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
        }),
      )
      await user.click(radioGroup5.getByLabelText('Ja'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const summaryTable = within(await screen.findByRole('table', { name: 'Sammendrag av svar' }))
      const tableRows = summaryTable.getAllByRole('row')

      checkSummaryRowContent(tableRows[1], 'Fremtidig situasjon', 'Jeg trenger ny jobb')
      checkSummaryRowContent(tableRows[2], 'Høyeste fullførte utdanning', 'Grunnskole')
      checkSummaryRowContent(tableRows[3], 'Utdanning godkjent i Norge', 'Ja')
      checkSummaryRowContent(tableRows[4], 'Utdanning bestått', 'Ja')
      checkSummaryRowContent(tableRows[5], 'Andre hensyn', 'Ja')

      await user.click(screen.getByRole('button', { name: 'Fullfør' }))

      await waitFor(() =>
        expect(requestResolver).toBeCalledWith({
          besvarelse: {
            utdanning: 'GRUNNSKOLE',
            utdanningGodkjent: 'JA',
            utdanningBestatt: 'JA',
            andreForhold: 'JA',
            fremtidigSituasjon: 'NY_ARBEIDSGIVER',
            sisteStilling: 'INGEN_SVAR',
          },
          teksterForBesvarelse: [
            {
              sporsmalId: 'utdanning',
              sporsmal: 'Hva er din høyeste fullførte utdanning?',
              svar: 'Grunnskole',
            },
            {
              sporsmalId: 'utdanningGodkjent',
              sporsmal: 'Er utdanningen din godkjent i Norge?',
              svar: 'Ja',
            },
            {
              sporsmalId: 'utdanningBestatt',
              sporsmal: 'Er utdanningen din bestått?',
              svar: 'Ja',
            },
            {
              sporsmalId: 'andreForhold',
              sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
              svar: 'Ja',
            },
            {
              sporsmalId: 'fremtidigSituasjon',
              sporsmal: 'Hva tenker du om din fremtidige situasjon?',
              svar: 'Jeg trenger ny jobb',
            },
            {
              sporsmalId: 'sisteStilling',
              sporsmal: 'Hva er din siste jobb?',
              svar: 'Ikke oppgitt',
            },
          ],
        }),
      )
    })

    it('with ingen passer should submit form', async () => {
      const requestResolver = vi.fn()
      testServer.use(
        trpcMsw.submitSenOppfolging.mutation(async (req, res, ctx) => {
          requestResolver(await req.json())
          return res(ctx.status(200), ctx.data())
        }),
      )
      const { user } = render(<MerOppfolgingForm />)

      const radioGroup1 = within(
        await screen.findByRole('group', {
          name: 'Hva tenker du om din fremtidige situasjon?',
        }),
      )
      await user.click(radioGroup1.getByLabelText('Ingen av disse alternativene passer'))
      await user.click(screen.getByRole('button', { name: 'Neste' }))

      const summaryTable = within(await screen.findByRole('table', { name: 'Sammendrag av svar' }))
      const tableRows = summaryTable.getAllByRole('row')

      checkSummaryRowContent(tableRows[1], 'Fremtidig situasjon', 'Ingen av disse alternativene passer')

      await user.click(screen.getByRole('button', { name: 'Fullfør' }))

      await waitFor(() =>
        expect(requestResolver).toBeCalledWith({
          besvarelse: {
            utdanning: 'INGEN_SVAR',
            utdanningGodkjent: 'INGEN_SVAR',
            utdanningBestatt: 'INGEN_SVAR',
            andreForhold: 'INGEN_SVAR',
            fremtidigSituasjon: 'INGEN_PASSER',
            sisteStilling: 'INGEN_SVAR',
          },
          teksterForBesvarelse: [
            {
              sporsmalId: 'utdanning',
              sporsmal: 'Hva er din høyeste fullførte utdanning?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'utdanningGodkjent',
              sporsmal: 'Er utdanningen din godkjent i Norge?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'utdanningBestatt',
              sporsmal: 'Er utdanningen din bestått?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'andreForhold',
              sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
              svar: 'Ikke besvart',
            },
            {
              sporsmalId: 'fremtidigSituasjon',
              sporsmal: 'Hva tenker du om din fremtidige situasjon?',
              svar: 'Ingen av disse alternativene passer',
            },
            {
              sporsmalId: 'sisteStilling',
              sporsmal: 'Hva er din siste jobb?',
              svar: 'Ikke oppgitt',
            },
          ],
        }),
      )
    })
  })
})
