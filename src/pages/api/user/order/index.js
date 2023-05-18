import { connectDB } from "@lib/mongo";
import { order } from "@controller/user";

const handler = order;

export default connectDB(handler);
