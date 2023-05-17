import { connectDB } from "@lib/mongo";
import { categoryProducts } from "@controller/product";

const handler = categoryProducts;

export default connectDB(handler);

/**    /api/category/product?category=categoryId   **/
