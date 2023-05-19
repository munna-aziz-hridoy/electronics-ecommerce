import { serverUrl } from "@config/index";
import toast from "react-hot-toast";

export const placeOrder = (data) => {
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
        return data;
      } else {
        toast.error("Order place failed");
      }
    });
};
