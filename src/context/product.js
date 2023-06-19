import { createContext, useEffect, useState } from 'react'


export const ProductContext = createContext('')

const ProductProvider = ({ children }) => {

     const [extraData, setExtraData] = useState([])
     const [editExtraData, setEditExtraData] = useState([])
     const [editExtraDataImage, setEditExtraDataImage] = useState([])




      return (
        <ProductContext.Provider
          value={{
            extraData,
            setExtraData,
            editExtraData,
            setEditExtraData,
            editExtraDataImage,
            setEditExtraDataImage,
          }}
        >
          {children}
        </ProductContext.Provider>
      )
 }

export default ProductProvider