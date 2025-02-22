import type { CharListGetRequest, CharsListGetResponse } from './chars-list.types.ts'
import { starWarsApiClient, StarWarsApiPath } from 'entities/star-wars-api-client'

export async function fetchCharsList(req: CharListGetRequest): Promise<CharsListGetResponse> {
  return starWarsApiClient.get<CharListGetRequest, CharsListGetResponse>({
    path: StarWarsApiPath.people,
    search: req,
  })
}
