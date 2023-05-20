import { serverUrl } from "@config/index";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export const placeOrder = (
  data,
  push = null,
  setAddress = null,
  setCity = null,
  setCountry = null,
  setPostCode = null,
  setState = null,
  setStreet = null,
  clearCart = null
) => {
  const url = `${serverUrl}/api/user/order`;

  fetch(url, {
    method: "POST",
    headers: {
      //   authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else return toast.error("Order place failed");
    })
    .then((data) => {
      if (data?.id) {
        toast.success("Order placed");
        push("/order-complete");
        setAddress("");
        setCity("");
        setCountry("");
        setPostCode("");
        setState("");
        setStreet("");
        clearCart();
      } else {
        toast.error("Order place failed");
        return;
      }
    });
};

export const getUserOrders = (id) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: () =>
      fetch(`${serverUrl}/api/user/order?user_id=${id}`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => {
        return res.json();
      }),
  });

  return { isLoading, error, data, refetch };
};

export const getAllOrders = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: () =>
      fetch(`${serverUrl}/api/user/admin/order`, {
        // headers: {
        //   authorization: `Bearer ${getToken()}`,
        // },
      }).then((res) => {
        return res.json();
      }),
  });

  return { isLoading, error, data, refetch };
};
