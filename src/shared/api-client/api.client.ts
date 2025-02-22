import { ApiError } from './api.error'

export type GetPayload = void | Record<string, string>

export interface GetParams<Req extends GetPayload> {
  path: string
  search: Req
  headers?: HeadersInit
}

export class ApiClient {
  private getHeaders(base: HeadersInit | undefined): Headers {
    const headers = new Headers(base)

    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json')
    }

    return headers
  }

  private getJsonSafe(data: string): Record<string, unknown> | null {
    try {
      return JSON.parse(data) as Record<string, unknown>
    }
    catch {
      return null
    }
  }

  get = async <Req extends GetPayload, Res>(params: GetParams<Req>): Promise<Res> => {
    const headers = this.getHeaders(params.headers)

    const search = !(params.search) ? '' : `?${new URLSearchParams(params.search).toString()}`
    const path = `${params.path}${search}`

    const response = await fetch(path, {
      headers,
    })

    const text = await response.text()
    const json = this.getJsonSafe(text)

    if (!response.ok) {
      throw new ApiError(response, json, text)
    }

    return json as Res
  }
}
