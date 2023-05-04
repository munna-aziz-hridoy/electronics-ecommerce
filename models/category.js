import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const category = new Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  parent_id: {
    type: String,
    require: true,
    default: null,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Category = models.categories || model("categories", category);

export { Category };
