import type { StarWarsApiPath } from 'entities/star-wars-api-client/star-wars-api.consts.ts'

export type StarWarsGetSearchParams = void | Partial<{
  search: string
  page: string
}>

export interface StarWarsGetParams<Req extends StarWarsGetSearchParams> {
  path: StarWarsApiPath
  search: Req
  headers?: HeadersInit
}
