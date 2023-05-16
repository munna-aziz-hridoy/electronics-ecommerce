import { serverUrl } from "@config/index";
import { useQuery } from "@tanstack/react-query";

// Get All Product Data
export const getAllProduct = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["useGetAllProduct"],
    queryFn: () =>
      fetch(`${serverUrl}/api/product`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => res.json()),
  });

  return { isLoading, error, data, refetch };
};
