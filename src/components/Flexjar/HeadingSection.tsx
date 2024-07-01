import { MagnifyingGlassIcon } from '@navikt/aksel-icons'
import { BodyShort, Label } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export const HeadingSection = (): ReactElement => {
  return (
    <div className="bg-surface-subtle p-6 flex gap-4 items-center">
      <div className="bg-gray-900 w-10 h-10 rounded-full flex justify-center items-center">
        <MagnifyingGlassIcon aria-hidden={true} className="text-white axe-exclude" />
      </div>
      <div>
        <Label as="h3" className="mb-2">
          Hjelp oss med å gjøre denne siden bedre
        </Label>
        <BodyShort>Anonym tilbakemelding på tjenesten</BodyShort>
      </div>
    </div>
  )
}
