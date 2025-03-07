import type { StoreApi } from 'zustand/vanilla'
import { useLayoutEffect, useSyncExternalStore } from 'react'

export interface Service<State> {
  store: StoreApi<State>
}

export interface Subscribable {
  doSubscribe: () => VoidFunction
}

export function useService<State>(service: Service<State> & Subscribable): State {
  useLayoutEffect(() => {
    return service.doSubscribe()
  }, [service])

  return useZustandStore(service.store)
}

let isUpdatesDisabledInUI = false

export function useZustandStore<State>(store: StoreApi<State>): State {
  return useSyncExternalStore((onChange) => {
    return store.subscribe(() => {
      if (isUpdatesDisabledInUI) {
        return
      }

      onChange()
    })
  }, () => store.getState())
}

export function silentSetState(callback: VoidFunction) {
  isUpdatesDisabledInUI = true
  callback()
  isUpdatesDisabledInUI = false
}
