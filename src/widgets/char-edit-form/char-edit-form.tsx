import type { CharEditService } from 'features/char'
import type { JSX } from 'react'
import type { FormItem } from 'shared/store-form'
import type { StoreApi } from 'zustand/vanilla'
import { Box, Button, Card } from '@mantine/core'
import { CharArrField, CharInputField } from 'features/char'
import { useMemo } from 'react'

interface Props {
  service: CharEditService
}

export function CharEditForm({ service }: Props): JSX.Element {
  const fields = useMemo(() => service.getFields(), [service])

  const fieldsJsx = fields.map((x): JSX.Element | null => {
    const store: StoreApi<FormItem<unknown>> = service.form[x]
    const isReadonly = service.readonlyFields.has(x)

    if (isArrayValStore(store)) {
      return <CharArrField key={x} formKey={x} valueStore={store} readOnly={isReadonly} />
    }

    if (isStringValStore(store)) {
      return (
        <CharInputField key={x} formKey={x} valueStore={store} readOnly={isReadonly} />
      )
    }

    return null
  })

  return (
    <>
      <Card shadow="md" my="md" mah="70vh" style={{ overflow: 'auto' }}>
        {fieldsJsx}
      </Card>

      <Card shadow="md" my="md">
        <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button type="button" variant="outline" onClick={service.handleCancel}>Cancel</Button>
          <Button type="submit" variant="primary" onClick={service.handleSave}>Save</Button>
        </Box>
      </Card>
    </>
  )
}

function isArrayValStore(store: StoreApi<FormItem<unknown>>): store is StoreApi<FormItem<Array<string>>> {
  return Array.isArray(store.getState().value)
}

function isStringValStore(store: StoreApi<FormItem<unknown>>): store is StoreApi<FormItem<string>> {
  return typeof store.getState().value === 'string'
}
