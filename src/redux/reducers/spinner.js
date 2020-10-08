import { DISPLAY_SPINNER } from "../actions/types";
const initialState = {
  displaySpinner: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_SPINNER:
      return { ...state, displaySpinner: action.payload };
    default:
      return state;
  }
}
