import { connectDB } from "@lib/mongo";
import { users } from "@controller/user";

const handler = users;

export default connectDB(handler);
