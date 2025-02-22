import type { CharGetRequest, CharGetResponse } from './char.types.ts'
import { charCacheService } from 'entities/char-cache'
import { starWarsApiClient, StarWarsApiPath } from 'entities/star-wars-api-client'
import { generatePath } from 'react-router-dom'

export function getRequestIdFromUrl(url: string): string | null {
  return url.split('/').filter(Boolean).at(-1) ?? null
}

export async function fetchChar(req: CharGetRequest): Promise<CharGetResponse> {
  const result = await starWarsApiClient.get<void, CharGetResponse>({
    path: generatePath(StarWarsApiPath.char, { id: req.id }) as StarWarsApiPath,
    search: void 0,
  })

  return charCacheService.interceptItemTransportWithLocalChanges(result)
}
