import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import sidebar from "./sidebar/sidebar";
import auth from "./auth/auth";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebar,
  auth
});

export default createRootReducer;
