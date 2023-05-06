import React from 'react'
import { UserLayout, AdminLayout } from '..'
import { useRouter } from 'next/router'

function Layout({ children }) {
  const router = useRouter()
  const pathname = router.pathname

  return pathname !== '/admin' ? (
    <UserLayout>{children}</UserLayout>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  )
}

export default Layout
