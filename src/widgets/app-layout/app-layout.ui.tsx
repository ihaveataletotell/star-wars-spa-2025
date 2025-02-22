import { AppShell, Text } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function AppLayoutUi() {
  return (
    <AppShell
      header={{ height: 60 }}
      p="md"
      mah="100dvh"
    >
      <AppShell.Header p="md">
        <Text variant="h1" fw="bold">Star Wars Backoffice</Text>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  )
}
