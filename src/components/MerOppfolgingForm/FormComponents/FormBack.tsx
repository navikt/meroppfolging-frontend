import NextLink from 'next/link'
import { ChevronLeftIcon } from '@navikt/aksel-icons'
import { Link } from '@navikt/ds-react'

import { getFormUrlObject } from '@/utils/utils'
import { FormPage } from '@/types/merOppfolgingForm'

function FormBack({ formPage }: { formPage: FormPage | null }): React.ReactElement {
  if (formPage === null) {
    return <></>
  }

  return (
    <NextLink href={getFormUrlObject(formPage)} passHref>
      <Link>
        <ChevronLeftIcon aria-hidden fontSize="1.5rem" />
        Tilbake
      </Link>
    </NextLink>
  )
}

export default FormBack
