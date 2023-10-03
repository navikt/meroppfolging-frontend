import React, { ReactNode } from 'react'
import Image from 'next/legacy/image'
import { BodyLong, Heading } from '@navikt/ds-react'

import pageErrorDad from './Images/error-page-dad.svg'
import notFoundMom from './Images/not-found-mom.svg'

interface Props {
  graphic?: 'dad' | 'mom'
  text?: string
  details?: ReactNode
  action?: ReactNode | null
}

const PageError = ({ graphic = 'dad', text, details }: Props): JSX.Element => {
  const errorText = text ?? 'Beklager! Det har oppstått en uventet feil'

  return (
    <div className="flex max-w-3xl max-[960px]:flex-col" role="status" aria-live="polite">
      {graphic === 'dad' ? (
        <Image src={pageErrorDad} alt="" className="max-[960px]:max-h[240px] mr-8 flex-[1_1_50%] max-[960px]:mb-4" />
      ) : (
        <Image src={notFoundMom} alt="" className="max-[960px]:max-h[240px] mr-8 flex-[1_1_50%] max-[960px]:mb-4" />
      )}
      <div>
        <Heading spacing size="large" level="1">
          Oops!
        </Heading>
        <Heading spacing size="small" level="2">
          {errorText}
        </Heading>
        {details ?? (
          <BodyLong spacing>
            {' '}
            Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss hvis det ikke har løst seg til i morgen.
          </BodyLong>
        )}
      </div>
    </div>
  )
}

export default PageError
