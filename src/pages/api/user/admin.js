import { connectDB } from "@lib/mongo";
import { admin } from "@controller/user";

const handler = admin;

export default connectDB(handler);
