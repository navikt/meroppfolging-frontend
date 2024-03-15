import React, { ReactNode, ReactElement } from 'react'

function FormPageContainer({ className = '', children }: { className?: string; children: ReactNode }): ReactElement {
  return <div className={`flex flex-col items-center w-full p-4 md:p-8 ${className}`}>{children}</div>
}

export default FormPageContainer
