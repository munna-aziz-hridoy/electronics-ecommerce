import React, { useContext, useEffect, useState } from "react";
import { footerData } from "@/assets/data/footer";
import { AddressForm, CardForm, Container } from "@/components";
import { FaCartArrowDown, FaStore, FaTruck } from "react-icons/fa";

import { CartContext } from "@/context/cart";
import { placeOrder } from "@/allApis/order";
import { useRouter } from "next/router";
import useAuthStore from "@/store/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51L1uNJFwLOKoh01CCS9qXRUMMyLfpPSmGNGCuytfehODVTvoNROZNGCcoGWHcJg9rJEHy2Zz3EWrJoWIUvSNnAAz00ggzNgcNs"
);

const Checkout = () => {
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [pickingMethod, setPickingMethod] = useState("delivery");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const [error, setError] = useState(true);

  const { push } = useRouter();

  const { user } = useAuthStore();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const { cart, clearCart } = useContext(CartContext);

  const handlePlaseOrder = () => {
    if (!state || !street || !postCode || !city || !country || !address)
      return setError(true);

    const { items, ...rest } = cart;

    const products = items?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        images: item?.images,
        quantity: item?.quantity,
        price: item?.price,
      };
    });

    const data = {
      ...rest,
      items: products,
      shipping_address: {
        street,
        postCode,
        state,
        city,
        country,
        address,
      },
      user: user?.id,
      payment_method: "cod",
      paid: false,
      payment_id: null,
    };

    placeOrder(
      data,
      push,
      setAddress,
      setCity,
      setCountry,
      setPostCode,
      setState,
      setStreet,
      clearCart
    );
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between gap-10 my-5 md:my-12 p-2 ">
        <div className="w-full md:w-[65%]">
          <h2 className="text-2xl font-semibold text-gray-700 capitalize">
            1. Delivery Method
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-3" />
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => setPickingMethod("collection")}
              className={`flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4 shadow ${
                pickingMethod === "collection" ? "bg-[#b8d94b]" : "bg-white"
              }`}
            >
              <FaStore />
              Collection
            </button>
            <button
              onClick={() => setPickingMethod("delivery")}
              className={`flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4 shadow ${
                pickingMethod === "delivery" ? "bg-[#b8d94b]" : "bg-white"
              }`}
            >
              <FaTruck />
              Delivery
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 capitalize mt-10">
            2. <span className="capitalize">{pickingMethod}</span> Address
          </h2>
          <div className="w-full h-[1px] bg-gray-300 my-3" />

          {pickingMethod === "delivery" && (
            <AddressForm
              setAddress={setAddress}
              setCity={setCity}
              setCountry={setCountry}
              setPostCode={setPostCode}
              setState={setState}
              setStreet={setStreet}
              address={address}
              city={city}
              country={country}
              postCode={postCode}
              state={state}
              street={street}
              error={error}
            />
          )}

          {pickingMethod === "collection" && (
            <div>
              <p className="font-medium text-gray-600">
                Address: 14 Arundel Close, Tonbridge TN9 2UG, UK
              </p>
              <p className="font-medium text-gray-600">
                Phone Number: +44 07403746033
              </p>
              <p className="font-medium text-gray-600">
                Email address: contact@etcetera21.com
              </p>
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-700 capitalize mt-10">
            3. Payment Method
          </h2>

          <form className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="card"
                name="radioGroup"
                value="card"
                defaultChecked
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                }}
              />
              <label>Card</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="paypal"
                name="radioGroup"
                value="paypal"
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                }}
              />
              <label>Paypal</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cod"
                name="radioGroup"
                value="cod"
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                }}
              />
              <label>Cash On delivery</label>
            </div>
          </form>

          <div className="w-full h-[1px] bg-gray-300 my-3" />

          <Elements stripe={stripePromise}>
            {selectedPaymentMethod === "card" && (
              <CardForm
                shippingAddress={{
                  street,
                  postCode,
                  state,
                  city,
                  country,
                  address,
                }}
                setError={setError}
              />
            )}
          </Elements>

          {selectedPaymentMethod === "cod" && (
            <button
              onClick={handlePlaseOrder}
              className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-16"
            >
              Place Order
            </button>
          )}

          <div className="flex  items-center gap-5 my-5">
            {footerData.payment_options.map((item, i) => (
              <img
                key={i}
                src={item.icon.src}
                width={40}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-[35%]">
          <div className="border-2 border-gray-200 rounded shadow p-4">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-3 text-gray-800 font-semibold capitalize">
                <FaCartArrowDown fontSize={20} />
                {cart?.total_products || 0} Items
              </p>
              <p className="text-gray-800 font-semibold capitalize">
                ${cart?.total_price || 0}
              </p>
            </div>
            <div className="w-full h-[1px] bg-gray-300 my-3" />

            {cart?.items?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between items-center my-8 border-b pb-4"
                >
                  <div className="flex gap-3">
                    <img src={item?.image} className="w-16 h-16" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        {item?.name?.length > 30
                          ? item?.name?.slice(0, 30) + "..."
                          : item?.name}
                      </h2>
                      <p className="text-sm font-light text-gray-600 capitalizes w-2/3">
                        {item?.description?.slice(0, 20)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <p className=" text-gray-500 text-sm font-light">
                          Qty: {item?.quantity}
                        </p>
                        <p className="text-green-600 text-lg font-semibold capitalize">
                          Price: ${item?.quantity * item?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-medium text-lg">Order Value</p>
                <p className="text-gray-600 text-medium text-lg">
                  ${cart?.total_price || 0}
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <p className="text-gray-800 font-bold text-2xl">Total pay</p>
                <p className="text-gray-800 font-bold text-2xl">
                  ${cart?.total_price || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
