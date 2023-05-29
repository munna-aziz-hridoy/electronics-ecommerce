import { connectDB } from "@lib/mongo";
import { attribute } from "@controller/attributes";

const handler = attribute;

export default connectDB(handler);
