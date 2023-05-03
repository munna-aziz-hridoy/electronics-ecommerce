import { connectDB } from "@lib/mongo";
import { login } from "@controller/user";

const handler = login;

export default connectDB(handler);
