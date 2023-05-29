import { connectDB } from "@lib/mongo";

import { singleCategory } from "@controller/category";

const handler = singleCategory;

export default connectDB(handler);
