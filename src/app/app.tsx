import { createTheme, MantineProvider } from '@mantine/core'
import { routerConfig } from 'entities/router'
import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppLayoutUi } from 'widgets/app-layout'

const CharsListPageLazy = lazy(async () => import('pages/chars-list').then(x => ({ default: x.CharsListPage })))
const CharPageLazy = lazy(async () => import('pages/char').then(x => ({ default: x.CharPage })))

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'blue',
})

if (routerConfig.router === null) {
  routerConfig.router = createBrowserRouter([
    {
      path: '/chars',
      element: <AppLayoutUi />,
      children: [
        {
          index: true,
          Component: CharsListPageLazy,
        },
        {
          path: '/chars/:id',
          Component: CharPageLazy,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/chars" />,
    },
  ])
}

export function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={routerConfig.router} />
    </MantineProvider>
  )
}
