import type { MockInstance } from 'vitest'
import { renderHook } from '@testing-library/react'
import { starWarsApiClient, StarWarsApiPath } from 'entities/star-wars-api-client'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { useCharsList } from './use-chars-list.ts'

describe('chars list', () => {
  describe('chars list query', () => {
    let spy: MockInstance

    beforeAll(() => {
      spy = vi.spyOn(starWarsApiClient, 'get')
    })
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('works is base case', () => {
      expect(spy).not.toHaveBeenCalled()
      renderHook(() => useCharsList(1, ''))

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0]).toStrictEqual([{ path: StarWarsApiPath.people, search: { page: '1', search: '' } }])
    })

    it('works when pass params', () => {
      renderHook(() => useCharsList(2, 'test'))

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0]).toStrictEqual(
        [{
          path: StarWarsApiPath.people,
          search: {
            page: '2',
            search: 'test',
          },
        }],
      )
    })
  })
})
