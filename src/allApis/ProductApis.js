import { serverUrl } from "@config/index"
import { useQuery } from '@tanstack/react-query'
import { toast } from "react-hot-toast"

// Get All Product Data
export const useGetAllProduct = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['useGetAllProduct'],
    queryFn: () =>
      fetch(`${serverUrl}/api/product`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}

// ADD New Product
export const newProductAdd = (data) => {
  fetch(`${serverUrl}/api/product`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${getToken()}`,
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (!json.error && !json.message) {
        toast.success('Successfully Added ')
        // refetch()
      
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}

