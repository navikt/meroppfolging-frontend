import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import NestedRadioGroup from '@/pilot/components/FormComponents/NestedRadioGroup'

describe('NestedRadioGroup', () => {
  it('should', async () => {
    render(<NestedRadioGroup name="BEHOV_FOR_OPPFOLGING" description="Test description" />)

    expect(screen.getByRole('group', { name: 'Har du behov for hjelp fra oss i NAV?' })).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Ja, jeg vil snakke med en veileder i NAV' })).toBeInTheDocument()
    expect(
      screen.getByRole('radio', {
        name: 'Nei takk, jeg klarer meg på egenhånd',
      }),
    ).toBeInTheDocument()
  })
})
