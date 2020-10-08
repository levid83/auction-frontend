import { SET_TOKEN, SET_CLAIMS, SET_AUTH } from "./types";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setClaims = (claims) => {
  return { type: SET_CLAIMS, payload: { claims: claims, email: claims.email } };
};

export const setAuth = (token, claims) => {
  return {
    type: SET_AUTH,
    payload: { claims: claims, email: claims.email, token: token },
  };
};
