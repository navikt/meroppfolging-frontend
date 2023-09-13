import { ReactElement, ReactNode } from 'react'

interface Props {
  className?: string
  children: ReactNode
}

export const Column = ({ className, children }: Props): ReactElement => {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
}
