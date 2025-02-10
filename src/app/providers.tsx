'use client'

import React from 'react'
import { configureLogger } from '@navikt/next-logger'
import { BASE_PATH } from '@/constants/appConstants'

configureLogger({
  basePath: BASE_PATH,
})

interface Props {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return children
}
