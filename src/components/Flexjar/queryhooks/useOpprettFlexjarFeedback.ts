import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { post } from '@/libs/fetch'

export function useOpprettFlexjarFeedback(): UseMutationResult<OpprettFeedbackResponse, unknown, OpprettFeedbackData> {
  const mutationFn = async (data: OpprettFeedbackData): Promise<OpprettFeedbackResponse> => {
    return post<OpprettFeedbackResponse>(`/syk/meroppfolging/api/flexjar`, data)
  }

  return useMutation<OpprettFeedbackResponse, unknown, OpprettFeedbackData>(mutationFn)
}

interface OpprettFeedbackResponse {
  id: string
}

export interface OpprettFeedbackData {
  sporsmal: string
  svar: string
  oppfolgingssporsmal: string
  feedback: string | null
  feedbackId: string
}
