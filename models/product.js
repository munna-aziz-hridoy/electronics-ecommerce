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
  extras: [
    {
      item: String,
      price: Number,
      images: [{ type: String }],
    },
  ],
  images: [{ type: String }],
});

const Product = models.products || model("products", product);

export { Product };
