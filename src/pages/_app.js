import { Toaster } from "react-hot-toast";

import Layout from "@/components/layouts";
import CartProvider from "@/context/cart";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </CartProvider>
  );
}
