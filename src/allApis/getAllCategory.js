import { serverUrl } from '@config/index'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

// Get All Category Data
export const useGetAllCategory = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['useGetAllCategory'],
    queryFn: () =>
      fetch(`${serverUrl}/api/category`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}

// Get All Category Data
export const useRemoveCategory = ({ id }) => {
  fetch(`${serverUrl}/api/category/${id}`, {
    method: 'DELETE',
  })
}

// ADD New Category
export const addNewCategory = (data, refetch, setOpenModal) => {
  fetch(`${serverUrl}/api/category`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${getToken()}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...data,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (!json.error && !json.message) {
        toast.success('Successfully Added ')
        refetch()
        setOpenModal(false)
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}
