import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const product = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  category: {
    name: String,
    slug: String,
    id: String,
    parent_id: String,
    created_at: String,
  },
  description: {
    type: String,
    require: true,
  },
  short_description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  extras: [
    {
      variations: [
        {
          variant_name: String,
          variant_value: String,
        },
      ],
      price: Number,
      quantity: { type: Number, default: 1, require: true },
      images: [{ type: String }],
      _id: String,
    },
  ],
  images: [{ type: String }],
});

const Product = models.products || model("products", product);

export { Product };
