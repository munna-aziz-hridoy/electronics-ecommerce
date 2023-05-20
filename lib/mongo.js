import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const connectDB = (handler) => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    await mongoose.connect(
      "mongodb+srv://munna:munna12@e-commerce.a4pyqvd.mongodb.net/?retryWrites=true&w=majority"
    );

    return handler(req, res);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Database connection failed", error });
  }
};

export { connectDB };
