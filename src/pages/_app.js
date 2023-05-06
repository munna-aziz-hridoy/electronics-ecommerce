import Layout from '@/components/layouts'
import { QueryClient, QueryClientProvider } from 'react-query'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  )
}
