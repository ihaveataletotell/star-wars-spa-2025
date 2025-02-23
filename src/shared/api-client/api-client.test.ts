/* eslint-disable no-restricted-globals */
import type { GetParams } from './api.client'
import { describe, expect, it, vi } from 'vitest'
import { ApiClient } from './api.client'
import { ApiError } from './api.error'

describe('apiClient', () => {
  const apiClient = new ApiClient()

  it('should set default Accept header if not provided', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue('{}') })

    await apiClient.get({ path: '/test', search: void 0 })

    expect(global.fetch).toHaveBeenCalledWith('/test', {
      headers: new Headers({ Accept: 'application/json' }),
    })
  })

  it('should preserve provided headers', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue('{}') })
    const headers = { Authorization: 'Bearer token' }

    await apiClient.get({ path: '/test', search: void 0, headers })

    expect(global.fetch).toHaveBeenCalledWith('/test', {
      headers: new Headers({ ...headers, Accept: 'application/json' }),
    })
  })

  it('should construct the correct URL with search params', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue('{}') })
    const params: GetParams<Record<string, string>> = { path: '/test', search: { foo: 'bar', baz: 'qux' } }

    await apiClient.get(params)

    expect(global.fetch).toHaveBeenCalledWith('/test?foo=bar&baz=qux', expect.anything())
  })

  it('should throw ApiError on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue('{"error": "Bad Request"}'),
    })

    await expect(apiClient.get({ path: '/test', search: {} })).rejects.toThrow(ApiError)
  })

  it('should return parsed JSON response', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue('{"key": "value"}') })

    const result = await apiClient.get<void, { key: string }>({ path: '/test', search: void 0 })

    expect(result).toEqual({ key: 'value' })
  })

  it('should return null for invalid JSON response', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue('invalid json') })

    const result = await apiClient.get<void, { key: string }>({ path: '/test', search: void 0 })

    expect(result).toBeNull()
  })
})
