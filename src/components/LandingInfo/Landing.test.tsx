import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/testUtils'
import { IkkeSvart, IkkeSvartAndShouldNotHaveAccess } from '@/mocks/data/fixtures/statusDtoFixtures'
import { Landing } from '@/components/LandingInfo/Landing'
import { maxDateDTO } from '@/mocks/data/fixtures/sykepengedagerInformasjonDTO'
import React from 'react'

describe('SnartSlutt', () => {
  it('should display start page', async () => {
    render(<Landing senOppfolgingStatus={IkkeSvart} maxDate={maxDateDTO} />)

    expect(
      await screen.findByRole('heading', { name: 'Sykepengene dine tar snart slutt', level: 1 }),
    ).toBeInTheDocument()
  })

  it('should display heading for no access screen if user should not have access to sen oppfølging solution', async () => {
    render(<Landing senOppfolgingStatus={IkkeSvartAndShouldNotHaveAccess} maxDate={maxDateDTO} />)

    expect(
      await screen.findByRole('heading', { name: 'Beklager, du kan ikke svare på dette skjemaet nå.', level: 1 }),
    ).toBeInTheDocument()
  })
})
