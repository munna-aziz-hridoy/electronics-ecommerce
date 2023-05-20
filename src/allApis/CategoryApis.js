import { serverUrl } from "@config/index";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Get All Category Data
export const getAllCategory = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAllCategory"],
    queryFn: () =>
      fetch(`/api/category`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  });

  return { isLoading, error, data, refetch };
};

// get all subcategory

export const getAllSubCategory = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAllSubCategory"],
    queryFn: () =>
      fetch(`/api/category/subcategories`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  });

  return { isLoading, error, data, refetch };
};

// Get parent category
export const getParentCategory = () => {
  console.log(serverUrl);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getParentCategory"],
    queryFn: () =>
      fetch(`/api/category/null`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => {
        return res.json();
      }),
  });

  return { isLoading, error, data, refetch };
};

// Get parent category
export const getCategory = (id) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getCategory"],
    queryFn: () =>
      fetch(`/api/category/${id}`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  });

  return { isLoading, error, data, refetch };
};

// ADD New Category
export const addNewCategory = (data, refetch, setOpenModal, parentRefetch) => {
  fetch(`/api/category`, {
    method: "POST",
    headers: {
      // authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json;",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (!json.error && !json.message) {
        toast.success("Successfully Added ");
        refetch();
        parentRefetch();
        setOpenModal(false);
      } else {
        toast.error(json.message || "Something is wrong!");
      }
    });
};

// Get Delete Category
export const removeCategory = (id, refetch, parentRefetch) => {
  fetch(`/api/category/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res?.status === 200) {
      refetch();
      parentRefetch();
      toast.success("Successfully Deleted ");
    }
  });
};
