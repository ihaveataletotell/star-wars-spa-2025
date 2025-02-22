import type { JSX } from 'react'
import { Anchor, Breadcrumbs, Card } from '@mantine/core'
import { getRequestIdFromUrl } from 'entities/char/char.requests.ts'
import { handleLinkClick, routerConfig } from 'entities/router'
import { CharsForm } from 'widgets/chars-form'
import { CharsTable } from 'widgets/chars-table'

export function CharsListPage(): JSX.Element | null {
  const handleRowClick = (row: { url: string }) => {
    const id = getRequestIdFromUrl(row.url)
    if (id === null) {
      return
    }

    void routerConfig.router.navigate(`/chars/${id}`)
  }

  return (
    <>
      <Breadcrumbs separator="→" my="md">
        <Anchor onClick={handleLinkClick} tt="capitalize" fz="sm" c="dark.4" href="/">
          Main
        </Anchor>

        <Anchor onClick={handleLinkClick} tt="capitalize" fz="sm" c="dark.4" href="/chars">
          Characters
        </Anchor>
      </Breadcrumbs>

      <Card my="md">
        <CharsForm />
      </Card>

      <Card my="md">
        <CharsTable onRowClick={handleRowClick} />
      </Card>
    </>
  )
}
