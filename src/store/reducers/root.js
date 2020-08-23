import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import sidebar from "./sidebar/sidebar";
import auth from "./auth/auth";
import user from "./user/user";
import notification from "./notification/notification";
import dashboard from "./dashboard/dashboard";
import project from "./project/project";
import membership from "./membership/membership";
import story from "./story/story";
import priority from "./priority/priority";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebar,
  auth,
  user,
  notification,
  dashboard,
  project,
  membership,
  story,
  priority
});

export default createRootReducer;
