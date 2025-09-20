'use client'

import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function QueryProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={queryClient}>{children}</Provider>
}
export default QueryProvider
