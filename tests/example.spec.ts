import { expect, test } from '@playwright/test'

const url = 'http://localhost:5174'

test('main flow works', async ({ page }) => {
  await page.goto(url)

  const inputLocator = page.getByPlaceholder('Search Chars')
  const chewName = 'Chewbacca'
  await inputLocator.fill(chewName)

  const chewLocator = page.locator('tbody tr:first-child td', { hasText: 'Chewbacca' })
  await chewLocator.waitFor({ state: 'visible', timeout: 10_000 })

  const editedColLocator = page.locator('tbody tr:first-child td:last-child')
  const editedDate = await editedColLocator.textContent() ?? ''
  expect(new Date(editedDate).toString()).not.toBe('Invalid Date')

  await chewLocator.click()
  await page.waitForURL(`${url}/chars/*`)

  const newMass = String(100 + Math.round(Math.random() * 100))
  const massLocator = page.locator('[data-label="mass"]')
  await massLocator.fill(newMass)
  await page.locator('button[type="submit"]').click()
  await page.waitForURL(`${url}/chars`)

  expect(await inputLocator.inputValue()).toBe(chewName)
  await chewLocator.waitFor({ state: 'visible', timeout: 10_000 })

  const tableLocator = page.locator('table')
  // wait for refetch if table was init in stale state
  await expect(tableLocator).not.toHaveAttribute('data-fetching', { timeout: 10_000 })
  await expect(editedColLocator).not.toHaveText(editedDate, { timeout: 10_000 })

  const newEditedDate = await editedColLocator.textContent() ?? ''
  expect(+new Date(newEditedDate)).toBeGreaterThan(+new Date(editedDate))

  await chewLocator.click()
  await page.waitForURL(`${url}/chars/*`)
  expect(await massLocator.inputValue()).toBe(newMass)
})
