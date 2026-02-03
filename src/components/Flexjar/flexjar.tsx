import { SubmitHandler, useForm } from 'react-hook-form'
import React, { ReactElement } from 'react'
import { Alert, Box, Button, Textarea, VStack } from '@navikt/ds-react'

import {
  OpprettFeedbackData,
  useOpprettFlexjarFeedback,
} from '@/components/Flexjar/queryhooks/useOpprettFlexjarFeedback'
import { HovedSporsmal } from '@/components/Flexjar/HovedSporsmal'
import { HeadingSection } from '@/components/Flexjar/HeadingSection'
import { TakkForTilbakemeldingen } from '@/components/Flexjar/TakkForTilbakemeldingen'

export type SvarPaaHovedsporsmal = 'JA' | 'NEI' | 'FORBEDRING' | null

export type FormValues = {
  svar: SvarPaaHovedsporsmal
  svarBeskrivelse: string | null
}

interface Props {
  feedbackId: string
  sporsmal: string
}

export const Flexjar = ({ feedbackId, sporsmal }: Props): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<FormValues>()
  const sendFeedbackMutation = useOpprettFlexjarFeedback()

  const svar = watch('svar')

  const getOppfolgingsSporsmalText = (svar: SvarPaaHovedsporsmal): string => {
    switch (svar) {
      case 'JA':
        return 'Er det noe du vil trekke frem? (valgfritt)'
      case 'NEI':
        return 'Hvilken informasjon leter du etter?'
      case 'FORBEDRING':
        return 'Hva kan forbedres?'
      default:
        throw Error('Ugyldig tilbakemeldingstype')
    }
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const feedbackData: OpprettFeedbackData = {
      sporsmal: sporsmal,
      svar: data.svar!,
      oppfolgingssporsmal: getOppfolgingsSporsmalText(data.svar!),
      feedback: data.svarBeskrivelse,
      feedbackId: feedbackId,
    }
    sendFeedbackMutation.mutate(feedbackData)
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full">
        <div className="w-full md:w-3/4">
          <Box borderWidth="4" borderColor="neutral-subtle" borderRadius="8" marginBlock="space-4 space-0">
            <HeadingSection />

            <Box paddingInline="space-24" paddingBlock="space-32">
              <HovedSporsmal
                sporsmal={sporsmal}
                control={control}
                error={errors.svar?.message}
                disabled={isSubmitSuccessful}
              />

              {!isSubmitSuccessful && svar && (
                <VStack gap="space-24" marginBlock="space-24 space-0" align="start" width="100%">
                  <Textarea
                    {...register('svarBeskrivelse', {
                      required:
                        (svar === 'FORBEDRING' || svar === 'NEI') &&
                        'Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.',
                    })}
                    label={getOppfolgingsSporsmalText(svar)}
                    error={errors.svarBeskrivelse?.message}
                    maxLength={600}
                    minRows={3}
                  />

                  <Alert variant="warning">
                    Ikke skriv inn navn eller andre personopplysninger. Dette blir kun brukt til å forbedre tjenesten.
                    Du vil ikke få et svar fra oss.
                  </Alert>

                  <Button data-color="neutral" type="submit" size="medium" variant="secondary">
                    Send tilbakemelding
                  </Button>
                </VStack>
              )}
            </Box>
          </Box>

          {isSubmitSuccessful && <TakkForTilbakemeldingen />}
        </div>
      </form>
    </section>
  )
}
