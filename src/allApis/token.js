import { destroyCookie, parseCookies, setCookie } from "nookies";

// Set
export const setToken = (token) => {
  setCookie(null, "userToken", token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

// Get
export const getToken = () => {
  const cookies = parseCookies();
  const token = cookies?.userToken;
  return token;
};

// Remove
export const removeToken = () => {
  destroyCookie(null, "userToken");
};
