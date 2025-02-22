import type { ChangeEvent } from 'react'
import { Input } from '@mantine/core'
import { charsListService } from 'entities/chars-list'
import { useService } from 'shared/use-service'

export function CharsForm() {
  const { search } = useService(charsListService)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    charsListService.setSearch(e.target.value)
  }

  return (
    <>
      <Input.Wrapper maw="300px" label="Name">
        <Input placeholder="Search Chars" value={search} onChange={handleChange} />
      </Input.Wrapper>
    </>
  )
}
