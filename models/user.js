import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const user = new Schema({
  id: {
    type: String,
  },

  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  phone: {
    type: String,
  },

  avatar: {
    type: String,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },
  state: {
    type: String,
  },

  country: {
    type: String,
  },

  type: {
    type: String,
    require: true,
    default: "user",
  },

  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const User = models.users || model("users", user);

export { User };
