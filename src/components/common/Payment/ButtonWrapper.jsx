import { useContext, useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import useAuthStore from "@/store/auth";
import { CartContext } from "@/context/cart";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

// This values are the props in the UI

const style = { layout: "vertical" };

const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  shippingAddress,
  setError,
  pickingMethod,
  setAddress,
  setCity,
  setCountry,
  setPostCode,
  setState,
  setStreet,
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const { user } = useAuthStore();
  const { cart, clearCart } = useContext(CartContext);

  const { push } = useRouter();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const handlePlaseOrder = (orderId) => {
    const { street, postCode, state, city, country, address } = shippingAddress;

    if (
      pickingMethod === "delivery" &&
      (!state || !street || !postCode || !city || !country || !address)
    ) {
      toast.error("Please provide a shipping address");
      return setError(true);
    }

    const { items, ...rest } = cart;

    const products = items?.map((item) => {
      const pr = {
        id: item?.id,
        product_id: item?.product_id,
        name: item?.name,
        images: item?.image,
        quantity: item?.quantity,
        price: item?.price,
        is_variant: false,
        variant_id: null,
        variations: null,
      };

      if (item?.variant) {
        pr.is_variant = true;
        pr.variant_id = item?.variant?._id;

        pr.variations = item?.variant?.variations;
      }
      return pr;
    });

    const data = {
      ...rest,
      items: products,

      user: user?.id,
      payment_method: "paypal",
      paid: true,
      payment_id: orderId,
      picking_method: pickingMethod,
    };

    if (pickingMethod === "delivery") {
      data.shipping_address = {
        street,
        postCode,
        state,
        city,
        country,
        address,
      };
    }

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
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;
