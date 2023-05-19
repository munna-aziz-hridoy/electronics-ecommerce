import { serverUrl } from "@config/index";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Get All User Data
export const getAllUser = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["useGetAllUser"],
    queryFn: () =>
      fetch(`${serverUrl}/api/user`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  });

  return { isLoading, error, data, refetch };
};

// ADD New User
export const addNewUser = (data, refetch, setOpenModal) => {
  fetch(`${serverUrl}/api/user`, {
    method: "POST",
    headers: {
      // authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.error && !json.message) {
        toast.success("Successfully Added ");
        refetch();
        setOpenModal(false);
      } else {
        toast.error(json.message || "Something is wrong!");
      }
    });
};


//  Delete user
export const removeUser = (id, refetch) => {
  fetch(`${serverUrl}/api/user/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (res?.status === 200) {
      refetch()
      toast.success('Successfully Deleted ')
    }
  })
}