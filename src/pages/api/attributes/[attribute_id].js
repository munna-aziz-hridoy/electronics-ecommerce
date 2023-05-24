import { connectDB } from "@lib/mongo";
import { singleAttribute } from "@controller/attributes";

const handler = singleAttribute;

export default connectDB(handler);
