import { Toaster } from "react-hot-toast";

import Layout from "@/components/layouts";
import CartProvider from "@/context/cart";

import "@/styles/globals.css";
import ProductProvider from "@/context/product";

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </CartProvider>
    </ProductProvider>
  );
}
