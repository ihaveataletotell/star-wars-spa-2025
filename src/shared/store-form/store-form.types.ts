import type { StoreApi } from 'zustand/vanilla'

export interface FormItem<Val> {
  value: Val
  error: null | string
}

export interface FormControlProps<Val> {
  valueStore: StoreApi<FormItem<Val>>
  formKey: string
  label?: string
  placeholder?: string
  readOnly?: boolean
}

export type FormStoreStructure<Fields> = {
  [K in keyof Fields]: StoreApi<FormItem<Fields[K]>>
}
