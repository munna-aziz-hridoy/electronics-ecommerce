import { changeDeliveryStatus, changePaymentStatus } from "@/allApis/order";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const OrderTR = ({ order, refetch }) => {
  const { id, total_price, total_products, delivery, paid, created_at } = order;

  const [openEditBox, setOpenEditBox] = useState(false);

  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const handleDelete = () => {
    const del = window.confirm("Do you want to delete?");
    if (del) {
      // removeUser(id, refetch);
    }
  };

  useEffect(() => {
    setDeliveryStatus(delivery);
  }, [delivery]);

  useEffect(() => {
    setPaymentStatus(paid);
  }, [paid]);

  const handleChangeDeliveryStatus = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setDeliveryStatus(true);
      changeDeliveryStatus(id).then((data) => {
        if (data?._id) {
          toast.success("Change delivery status success");
          refetch();
        } else {
          toast.error("Change delivery status failed");
        }
      });
    }
  };

  const handleChangePaymentStatus = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setPaymentStatus(true);
      changePaymentStatus(id).then((data) => {
        if (data?._id) {
          toast.success("Change delivery status success");
          refetch();
        } else {
          toast.error("Change delivery status failed");
        }
      });
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-2  font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className="px-6 py-2">{created_at?.split("T")[0]}</td>
      <td className="px-6 text-center py-2">${total_price}</td>
      <td className="px-6 text-center py-2">{total_products}</td>
      <td className="px-6 text-center py-2">
        {delivery ? "Delivered" : "In progress"}
      </td>
      <td className="px-6 text-center py-2">{paid ? "Paid" : "Unpaid"}</td>
      <td className="px-6 py-2">
        <div className="flex justify-end items-center gap-7 pr-4 text-2xl ">
          <div className="relative ">
            <button
              onClick={() => setOpenEditBox((prev) => !prev)}
              className="duration-300 rounded-md p-1 hover:bg-green-600 hover:text-gray-50 "
            >
              <BiEdit />
            </button>
            {openEditBox && (
              <div className="absolute top-4 right-0 w-[200px] h-[80px] border border-gray-200 bg-white rounded-md shadow-md my-3 p-4 z-50">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    defaultChecked={delivery}
                    checked={deliveryStatus}
                    onChange={handleChangeDeliveryStatus}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Delivered
                  </span>
                </label>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    defaultChecked={paid}
                    checked={paymentStatus}
                    onChange={handleChangePaymentStatus}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Paid
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* <button
            onClick={handleDelete}
            className="duration-300 rounded-md p-1 hover:bg-red-600 hover:text-gray-50 "
          >
            <MdDelete />
          </button> */}
        </div>
      </td>
    </tr>
  );
};

export default OrderTR;
