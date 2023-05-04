import { v4 as uuid } from "uuid";

export const getSlug = (name) => {
  const unique_number = uuid().slice(0, 4);

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return `${slug}_${unique_number}`;
};
