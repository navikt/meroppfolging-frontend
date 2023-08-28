import { formPage } from '@/domain/formPages'
import { QuestionId } from '@/types/merOppfolgingForm'

export function isQuestionId(value: string): value is QuestionId {
  return value in QuestionId
}

export function isFormPageParam(value: string | string[] | undefined | null): value is keyof typeof formPage {
  if (!value) return false
  if (Array.isArray(value)) return false
  return value in Object.keys(formPage)
}
