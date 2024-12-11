import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import { ISODateStringToLongFormat } from '@/utils/dateUtils'

const ThankYouAlert = ({ responseDateISOString }: { responseDateISOString: string | undefined }): React.ReactNode => (
  <Alert variant="success">
    <Heading size="small" level="2">
      Takk, svarene dine er sendt til Nav.
    </Heading>

    {responseDateISOString && <BodyShort>Sendt: {ISODateStringToLongFormat(responseDateISOString)}</BodyShort>}
  </Alert>
)

export default ThankYouAlert
