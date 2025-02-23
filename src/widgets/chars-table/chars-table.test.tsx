/* eslint-disable perfectionist/sort-imports */
import '@mantine/core/styles.layer.css'
import 'mantine-datatable/styles.css'
import 'mantine-datatable/styles.layer.css'
import type { CharGetResponse } from 'entities/char'
import type { CharsListGetResponse } from 'entities/chars-list'
import type { Mock } from 'vitest'
import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useCharsList } from 'entities/chars-list'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CharsTable } from './chars.table'

vi.mock('entities/chars-list', () => ({
  useCharsList: vi.fn(),
}))

describe('charsTable', () => {
  let mockOnRowClick: Mock
  let mockData: CharsListGetResponse

  beforeEach(() => {
    mockOnRowClick = vi.fn()
    mockData = {
      results: [
        { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker', gender: 'Male', created: '2023-01-01T12:00:00Z', edited: '2023-01-02T12:00:00Z' } as CharGetResponse,
      ],
      count: 1,
      next: null,
      previous: null,
    };

    (useCharsList as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    })
  })

  it('should render correct columns', () => {
    render(<CharsTable />, { wrapper: MantineProvider })
    expect(screen.getByText('id')).not.toBeNull()
    expect(screen.getByText('Name')).not.toBeNull()
    expect(screen.getByText('Gender')).not.toBeNull()
    expect(screen.getByText('Created')).not.toBeNull()
    expect(screen.getByText('Edited')).not.toBeNull()
  })

  it('should call onRowClick when a row is clicked', async () => {
    render(<CharsTable onRowClick={mockOnRowClick} />, { wrapper: MantineProvider })

    const row = screen.getByText('Luke Skywalker').closest('tr')
    if (row === null) {
      throw new Error('row not found')
    }

    fireEvent.click(row)

    await waitFor(() => {
      expect(mockOnRowClick).toHaveBeenCalledWith(mockData.results[0])
    })
  })
})
