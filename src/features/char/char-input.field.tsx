import type { ChangeEvent, JSX } from 'react'
import type { FormControlProps } from 'shared/store-form'
import { Input, InputWrapper } from '@mantine/core'
import { useStore } from 'zustand/react'

interface Props<Val extends string> extends FormControlProps<Val> {}

export function CharInputField<Val extends string>({ formKey, label, placeholder, valueStore, readOnly }: Props<Val>): JSX.Element {
  const { value } = useStore(valueStore)
  const finalLabel = label !== undefined ? label : formKey

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      return
    }
    valueStore.setState({ value: e.target.value as Val })
  }

  return (
    <InputWrapper mb="xs" maw="300px" label={finalLabel}>
      <Input disabled={readOnly} placeholder={placeholder} value={value} onChange={handleChange} />
    </InputWrapper>
  )
}
