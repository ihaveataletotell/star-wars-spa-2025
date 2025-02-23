import type { CharGetResponse } from 'entities/char'
import type { RouterType } from 'entities/router'
import { charCacheService } from 'entities/char-cache'
import { routerConfig } from 'entities/router'
import { describe, expect, it, vi } from 'vitest'
import { CharEditService } from './char.service.ts'

describe('char service test', () => {
  const navigateFn = vi.fn(async () => Promise.resolve())

  routerConfig.router = {
    navigate: navigateFn,
  } as unknown as RouterType

  it('saves correctly', () => {
    const url = 'https://swapi.dev/api/people/1/'
    const char: Pick<CharGetResponse, 'name' | 'edited' | 'url'> = {
      name: 'Luke Skywalker',
      edited: '2014-12-10T13:52:43.172000Z',
      url,
    }

    const service = new CharEditService(char as CharGetResponse)

    expect(navigateFn).toBeCalledTimes(0)
    service.handleSave()
    // @ts-expect-error private method
    expect(charCacheService.readLocalChanges()).toBeNull()
    expect(navigateFn).toBeCalledTimes(1)

    service.form.name.setState({ value: 'Darth Vader' })
    service.handleSave()
    expect(navigateFn).toBeCalledTimes(2)

    // @ts-expect-error private method
    const cache = charCacheService.readLocalChanges()

    if (cache === null) {
      throw new Error('Failed to save char in test')
    }

    expect(cache[url]).toBeDefined()
    expect(cache[url]).toMatchObject({ name: 'Darth Vader', url: char.url })
    expect(cache[url].edited).not.toBe(char.edited)
    expect(+new Date(cache[url].edited)).toBeGreaterThan(+new Date(char.edited))
  })
})
