import { vi } from 'vitest'

import '@testing-library/dom'

// eslint-disable-next-line ts/unbound-method
const { getComputedStyle } = window
window.getComputedStyle = elt => getComputedStyle(elt)
window.HTMLElement.prototype.scrollIntoView = () => {}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: true,
    // eslint-disable-next-line ts/no-unsafe-assignment
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockLocalStorage = (() => {
  let store = {} as Storage

  return {
    getItem(key: string) {
      // eslint-disable-next-line ts/no-unsafe-return
      return store[key]
    },

    setItem(key: string, value: string) {
      store[key] = value
    },

    removeItem(key: string) {
      delete store[key]
    },

    clear() {
      store = {} as Storage
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

window.ResizeObserver = ResizeObserver
