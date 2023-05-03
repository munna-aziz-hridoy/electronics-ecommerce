import { User } from "@models/user";
import { Response } from "@helper/response";

import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const response = new Response();

export const users = async (req, res) => {
  // create user
  if (req.method === "POST") {
    const { name, email, password } = JSON.parse(req.body);

    if (!name) return response.BAD_REQUEST(res, "Name can't be empty");
    if (!email) return response.BAD_REQUEST(res, "Email can't be empty");
    if (!password) return response.BAD_REQUEST(res, "Password can't be empty");

    try {
      const id = uuid();

      const hashedPass = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPass,
        id,
      });

      const result = await user.save();

      const token = jwt.sign(
        { name, email, type: "user" },
        process.env.SECRET_TOKEN
      );

      response.CREATED(res, {
        token,
        user: {
          name: result?.name,
          email: result?.email,
          id: result?.id,
          type: result?.type,
        },
      });
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "GET") {
    try {
      const results = await User.find({}, "-_id -__v -password");

      response.SUCCESS(res, results);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};

export const admin = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = JSON.parse(req.body);

    if (!name) return response.BAD_REQUEST(res, "Name can't be empty");
    if (!email) return response.BAD_REQUEST(res, "Email can't be empty");
    if (!password) return response.BAD_REQUEST(res, "Password can't be empty");

    try {
      const exists = await User.find({ type: "admin" });

      if (exists?.length > 0) return response.ALREADY_EXISTS(res);

      const hashedPass = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPass,
        type: "admin",
      });

      const result = await user.save();

      const token = jwt.sign(
        { name, email, type: "admin" },
        process.env.SECRET_TOKEN
      );

      response.CREATED(res, {
        token,
        user: {
          name: result?.name,
          email: result?.email,
          id: result?.id,
          type: result?.type,
        },
      });
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "GET") {
    try {
      const result = await User.findOne(
        { type: "admin" },
        "-_id -created_at -__v -password"
      );
      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "PATCH") {
    const { phone, address, city, country, state, avatar, name, email } =
      JSON.parse(req.body);

    try {
      const result = await User.find({ type: "admin" });

      const doc = {
        name: name || result?.name,
        email: email || result?.email,
        phone: phone || result?.phone,
        city: city || result?.city,
        country: country || result?.country,
        state: state || result?.state,
        address: address || result?.address,
        avatar: avatar || result?.avatar,
      };

      const updatedResult = await User.findOneAndUpdate({ type: "admin" }, doc);

      response.SUCCESS(res, updatedResult);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};

export const user = async (req, res) => {
  const id = req.query.user;

  if (req.method === "GET") {
    try {
      const result = await User.find({ id }, "-_id -created_at -__v");

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "PATCH") {
    try {
      const doc = {
        name: name || result?.name,
        email: email || result?.email,
        phone: phone || result?.phone,
        city: city || result?.city,
        country: country || result?.country,
        state: state || result?.state,
        address: address || result?.address,
        avatar: avatar || result?.avatar,
      };

      const result = await User.findOneAndUpdate({ id }, doc);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  }
};

export const login = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (!email) return response.BAD_REQUEST(res, "Email can't be empty");
    if (!password) return response.BAD_REQUEST(res, "Password can't be empty");

    try {
      const exists = await User.findOne({ email });

      if (!exists) return response.NOT_FOUND(res);

      const isPassMatched = await bcrypt.compare(password, exists?.password);

      if (!isPassMatched) return response.FORBIDDEN(res);

      const user = {
        id: exists?.id,
        name: exists?.name,
        email: exists?.email,
        type: exists?.type,
      };

      const token = jwt.sign(
        {
          name: exists?.name,
          email: exists?.email,
          type: exists?.type,
        },
        process.env.SECRET_TOKEN
      );

      response.SUCCESS(res, { token, user });
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  }
};

//  try {
//  } catch (error) {
//    response.INTERNAL_SERVER_ERROR(res, error);
//  }
