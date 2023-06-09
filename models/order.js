import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const order = new Schema({
  id: String,
  items: [
    {
      id: String,
      name: String,
      product_id: String,
      is_variant: Boolean,
      variant_id: String,
      variations: [
        {
          variant_name: String,
          variant_value: String,
        },
      ],
      image: String,
      quantity: Number,
      price: Number,
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
  total_price: Number,
  total_products: Number,
  paid: Boolean,
  delivery: Boolean,
  payment_method: String,
  payment_id: String || null,
  picking_method: String,

  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Order = models.orders || model("orders", order);

export { Order };
