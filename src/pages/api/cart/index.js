import { connectDB } from "@lib/mongo";
import { cart } from "@controller/cart";

const handler = cart;

export default connectDB(handler);
