import Link from 'next/link'
import { ChevronLeftIcon } from '@navikt/aksel-icons'

import { getFormUrlObject } from '@/utils/utils'
import { FormPage } from '@/types/merOppfolgingForm'

function FormBack({ formPage }: { formPage: FormPage | null }): React.ReactElement {
  if (formPage === null) {
    return <></>
  }

  return (
    <Link href={getFormUrlObject(formPage)} className="navds-link">
      <ChevronLeftIcon aria-hidden fontSize="1.5rem" />
      Tilbake
    </Link>
  )
}

export default FormBack
