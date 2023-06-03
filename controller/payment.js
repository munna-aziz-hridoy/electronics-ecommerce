import { Response } from "@helper/response";

import Stripe from "stripe";

const response = new Response();

export const payment = async (req, res) => {
  if (req.method === "POST") {
    const { paymentMethodId, amount } = req.body;

    const stripe = new Stripe(
      "sk_test_51L1uNJFwLOKoh01CNN75zK1bZNBQuccKF6z8awX76GMaXqlyO9aLOZTZCtieCq2DhZGfiZ5zsDbbWQH8yeNmTkcL00FZ4ee4HW"
    );

    const total = amount * 100;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method: paymentMethodId,
        amount: total,
        currency: "usd",
        // Set to true to immediately confirm the payment
      });

      response.SUCCESS(res, { client_secret: paymentIntent.client_secret });
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res);
  }
};
