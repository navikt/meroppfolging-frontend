import { addDays, subDays } from 'date-fns'

import { createMaxDateDTO } from '../factories/esyfoVarselDTO'

export const maxDateDTO = createMaxDateDTO({
  maxDate: addDays(new Date(), 85).toString(),
  utbetaltTom: subDays(new Date(), 5).toString(),
})
