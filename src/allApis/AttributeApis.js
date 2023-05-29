import { toast } from 'react-hot-toast'

// ADD New Category
export const addNewAttribute = (
  data,
  refetch,
  setOpenModal,
  reset,
  setSelectedTags
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
        refetch()
        reset()
        setSelectedTags([])
        setOpenModal(false)
      } else {
        toast.error(json.message || 'Something is wrong!')
      }
    })
}
