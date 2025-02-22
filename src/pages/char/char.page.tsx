import type { CharGetResponse } from 'entities/char'
import type { JSX } from 'react'
import type { FormItem } from 'shared/store-form'
import type { StoreApi } from 'zustand/vanilla'
import { Alert, Anchor, Box, Breadcrumbs, Button, Card, LoadingOverlay } from '@mantine/core'
import { useGetChar } from 'entities/char'
import { handleLinkClick } from 'entities/router'
import { CharArrField, CharEditService, CharInputField } from 'features/char'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export function CharPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  if (id === undefined) {
    throw new Error('id is required')
  }

  const { data, error, isLoading, refetch } = useGetChar(id)

  if (!data) {
    if (error) {
      return (
        <Alert variant="light" title="Fetch error" color="red">
          {error.json ? <pre>{JSON.stringify(error.json)}</pre> : error.text}
          <Button mt="sm" color="red" variant="outline" display="block" disabled={isLoading} onClick={() => void refetch()}>Retry</Button>
        </Alert>
      )
    }

    return <Box h="100vh" pos="relative"><LoadingOverlay overlayProps={{ bg: 'transparent', blur: 10 }} visible /></Box>
  }

  return <CharPageImpl char={data} id={id} />
}

interface Props {
  char: CharGetResponse
  id: string
}

function CharPageImpl({ char, id }: Props): JSX.Element {
  const service: CharEditService = useMemo(() => {
    return new CharEditService(char)
  }, [char])

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

      <Breadcrumbs separator="→" my="md">
        <Anchor onClick={handleLinkClick} tt="capitalize" fz="sm" c="dark.4" href="/">
          Main
        </Anchor>

        <Anchor onClick={handleLinkClick} tt="capitalize" fz="sm" c="dark.4" href={`/chars/${id}`}>
          Edit Character
          {' '}
          {char.name}
        </Anchor>
      </Breadcrumbs>

      <Box maw="400px" style={{ margin: '0 auto' }}>
        <Card my="md" mah="70vh" style={{ overflow: 'auto' }}>
          {fieldsJsx}
        </Card>

        <Card my="md">
          <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Button variant="outline" onClick={service.handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={service.handleSave}>Save</Button>
          </Box>
        </Card>
      </Box>
    </>
  )
}

function isArrayValStore(store: StoreApi<FormItem<unknown>>): store is StoreApi<FormItem<Array<string>>> {
  return Array.isArray(store.getState().value)
}

function isStringValStore(store: StoreApi<FormItem<unknown>>): store is StoreApi<FormItem<string>> {
  return typeof store.getState().value === 'string'
}
