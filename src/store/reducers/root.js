import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import sidebar from "./sidebar/sidebar";
import auth from "./auth/auth";
import user from "./user/user";
import notification from "./notification/notification";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebar,
  auth,
  user,
  notification
});

export default createRootReducer;
