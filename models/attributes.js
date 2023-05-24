import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const attribute = new Schema({
  id: String,

  name: {
    type: String,
    require: true,
  },

  values: [
    {
      name: String,
      value: String,
    },
  ],
  category_id: String,
  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Attribute = models.attributes || model("attributes", attribute);

export { Attribute };
