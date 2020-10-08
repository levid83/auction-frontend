import { DISPLAY_SPINNER } from "./types";

export const setLoadingSpinner = (status) => {
  return { type: DISPLAY_SPINNER, payload: status };
};
