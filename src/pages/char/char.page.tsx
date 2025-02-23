import type { CharGetResponse } from 'entities/char'
import type { JSX } from 'react'
import { Alert, Anchor, Box, Breadcrumbs, Button, LoadingOverlay } from '@mantine/core'
import { useGetChar } from 'entities/char'
import { handleLinkClick } from 'entities/router'
import { CharEditService } from 'features/char'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CharEditForm } from 'widgets/char-edit-form'

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
        <CharEditForm service={service} />
      </Box>
    </>
  )
}
