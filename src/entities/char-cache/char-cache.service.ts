import type { CharGetResponse } from 'entities/char'
import type { CharsListGetResponse } from 'entities/chars-list/chars-list.types.ts'

interface CacheType {
  [url: string]: CharGetResponse
}

class CharCacheService {
  private cacheKey = 'CHAR_EDIT_LOCAL_CACHE'

  handleSave = (value: CharGetResponse): void => {
    const cache: CacheType = this.readLocalChanges() ?? {}

    cache[value.url] = value
    this.writeLocalChange(cache)
  }

  interceptItemTransportWithLocalChanges = (fetched: CharGetResponse): CharGetResponse => {
    const cache = this.readLocalChanges()
    if (!cache) {
      return fetched
    }

    return this.replaceToLocalChanges(cache, fetched)
  }

  interceptListTransportWithLocalChanges = (fetched: CharsListGetResponse): CharsListGetResponse => {
    const cache = this.readLocalChanges()
    if (!cache) {
      return fetched
    }

    const mapped = fetched.results.map((x) => {
      return this.replaceToLocalChanges(cache, x)
    })

    return {
      ...fetched,
      results: mapped,
    }
  }

  private replaceToLocalChanges = (cache: CacheType, item: CharGetResponse): CharGetResponse => {
    if (cache[item.url] !== undefined) {
      return cache[item.url]
    }
    return item
  }

  private readLocalChanges = (): null | CacheType => {
    const cache = localStorage.getItem(this.cacheKey)

    if (cache === null) {
      return null
    }

    try {
      const parsed = JSON.parse(cache) as unknown
      const isObject = parsed !== null && typeof parsed === 'object'

      if (!isObject) {
        return null
      }

      const isValid = Object.keys(parsed).every((url) => {
        const val = (parsed as CacheType)[url]
        return !!val?.url && !!val.name
      })

      if (!isValid) {
        return null
      }

      return parsed as CacheType
    }
    catch {
      return null
    }
  }

  private writeLocalChange = (value: CacheType | null): void => {
    if (value === null) {
      localStorage.removeItem(this.cacheKey)
      return
    }

    localStorage.setItem(this.cacheKey, JSON.stringify(value))
  }
}

export const charCacheService = new CharCacheService()
