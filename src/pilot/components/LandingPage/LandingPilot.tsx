import { ReactElement, useState } from 'react'
import { Button, Radio, RadioGroup, VStack } from '@navikt/ds-react'

import PageContainer from '@/pilot/components/containers/PageContainer'
import SenOppfolging from '@/pilot/components/SenOppfolging/SenOppfolging'
import Receipt from '@/pilot/components/Receipt/Receipt'
import { FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import { ANSWER_TEXTS, QUESTION_TEXTS, QuestionTypes } from '@/pilot/domain/formValues'

export function RadioAlternatives(questionType: QuestionTypes): React.ReactElement[] {
  const radioGroupAlts = ANSWER_TEXTS[questionType]

  return Object.entries(radioGroupAlts).map(([key, value]) => {
    return (
      <Radio key={key} value={key}>
        {value}
      </Radio>
    )
  })
}

export type Next = FremtidigSituasjonAnswerTypes | null

function LandingContent(): ReactElement {
  const [next, setNext] = useState<Next>(null)
  const [value, setValue] = useState<Next>(null)

  if (next === null) {
    return (
      <SenOppfolging>
        <>
          <RadioGroup legend={QUESTION_TEXTS['FREMTIDIG_SITUASJON']} onChange={(it: Next) => setValue(it)}>
            {RadioAlternatives('FREMTIDIG_SITUASJON')}
          </RadioGroup>
          <Button className="w-fit mt-6" onClick={() => setNext(value)}>
            Neste
          </Button>
        </>
      </SenOppfolging>
    )
  } else {
    return <Receipt next={next} />
  }
}

function LandingPilot(): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <LandingContent />
      </VStack>
    </PageContainer>
  )
}

export default LandingPilot
