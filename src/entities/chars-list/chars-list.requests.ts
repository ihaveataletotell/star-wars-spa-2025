import type { CharListGetRequest, CharsListGetResponse } from './chars-list.types.ts'
import { charCacheService } from 'entities/char-cache'
import { starWarsApiClient, StarWarsApiPath } from 'entities/star-wars-api-client'

export async function fetchCharsList(req: CharListGetRequest): Promise<CharsListGetResponse> {
  const result = await starWarsApiClient.get<CharListGetRequest, CharsListGetResponse>({
    path: StarWarsApiPath.people,
    search: req,
  })

  return charCacheService.interceptListTransportWithLocalChanges(result)
}
