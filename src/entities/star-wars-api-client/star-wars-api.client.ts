import type { ApiClient } from 'shared/api-client'
import type { StarWarsGetParams, StarWarsGetSearchParams } from './start-wars-api.types.ts'
import { apiClient } from 'entities/api-client'

class StarWarsApiClient {
  private basePath = 'https://swapi.dev'

  constructor(private apiClient: ApiClient) {
  }

  get = async <Req extends StarWarsGetSearchParams, Res>(params: StarWarsGetParams<Req>): Promise<Res> => {
    const path = `${this.basePath}/${params.path}`
    return this.apiClient.get<Req, Res>({ ...params, path })
  }
}

export const starWarsApiClient = new StarWarsApiClient(apiClient)
