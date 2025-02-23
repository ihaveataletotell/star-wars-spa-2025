import type { Mock } from 'vitest'
import type { StoreApi } from 'zustand/vanilla'
import type { Service, Subscribable } from './use-service.ts'
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createStore } from 'zustand/vanilla'
import { silentSetState, useService } from './use-service.ts'

// Mock store implementation
function createMockStore<Val>(initialState: Val): StoreApi<Val> {
  const store = createStore(() => initialState)
  return store
}

describe('useService', () => {
  let store
  let service: Service<{ value: number }> & Subscribable
  let subscribeMock: Mock

  beforeEach(() => {
    store = createMockStore({ value: 0 })
    subscribeMock = vi.fn(() => () => {})
    service = { store, doSubscribe: subscribeMock }
  })

  it('should return the initial state', () => {
    const { result } = renderHook(() => useService(service))
    expect(result.current).toEqual({ value: 0 })
  })

  it('should subscribe on mount', () => {
    renderHook(() => useService(service))
    expect(subscribeMock).toHaveBeenCalled()
  })

  describe('silentSetState', () => {
    it('should disable UI updates during state changes', () => {
      const callback = vi.fn()
      silentSetState(callback)
      expect(callback).toHaveBeenCalled()
    })
  })
})
