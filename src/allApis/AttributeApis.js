import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

// Get All Attribute Data
export const getAllAttribute = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['getAllAttribute'],
    queryFn: () =>
      fetch(`/api/attributes`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  })

  return { isLoading, error, data, refetch }
}

// ADD New Attribute
export const addNewAttribute = (
  setSelectedTags,
  setOpenModal,
  refetch,
  reset,
  data
) => {
  fetch(`/api/attributes`, {
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
        toast.success('Successfully Added ')
        setSelectedTags([])
        setOpenModal(false)
        refetch()
        reset()
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}
