import type { CharGetResponse } from 'entities/char'
import type { DataTableSortStatus } from 'mantine-datatable'
import type { StoreApi } from 'zustand/vanilla'
import _ from 'lodash'
import { SubWithCount } from 'shared/sub-with-count'
import { createStore } from 'zustand/vanilla'

interface Store {
  page: number
  search: string
  query: string
  sortStatus: DataTableSortStatus<CharGetResponse>
}

class CharsListService extends SubWithCount {
  readonly store: StoreApi<Store>

  constructor() {
    super()

    this.store = createStore<Store>(() => this.initialState)
  }

  get initialState(): Store {
    return {
      page: 1,
      search: '',
      query: '',
      sortStatus: { columnAccessor: 'url', direction: 'asc' },
    }
  }

  get search(): string {
    return this.store.getState().search
  }

  protected override subscribeImpl() {
    const DEBOUNCE_DELAY = 1000
    const debouncedFn = _.debounce(this.setQuery, DEBOUNCE_DELAY)

    const unsub = this.store.subscribe((nSt, pSt) => {
      if (nSt.search !== pSt.search) {
        debouncedFn(nSt.search)
      }
    })

    return () => {
      unsub()
      debouncedFn.cancel()
      this.store.setState({ query: this.search })
    }
  }

  setPage = (page: number): void => {
    this.store.setState({ page })
  }

  // sorting currently not supported in API
  setSortStatus = (sortStatus: DataTableSortStatus<CharGetResponse>): void => {
    this.store.setState({ sortStatus })
  }

  setSearch = (search: string): void => {
    this.store.setState({ search })
  }

  private setQuery = (query: string): void => {
    this.store.setState({ query, page: 1 })
  }
}

export const charsListService = new CharsListService()
