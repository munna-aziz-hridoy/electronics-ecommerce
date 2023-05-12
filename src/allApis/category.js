import { serverUrl } from "@config/index";

// User Get
export const getCategory = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/category`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
