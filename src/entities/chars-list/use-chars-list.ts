import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import type { ApiError } from 'shared/api-client'
import type { CharListGetRequest, CharsListGetResponse } from './chars-list.types.ts'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from 'entities/query-client'
import { fetchCharsList } from './chars-list.requests.ts'

export function getCharsListQueryKey(req: CharListGetRequest): QueryKey {
  const key = 'chars-list'
  if (!req) {
    return [key]
  }

  return [key, req.page, req.search]
}

type CharsListGetQuery = UseQueryResult<CharsListGetResponse, ApiError>

export function useCharsList(req: CharListGetRequest): CharsListGetQuery {
  return useQuery<CharsListGetResponse, ApiError>({
    queryKey: getCharsListQueryKey(req),
    queryFn: async () => {
      return fetchCharsList(req)
    },
  }, queryClient)
}
