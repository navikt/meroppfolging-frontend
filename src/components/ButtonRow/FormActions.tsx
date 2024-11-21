import { Button, HStack } from '@navikt/ds-react'
import { ReactElement } from 'react'

interface Props {
  previousStep?: () => void
  nextStep?: () => void
  displaySubmitButton?: boolean
}

export const FormActions = ({ previousStep, nextStep, displaySubmitButton }: Props): ReactElement => {
  return (
    <HStack gap="8">
      {previousStep && <Button onClick={previousStep}>Forrige</Button>}
      {nextStep && <Button onClick={nextStep}>Neste</Button>}
      {displaySubmitButton && <Button type="submit">Send svarene</Button>}
    </HStack>
  )
}
