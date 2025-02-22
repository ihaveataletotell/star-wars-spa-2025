import type { MouseEvent } from 'react'
import type { createBrowserRouter } from 'react-router-dom'

type RouterType = ReturnType<typeof createBrowserRouter>

export const routerConfig: { router: RouterType } = {
  router: null as unknown as RouterType,
}

export function handleLinkClick(e: MouseEvent<HTMLAnchorElement>): void {
  const href = e.currentTarget.getAttribute('href')

  if (href !== null && href.startsWith('/')) {
    e.preventDefault()
    void routerConfig.router.navigate(href)
  }
}
