import { connectDB } from "@lib/mongo";

import { product } from "@controller/product";

const handler = product;

export default connectDB(handler);
