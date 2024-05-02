import NextLink from 'next/link'
import { ChevronLeftIcon } from '@navikt/aksel-icons'
import { Link } from '@navikt/ds-react'

import { getFormUrl } from '@/utils/utils'
import { FormPage } from '@/types/merOppfolgingForm'

function FormBackLink({ formPage }: { formPage: FormPage | null }): React.ReactElement {
  if (formPage === null) {
    return <></>
  }

  return (
    <NextLink href={getFormUrl(formPage)} passHref>
      <Link as="span">
        <ChevronLeftIcon aria-hidden fontSize="1.5rem" />
        Tilbake
      </Link>
    </NextLink>
  )
}

export default FormBackLink
