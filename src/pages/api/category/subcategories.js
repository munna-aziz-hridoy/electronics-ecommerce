import { connectDB } from "@lib/mongo";
import { allSubCategories } from "@controller/category";

const handler = allSubCategories;

export default connectDB(handler);
