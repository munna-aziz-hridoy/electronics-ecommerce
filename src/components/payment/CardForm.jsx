import { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "@/context/cart";
import useAuthStore from "@/store/auth";
import { getpaymentClientSecret } from "@/allApis/payment";
import { useRouter } from "next/router";
import { placeOrder } from "@/allApis/order";
import { Spinner } from "..";
import toast from "react-hot-toast";

const PaymentForm = ({ shippingAddress, setError, pickingMethod }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cart, clearCart } = useContext(CartContext);
  const { user } = useAuthStore();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

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

    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setLoading(false);
    } else {
      // Send the paymentMethod.id to your server to complete the payment

      const response = await getpaymentClientSecret(
        paymentMethod.id,
        cart.total_price
      );

      const { res, data } = response;

      if (res.status === 200) {
        const { client_secret } = data;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (result.paymentIntent) {
          setPaymentSuccess(true);

          const orderData = {
            ...rest,
            items: products,

            user: user?.id,
            payment_method: "card",
            paid: true,
            payment_id: result.paymentIntent.id,
            picking_method: pickingMethod,
          };

          if (pickingMethod === "delivery") {
            orderData.shipping_address = {
              street,
              postCode,
              state,
              city,
              country,
              address,
            };
          }

          // const orderData = {
          //   ...rest,
          //   items: products,
          //   shipping_address: {
          //     street,
          //     postCode,
          //     state,
          //     city,
          //     country,
          //     address,
          //   },
          //   user: user?.id,
          //   payment_method: "card",
          //   paid: true,
          //   payment_id: result.paymentIntent.id,
          // };

          placeOrder(orderData);

          setLoading(false);
          clearCart();
          router.push("/order-complete");
        } else if (result.error) {
          setPaymentError(result.error.message);
          setLoading(false);
        }
      }

      setPaymentError(null);
      setPaymentSuccess(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <p className="text-gray-700 font-semibold my-2">Card Details</p>
            {/* <div className="h-10 w-full border border-gray-300 rounded-md"> */}
            <CardElement
              options={{
                style: {
                  base: {
                    iconColor: "#000",
                    color: "#424242",
                    fontWeight: "600",
                    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                    fontSize: "16px",
                    fontSmoothing: "antialiased",
                    ":-webkit-autofill": {
                      color: "#fce883",
                    },
                    "::placeholder": {
                      color: "#424242",
                    },
                  },
                  invalid: {
                    iconColor: "#FFC7EE",
                    color: "#FFC7EE",
                  },
                },
              }}
              className="stripe_card"
            />
          </label>
        </div>
        {paymentError && (
          <p className="text-red-500 font-semibold mt-2">
            Error: {paymentError}
          </p>
        )}
        {paymentSuccess && (
          <p className="text-green-500 font-semibold mt-2">
            Payment successful!
          </p>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-8"
          >
            Place Order
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;

const product = {
  reorder_threshold: null,
  product_name: "Dry Coconut Half Cut (100 g)",
  product_unit: "Piece",
  offlineProduct: ["8902761115059"],
  onlineProduct: ["8322"],
};
