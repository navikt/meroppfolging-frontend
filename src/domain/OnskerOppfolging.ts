export enum OnskerOppfolgingQuestionId {
  onskerOppfolging = 'ONSKER_OPPFOLGING',
}

export enum OnskerOppfolgingOrigins {
  landing = 'LANDING',
  form = 'FORM',
}

export enum OnskerOppfolgingValues {
  JA = 'JA',
  NEI = 'NEI',
}

export const onskerOppfolgingQuestionTexts = {
  [OnskerOppfolgingOrigins.landing]: 'Trenger du mer oppfølging fra oss?',
  [OnskerOppfolgingOrigins.form]: 'Er du enig i NAV sin vurdering over?',
} as const satisfies Record<OnskerOppfolgingOrigins, string>

export const onskerOppfolgingLandingAlt = {
  [OnskerOppfolgingValues.JA]: 'Ja',
  [OnskerOppfolgingValues.NEI]: 'Nei',
} as const satisfies Record<OnskerOppfolgingValues, string>

export const onskerOppfolgingSummaryAlt = {
  [OnskerOppfolgingValues.JA]: 'Uenig, jeg trenger mer veiledning',
  [OnskerOppfolgingValues.NEI]: 'Enig',
} as const satisfies Record<OnskerOppfolgingValues, string>

export const onskerOppfolgingAlt = {
  [OnskerOppfolgingOrigins.landing]: onskerOppfolgingLandingAlt,
  [OnskerOppfolgingOrigins.form]: onskerOppfolgingSummaryAlt,
} as const satisfies Record<OnskerOppfolgingOrigins, Record<OnskerOppfolgingValues, string>>
