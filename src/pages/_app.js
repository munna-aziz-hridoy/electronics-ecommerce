import Layout from '@/components/layouts'

import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'



export default function App({ Component, pageProps }) {
  return (
   
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
 
  )
}
