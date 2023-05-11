import { serverUrl } from '@config/index'
import { useQuery } from '@tanstack/react-query'

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
