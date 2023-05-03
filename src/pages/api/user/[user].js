import { connectDB } from "@lib/mongo";
import { user } from "@controller/user";

const handler = user;

export default connectDB(handler);
