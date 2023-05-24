import { Response } from "@helper/response";
import { Attribute } from "@models/attributes";

import { v4 as uuid } from "uuid";

const response = new Response();

export const attribute = async (req, res) => {
  if (req.method === "GET") {
    try {
      const attributes = await Attribute.find({}, "-_id -_created_at -__v");

      response.SUCCESS(res, attributes);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "POST") {
    const body = req.body;

    if (!body) return response.BAD_REQUEST(res, "Data is not included");

    const { name, values } = JSON.parse(body);

    if (!name) return response.BAD_REQUEST(res, "Name is required");

    try {
      const id = uuid();

      const attribute = new Attribute({
        id,
        name,
        values: values || [],
      });

      const result = await attribute.save();

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};

export const singleAttribute = async (req, res) => {
  const id = req.query.attribute_id;

  if (req.method === "GET") {
    try {
      const result = await Attribute.findOne({ id }, "-_id -created_at -__v");

      if (!result) return response.NOT_FOUND(res);

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "PATCH") {
    const body = req.body;

    if (!body) return response.BAD_REQUEST(res, "Data is not included");

    const { name, values } = JSON.parse(body);

    try {
      const exists = await Attribute.findOne({ id });

      if (!exists) return response.NOT_FOUND(res);

      const result = await Attribute.findOneAndUpdate(
        { id },
        {
          name,
          values,
        }
      );

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "DELETE") {
    try {
      const exists = await Attribute.findOne({ id });

      if (!exists) return response.NOT_FOUND(res);

      const result = await Attribute.findOneAndDelete({ id });

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};
