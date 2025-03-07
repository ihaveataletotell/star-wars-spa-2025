import type { CharGetResponse } from 'entities/char'
import type { DataTableColumn, DataTableRowClickHandler } from 'mantine-datatable'
import { Alert, Button, useMantineTheme } from '@mantine/core'
import { useCharsList } from 'entities/chars-list'
import { charsListService } from 'features/chars-list'
import { DataTable } from 'mantine-datatable'
import { useMemo } from 'react'
import { useService } from 'shared/use-service'

interface Props {
  onRowClick?: (row: CharGetResponse) => void
}

export function CharsTable({ onRowClick }: Props) {
  const { colors } = useMantineTheme()
  const tableConfig: Array<DataTableColumn<CharGetResponse>> = useMemo(() => {
    return [
      { accessor: 'url', title: 'id', width: '50px', sortKey: 'url', render: x => x.url.split('/').at(-2) },
      { accessor: 'name', width: '100px', sortKey: 'name' },
      { accessor: 'gender', width: '50px' },
      { accessor: 'created', width: '150px', render: x => !x.created ? '' : new Date(x.created).toLocaleString() },
      { accessor: 'edited', width: '150px', render: x => !x.edited ? '' : new Date(x.edited).toLocaleString() },
    ]
  }, [])

  const { page, search, query, sortStatus } = useService(charsListService)
  const { data, isLoading, isFetching, error, refetch } = useCharsList(page, query)

  const isFaded = search !== query || isFetching

  if (!data) {
    if (error) {
      return (
        <Alert variant="light" title="Fetch error" color="red">
          {error.json ? <pre>{JSON.stringify(error.json)}</pre> : error.text}
          <Button mt="sm" color="red" variant="outline" display="block" disabled={isLoading} onClick={() => void refetch()}>Retry</Button>
        </Alert>
      )
    }
  }

  const handleRowClick: DataTableRowClickHandler<CharGetResponse> = (params): void => {
    onRowClick?.(params.record)
  }

  return (
    <DataTable<CharGetResponse>
      // style
      withTableBorder
      borderRadius="md"
      borderColor={colors.blue['2']}
      rowStyle={(_, idx) => ({ backgroundColor: idx % 2 ? colors.blue['0'] : colors.blue['1'] })}
      minHeight="30vh"
      opacity={isFaded ? 0.6 : 1}
      data-fetching={isFaded ? true : void 0}
      // records & state
      fetching={isLoading}
      columns={tableConfig}
      records={data?.results}
      idAccessor="url"
      // sort
      sortStatus={sortStatus}
      onSortStatusChange={charsListService.setSortStatus}
      // pagination
      paginationWithControls
      page={page}
      onPageChange={charsListService.setPage}
      recordsPerPage={10}
      totalRecords={data?.count}
      // actions
      onRowClick={handleRowClick}
    />
  )
}
