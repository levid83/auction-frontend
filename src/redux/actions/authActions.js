import { SET_TOKEN, SET_CLAIMS } from "./types";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setClaims = (claims) => {
  return { type: SET_CLAIMS, payload: { claims: claims, email: claims.email } };
};
