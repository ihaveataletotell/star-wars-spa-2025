import type { FormItem, FormStoreStructure } from './store-form.types.ts'
import { SubWithCount } from 'shared/sub-with-count'
import { createStore } from 'zustand/vanilla'

export abstract class StoreForm<Fields> extends SubWithCount {
  readonly form: FormStoreStructure<Fields>

  constructor(protected fields: Fields) {
    super()
    this.form = this.createForm(fields)
  }

  protected createForm(fields: Fields): FormStoreStructure<Fields> {
    this.fields = fields

    const result: Partial<FormStoreStructure<Fields>> = Object
      .keys(fields as Record<string, string>)
      .reduce<Partial<FormStoreStructure<Fields>>>((acc, key) => {
        const asserted = key as keyof Fields

        acc[asserted] = createStore<FormItem<Fields[typeof asserted]>>(() => ({
          value: fields[asserted],
          error: null,
          changed: false,
        }))
        return acc
      }, {})

    return result as FormStoreStructure<Fields>
  }

  getValue = (): Fields => {
    const { form } = this

    const result: Partial<Fields> = Object.keys(form).reduce<Partial<Fields>>((acc, key) => {
      const asserted = key as keyof Fields

      acc[asserted] = form[asserted].getState().value
      return acc
    }, {})

    return result as Fields
  }

  reset = (): void => {
    const { form, fields } = this

    Object.keys(form).forEach((key) => {
      const asserted = key as keyof Fields

      form[asserted].setState({
        value: fields[asserted],
        error: null,
      })
    })
  }

  getFields = (): Array<keyof Fields> => {
    return Object.keys(this.form) as Array<keyof Fields>
  }
}
