const UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g
const ORGNR = /\b[0-9a-f]{9}\b/g
const FNR = /\b[0-9]{11}\b/g

export function cleanPathForMetric(value: string): string {
  return value?.replace(UUID, '[uuid]').replace(ORGNR, '[orgnr]').replace(FNR, '[fnr]')
}
