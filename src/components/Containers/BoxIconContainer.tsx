import { HStack, Hide } from '@navikt/ds-react'
import { ReactElement } from 'react'

const CircledIcon = ({ icon }: { icon: ReactElement }): ReactElement => {
  return (
    <div className="h-16 w-16 bg-lightblue-100 rounded-full flex items-center justify-center text-4xl shrink-0">
      {icon}
    </div>
  )
}

function IconContainer({ icon, children }: { icon: ReactElement; children: ReactElement }): ReactElement {
  return (
    <HStack gap="6" className="flex-nowrap">
      <Hide below="md">
        <CircledIcon icon={icon} />
      </Hide>
      {children}
    </HStack>
  )
}

export default IconContainer
