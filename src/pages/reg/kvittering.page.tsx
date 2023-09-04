import { ReactElement } from 'react'
import { BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { withAuthenticatedPage } from '@/auth'

function Receipt(): ReactElement {
  return (
    <>
      <Heading level="1" spacing size="medium">
        Du kan nå få mer veiledning
      </Heading>
      <GuidePanel poster>
        <Heading level="2" spacing size="medium">
          Videre støtte etter sykepenger
        </Heading>
        <BodyLong>
          Hvis du skal søke om økonomisk støtte etter at retten til sykepenger tar slutt, må du gjøre det i en egen
          søknad.
        </BodyLong>
      </GuidePanel>
      <Link href="#" passHref legacyBehavior>
        <Button as="a">Les mer</Button>
      </Link>
      <Link href="#">Skal ikke søke nå</Link>
    </>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Receipt
