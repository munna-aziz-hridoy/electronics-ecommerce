import { serverUrl } from "@config/index"
import { useQuery } from '@tanstack/react-query'

// Get All User Data
export const useGetAllUser = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['useGetAllUser'],
    queryFn: () =>
      fetch(`${serverUrl}/api/user`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}
