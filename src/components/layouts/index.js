import React from 'react'
import { UserLayout, AdminLayout } from '..'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function Layout({ children }) {
  const router = useRouter()
  const pathname = router.pathname
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {pathname.includes('admin') ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </QueryClientProvider>
  )
}

export default Layout
