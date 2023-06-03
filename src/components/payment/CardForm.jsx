import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } else {
      // Send the paymentMethod.id to your server to complete the payment
      console.log(paymentMethod);
      setPaymentError(null);
      setPaymentSuccess(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card details
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",

                    padding: "20px",
                  },
                },
              }}
            />
          </label>
        </div>
        {paymentError && <p>Error: {paymentError}</p>}
        {paymentSuccess && <p>Payment successful!</p>}
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        <button
          //   onClick={handlePlaseOrder}
          className="flex justify-center items-center w-1/2 p-2 border border-gray-300 gap-4  bg-[#b8d94b] mt-16"
        >
          Place Order
        </button>
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
