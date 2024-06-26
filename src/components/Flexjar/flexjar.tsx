import { SubmitHandler, useForm } from 'react-hook-form'
import React, { ReactElement } from 'react'
import { Alert, Button, Textarea } from '@navikt/ds-react'

import {
  OpprettFeedbackData,
  useOpprettFlexjarFeedback,
} from '@/components/Flexjar/queryhooks/useOpprettFlexjarFeedback'
import { HovedSporsmal } from '@/components/Flexjar/HovedSporsmal'
import { HeadingSection } from '@/components/Flexjar/HeadingSection'
import { TakkForTilbakemeldingen } from '@/components/Flexjar/TakkForTilbakemeldingen'

export type FeedbackSvar = 'JA' | 'NEI' | 'FORBEDRING' | null

export type FormValues = {
  feedbackSvar: FeedbackSvar
  beskrivelse: string | null
}

interface Props {
  feedbackId: string
  sporsmal: string
  oppfolgingsSporsmalJA?: string
  oppfolgingsSporsmalNEI?: string
}

export const Flexjar = ({
  feedbackId,
  sporsmal,
  oppfolgingsSporsmalJA,
  oppfolgingsSporsmalNEI,
}: Props): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<FormValues>()
  const sendFeedbackMutation = useOpprettFlexjarFeedback()

  const feedbackSvar = watch('feedbackSvar')

  const getOppfolgingsSporsmalText = (feedbackSvar: FeedbackSvar): string => {
    switch (feedbackSvar) {
      case 'JA':
        return oppfolgingsSporsmalJA ? oppfolgingsSporsmalJA : 'Er det noe du vil trekke frem? (valgfritt)'
      case 'NEI':
        return oppfolgingsSporsmalNEI ? oppfolgingsSporsmalNEI : 'Hvilken informasjon leter du etter?'
      case 'FORBEDRING':
        return 'Hva kan forbedres?'
      default:
        throw Error('Ugyldig tilbakemeldingstype')
    }
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const feedbackData: OpprettFeedbackData = {
      sporsmal: sporsmal,
      svar: data.feedbackSvar!,
      oppfolgingssporsmal: getOppfolgingsSporsmalText(data.feedbackSvar!),
      feedback: data.beskrivelse,
      feedbackId: feedbackId,
    }
    sendFeedbackMutation.mutate(feedbackData)
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full">
        <div className="w:full md:w-3/4">
          <div className="mt-1 border-4 border-surface-subtle rounded-medium">
            <HeadingSection />

            <div className="px-6 py-8">
              <HovedSporsmal
                sporsmal={sporsmal}
                control={control}
                error={errors.feedbackSvar?.message}
                disabled={isSubmitSuccessful}
              />

              {!isSubmitSuccessful && feedbackSvar && (
                <div className="mt-6 w-full">
                  <Textarea
                    {...register('beskrivelse', {
                      required:
                        (feedbackSvar === 'FORBEDRING' || feedbackSvar === 'NEI') &&
                        'Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.',
                    })}
                    label={getOppfolgingsSporsmalText(feedbackSvar)}
                    error={errors.beskrivelse?.message}
                    maxLength={600}
                    minRows={3}
                  />

                  <Alert variant="warning" className="mt-4">
                    Ikke skriv inn navn eller andre personopplysninger. Dette blir kun brukt til å forbedre tjenesten.
                    Du vil ikke få et svar fra oss.
                  </Alert>

                  <Button type="submit" className="mr-auto mt-6" size="medium" variant="secondary-neutral">
                    Send tilbakemelding
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isSubmitSuccessful && <TakkForTilbakemeldingen />}
        </div>
      </form>
    </section>
  )
}
