import { connectDB } from "@lib/mongo";
import { adminOrder } from "@controller/user";

const handler = adminOrder;

export default connectDB(handler);
