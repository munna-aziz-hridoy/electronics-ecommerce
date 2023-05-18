import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const order = new Schema({
  id: String,
  items: [
    {
      id: String,
      name: String,
      extras: [
        {
          item: String,
          price: Number,
        },
      ],
      images: [{ type: String }],
      quantity: {
        type: Number,
      },
    },
  ],
  shipping_address: {
    address: String,
    city: String,
    country: String,
    postCode: String,
    state: String,
    street: String,
  },
  user: {
    type: String,
    require: true,
  },
  paid: Boolean,
  delivery: Boolean,

  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Order = models.orders || model("orders", order);

export { Order };
