import Link from 'next/link'
import { Back } from '@navikt/ds-icons'

import { getFormUrlObject } from '../../../utils/utils'

import { FormPage } from '@/types/merOppfolgingForm'

function FormBack({ formPage }: { formPage: FormPage | null }): React.ReactElement {
  if (formPage === null) {
    return <></>
  }

  return (
    <Link href={getFormUrlObject(formPage)} className="navds-link">
      <Back aria-hidden="true" /> Tilbake
    </Link>
  )
}

export default FormBack
