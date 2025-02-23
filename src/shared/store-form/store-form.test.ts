import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StoreForm } from './store-form.ts'

interface Fields { field1: string, field2: string }

class TestClass extends StoreForm<Fields> {
  constructor(fields: Fields) {
    super(fields)
  }

  protected subscribeImpl(): VoidFunction {
    return () => void 0
  }
}

describe('storeForm', () => {
  let form: TestClass
  let fields: Fields

  beforeEach(() => {
    fields = { field1: 'value1', field2: 'value2' }
    form = new TestClass(fields)
  })

  it('should initialize form fields correctly', () => {
    expect(form.getValue()).toEqual(fields)
  })

  it('should reset form fields to initial values', () => {
    form.form.field1.setState({ value: 'newValue', error: 'some error' })
    form.reset()
    expect(form.getValue()).toEqual(fields)
  })

  it('should return correct field keys', () => {
    expect(form.getFields()).toEqual(Object.keys(fields))
  })

  it('should trigger only one store update if field changed', () => {
    const updateSpy: Mock = vi.fn()
    form.form.field1.subscribe(updateSpy)
    form.form.field2.subscribe(updateSpy)
    form.form.field1.setState({ value: 'newValue' })
    expect(updateSpy).toHaveBeenCalledTimes(1)
  })
})
