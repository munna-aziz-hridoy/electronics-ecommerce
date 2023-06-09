import { serverUrl } from '@config/index'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

// Get All Product Data
export const getAllProduct = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['useGetAllProduct'],
    queryFn: () =>
      fetch(`/api/product`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}

export const getSingleProduct = (id) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['useGetAllProduct'],
    queryFn: () =>
      fetch(`/api/product/${id}`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}

// ADD New Product
export const newProductAdd = (data, reset, setExtraData, goBack) => {
  fetch(`/api/product`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${getToken()}`,
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.error && !json.message) {
        toast.success('Successfully Added')
        reset()
        goBack()
        // refetch()
        setExtraData([])
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}
// Edit Product
export const productEdit = (data, reset, setExtraData, id, goBack) => {
   
  fetch(`/api/product/${id}`, {
    method: 'PATCH',
    headers: {
      // authorization: `Bearer ${getToken()}`,
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.error && !json.message) {
        toast.success('Successfully Edited')
        reset()
        goBack()
        // refetch()
        setExtraData([])
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}

//  Delete Product
export const removeProduct = (id, refetch) => {
  fetch(`/api/product/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (res?.status === 200) {
      refetch()
      toast.success('Successfully Deleted ')
    }
  })
}
