import { addDays } from 'date-fns'

import { createMaxDateDTO } from '../factories/esyfoVarselDTO'

export const maxDateDTO = createMaxDateDTO({
  maxDate: addDays(new Date(), 85).toString(),
  utbetaltTom: addDays(new Date(), 5).toString(),
})
