import { connectDB } from "@lib/mongo";
import { category } from "@controller/category";

const handler = category;

export default connectDB(handler);
