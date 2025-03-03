import React from 'react'
import { getMaxDate } from '@/server/fetch/getMaxDate'
import Receipt from '@/components/Form/Receipt/Receipt'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const maxDate = await getMaxDate()
  const { fremtidigSituasjon, behovForOppfolging } = await searchParams

  return (
    <Receipt
      fremtidigSituasjonAnswer={fremtidigSituasjon as FremtidigSituasjonAnswerTypes}
      behovForOppfolgingAnswer={behovForOppfolging as BehovForOppfolgingAnswerTypes}
      responseDateISOString={new Date().toISOString()}
      maxDate={maxDate}
    />
  )
}
