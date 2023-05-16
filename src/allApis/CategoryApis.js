import { serverUrl } from "@config/index";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Get All Category Data
export const getAllCategory = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["useGetAllCategory"],
    queryFn: () =>
      fetch(`${serverUrl}/api/category`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      }),
  });

  return { isLoading, error, data, refetch };
};

// Get parent category

export const getCategory = (id) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["useGetCategory"],
    queryFn: () =>
      fetch(`${serverUrl}/api/category/${id}`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      }),
  });

  return { isLoading, error, data, refetch };
};

// ADD New Category
export const addNewCategory = (data, refetch, setOpenModal) => {
  fetch(`${serverUrl}/api/category`, {
    method: "POST",
    headers: {
      // authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json;",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (!json.error && !json.message) {
        toast.success("Successfully Added ");
        refetch();
        setOpenModal(false);
      } else {
        toast.error(json.message || "Something is wrong!");
      }
    });
};

// Get Delete Category
export const removeCategory = (id, refetch) => {
  fetch(`${serverUrl}/api/category/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res?.status === 200) {
      refetch();
      toast.success("Successfully Deleted ");
    }
  });
};
