import { connectDB } from "@lib/mongo";
import { orderId } from "@controller/user";

const handler = orderId;

export default connectDB(handler);
