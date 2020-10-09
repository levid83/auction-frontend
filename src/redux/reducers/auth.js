import { SET_TOKEN, SET_CLAIMS } from "../actions/types";

const initialState = {
  token: null,
  claims: null,
  email: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_CLAIMS:
      return {
        ...state,
        claims: action.payload.claims,
        email: action.payload.email,
      };
    default:
      return state;
  }
}
