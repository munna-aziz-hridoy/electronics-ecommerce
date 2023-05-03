import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const cart = new Schema({
  products: [
    {
      id: String,
      extras: [
        {
          item: String,
          price: Number,
          images: [{ type: String }],
        },
      ],
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  user_id: {
    type: String,
    require: true,
  },

  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Cart = models.carts || model("carts", cart);

export { Cart };
