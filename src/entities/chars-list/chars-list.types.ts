import type { CharGetResponse } from 'entities/char'
import type { StarWarsGetSearchParams } from 'entities/star-wars-api-client'

export type CharListGetRequest = StarWarsGetSearchParams

export interface CharsListGetResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<CharGetResponse>
}
