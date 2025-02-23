import { describe, expect, it, vi } from 'vitest'
import { SubWithCount } from './sub-with-count.ts'

class TestSub extends SubWithCount {
  subscribeImpl() {
    return vi.fn()
  }
}

describe('subWithCount', () => {
  it('should call subscribeImpl on first subscription', () => {
    const instance = new TestSub()
    const spy = vi.spyOn(instance, 'subscribeImpl')

    const unsubscribe = instance.doSubscribe()
    expect(spy).toHaveBeenCalledOnce()

    unsubscribe()
  })

  it('should not call subscribeImpl on multiple subscriptions', () => {
    const instance = new TestSub()
    const spy = vi.spyOn(instance, 'subscribeImpl')

    const unsubscribe1 = instance.doSubscribe()
    const unsubscribe2 = instance.doSubscribe()
    expect(spy).toHaveBeenCalledOnce()

    unsubscribe1()
    unsubscribe2()
  })

  it('should call unsubscribe when last subscriber unsubscribes', () => {
    const instance = new TestSub()
    const unsubscribeMock = vi.fn()
    vi.spyOn(instance, 'subscribeImpl').mockReturnValue(unsubscribeMock)

    const unsubscribe1 = instance.doSubscribe()
    const unsubscribe2 = instance.doSubscribe()
    expect(unsubscribeMock).not.toHaveBeenCalled()

    unsubscribe1()
    expect(unsubscribeMock).not.toHaveBeenCalled()

    unsubscribe2()
    expect(unsubscribeMock).toHaveBeenCalledOnce()
  })
})
