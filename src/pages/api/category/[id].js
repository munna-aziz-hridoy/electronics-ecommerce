import { connectDB } from "@lib/mongo";

import { subCategory } from "@controller/category";

const handler = subCategory;

export default connectDB(handler);
