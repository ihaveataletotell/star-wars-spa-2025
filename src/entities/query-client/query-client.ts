import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 120_000,
      retry: 1,
      staleTime: 0,
      gcTime: 120_000,
    },
  },
})
