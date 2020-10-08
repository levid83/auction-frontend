import { combineReducers } from "redux";
import auction from "./auction";
import auth from "./auth";
import spinner from "./spinner";
export default combineReducers({ auction, auth, spinner });
