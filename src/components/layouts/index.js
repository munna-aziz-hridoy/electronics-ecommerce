import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserLayout, AdminLayout } from "..";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {pathname.includes("admin") ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </QueryClientProvider>
  );
}

export default Layout;
