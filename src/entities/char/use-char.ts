import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import type { ApiError } from 'shared/api-client'
import type { CharGetRequest, CharGetResponse } from './char.types.ts'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from 'entities/query-client'
import { useMemo } from 'react'
import { fetchChar, getRequestIdFromUrl } from './char.requests.ts'

export function getCharQueryKey(req: CharGetRequest): QueryKey {
  const key = 'character'
  return [key, req.id]
}

export function setQueryData(value: CharGetResponse): void {
  const id = getRequestIdFromUrl(value.url)

  if (id !== null) {
    queryClient.setQueriesData({ queryKey: getCharQueryKey({ id }) }, value)
  }
}

type CharGetQuery = UseQueryResult<CharGetResponse, ApiError>

export function useGetChar(id: string): CharGetQuery {
  const req: CharGetRequest = useMemo(() => ({ id }), [id])

  return useQuery<CharGetResponse, ApiError>({
    queryKey: getCharQueryKey(req),
    queryFn: async () => {
      return fetchChar(req)
    },
  }, queryClient)
}
