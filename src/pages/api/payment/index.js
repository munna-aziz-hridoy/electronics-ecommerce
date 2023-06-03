import { connectDB } from "@lib/mongo";
import { payment } from "@controller/payment";

const handler = payment;

export default connectDB(handler);
