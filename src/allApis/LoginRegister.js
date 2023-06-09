import { serverUrl } from "@config/index";
import { setToken } from "./token";

// User Registration
export const resisterUser = async (body) => {
  const res = await fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  });
  const json = await res.json();
  if (json?.token?.length > 10) {
    setToken(json.token);
  }
  return json;
};

// User Login
export const loginUser = async (body) => {
  const res = await fetch(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json?.token?.length > 10) {
    setToken(json.token);
  }
  return json;
};
