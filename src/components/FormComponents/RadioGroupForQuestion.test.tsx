import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'

describe('RadioGroupForQuestion', () => {
  it('should render', async () => {
    render(<RadioGroupForQuestion questionName="BEHOV_FOR_OPPFOLGING" description={<div>Test description</div>} />)

    expect(
      screen.getByRole('group', { name: 'Ønsker du mer hjelp fra en sykefravær-veileder nå?' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(
      screen.getByRole('radio', {
        name: 'Ja, jeg vil bli kontaktet av en veileder',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', {
        name: 'Nei, jeg trenger ikke å bli kontaktet nå',
      }),
    ).toBeInTheDocument()
  })
})
