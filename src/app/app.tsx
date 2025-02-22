import { createTheme, MantineProvider } from '@mantine/core'
import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayoutUi } from 'widgets/app-layout'

const CharsListPageLazy = lazy(async () => import('pages/chars-list').then(x => ({ default: x.CharsListPage })))

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'blue',
})

export function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/chars" element={<AppLayoutUi />}>
            <Route index Component={CharsListPageLazy} />
            <Route path="/chars/:id" element={<div>TODO Char Page</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/chars" />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
