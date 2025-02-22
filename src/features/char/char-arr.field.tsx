import type { JSX } from 'react'
import type { FormControlProps } from 'shared/store-form'
import { TagsInput } from '@mantine/core'
import { useStore } from 'zustand/react'

interface Props<Val extends string> extends FormControlProps<Array<Val>> {}

export function CharArrField<Val extends string>({ valueStore, label, formKey, placeholder, readOnly }: Props<Val>): JSX.Element {
  const { value } = useStore(valueStore)
  const finalLabel = label !== undefined ? label : formKey

  const handleChange = (value: Array<string>) => {
    if (readOnly) {
      return
    }
    valueStore.setState({ value: value as Array<Val> })
  }

  return (
    <TagsInput disabled={readOnly} value={value} mb="xs" maw="300px" label={finalLabel} placeholder={placeholder} onChange={handleChange} />
  )
}
