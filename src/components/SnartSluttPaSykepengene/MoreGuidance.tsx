import { GuidePanel, Heading, BodyLong, List, Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'

import { getFormUrlObject } from '@/utils/utils'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { trpc } from '@/utils/trpc'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

function MoreGuidance(): ReactElement | null {
  const { push } = useRouter()
  const status = trpc.sykmeldtStatus.useQuery()

  if (status.isError) {
    logAmplitudeEvent({
      eventName: 'alert vist',
      data: { variant: 'error', tekst: 'Kunne ikke hente sykmeldt status' },
    })
    logger.error(`Client: Could not fetch sykmeldtStatus`)
  }

  if (status.isSuccess) {
    logAmplitudeEvent(
      {
        eventName: 'guidepanel vist',
        data: { komponent: 'SSPS - mer veiledning' },
      },
      { isSykmeldt: status.data.isSykmeldt },
    )
  }

  if (status.isSuccess && status.data.isSykmeldt === true) {
    return (
      <GuidePanel poster>
        <Heading size="large" level="2" spacing>
          Ønsker du mer veiledning?
        </Heading>

        <BodyLong size="medium" spacing>
          Hvis du tror at du fortsatt vil være syk etter at sykepengene tar slutt, må du registrere deg for mer
          veiledning.
        </BodyLong>

        <List>
          <List.Item>Du kan snakke med veilederen din om mulighetene dine fremover</List.Item>
          <List.Item>Du får informasjon om du har krav på annen økonomisk støtte</List.Item>
        </List>

        <Button
          variant="primary"
          onClick={() => {
            logAmplitudeEvent({
              eventName: 'skjema spørsmål besvart',
              data: { skjemanavn: 'Snart slutt på sykepengene', spørsmål: 'Ønsker du mer veiledning?', svar: 'JA' },
            })
            push(getFormUrlObject(INITIAL_FORM_PAGE))
          }}
        >
          Jeg trenger mer veiledning
        </Button>
      </GuidePanel>
    )
  }

  return null
}
export default MoreGuidance
