import { connectDB } from "@lib/mongo";

import { products } from "@controller/product";

const handler = products;

export default connectDB(handler);
