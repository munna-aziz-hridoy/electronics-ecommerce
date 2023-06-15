import { createContext, useEffect, useState } from 'react'


export const ProductContext = createContext('')

const ProductProvider = ({ children }) => {

     const [extraData, setExtraData] = useState([])




      return (
        <ProductContext.Provider
          value={{
            extraData,
            setExtraData,
            // cart,
            // addToCart,
            // removeFromCart,
            // clearCart,
            // increaseQuantity,
            // decreaseQuantity,
          }}
        >
          {children}
        </ProductContext.Provider>
      )
 }

export default ProductProvider