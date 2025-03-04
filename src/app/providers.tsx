'use client'

import React from 'react'
import { configureLogger } from '@navikt/next-logger'
import { BASE_PATH } from '@/constants/appConstants'
import { initFaro } from '@/libs/faro/faro'

configureLogger({
  basePath: BASE_PATH,
})

initFaro()

interface Props {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return children
}
