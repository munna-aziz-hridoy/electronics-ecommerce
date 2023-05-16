import { Response } from "@helper/response";
import { Category } from "@models/category";
import { Product } from "@models/product";

import { v4 as uuid } from "uuid";

const response = new Response();

export const products = async (req, res) => {
  if (req.method === "GET") {
    try {
      const products = await Product.find({}, "-_id -created_at -__v");

      response.SUCCESS(res, products);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "POST") {
    const {
      name,
      price,
      short_description,
      description,
      category,
      extras,
      images,
    } = JSON.parse(req.body);

    if (!name) return response.BAD_REQUEST(res, "name can't be empty");
    if (!price) return response.BAD_REQUEST(res, "price can't be empty");
    if (!short_description)
      return response.BAD_REQUEST(res, "short_description can't be empty");
    if (!description)
      return response.BAD_REQUEST(res, "description can't be empty");
    if (!category) return response.BAD_REQUEST(res, "category can't be empty");
    if (!images) return response.BAD_REQUEST(res, "images can't be empty");

    try {
      const cat = await Category.find({ id: category }, "-_id -__v");

      const id = uuid();

      const doc = {
        id,
        name,
        price,
        description,
        short_description,
        category: cat,
        extras: extras || null,
        images,
      };

      const product = new Product(doc);

      const result = await product.save();

      return response.CREATED(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};

export const product = async (req, res) => {
  const id = req.query.product_id;
  
  if (req.method === "GET") {
    try {
      const result = await Product.find({ id }, "-_id -created_at -__v");

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "PATCH") {
    try {
      const exists = await Product.find({ id });

      if (!exists) return response.NOT_FOUND(res);

      const {
        name,
        price,
        short_description,
        description,
        category,
        extras,
        images,
      } = JSON.parse(req.body);

      const cat = await Category?.find({ id: category });

      const doc = {
        name: name || exists?.name,
        price: price || exists?.price,
        short_description: short_description || exists?.short_description,
        description: description || exists?.description,
        category: cat || exists?.category,
        extras: extras || exists?.extras,
        images: images || exists?.images,
      };

      const result = await Product.findOneAndUpdate({ id }, doc);

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "DELETE") {
    try {
      const exists = await Product.find({ id });

      if (!exists) return response.NOT_FOUND(res);

      const result = await Product.deleteOne({ id });

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};
