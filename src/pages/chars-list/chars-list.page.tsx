import type { JSX } from 'react'
import { Anchor, Breadcrumbs, Card } from '@mantine/core'
import { CharsForm } from './chars.form.tsx'
import { CharsTable } from './chars.table.tsx'

export function CharsListPage(): JSX.Element | null {
  return (
    <>
      <Breadcrumbs separator="→" my="md">
        <Anchor tt="capitalize" fz="sm" c="dark.4" href="/">
          Main
        </Anchor>

        <Anchor tt="capitalize" fz="sm" c="dark.4" href="/chars">
          Characters
        </Anchor>
      </Breadcrumbs>

      <Card my="md">
        <CharsForm />
      </Card>

      <Card my="md">
        <CharsTable />
      </Card>
    </>
  )
}
