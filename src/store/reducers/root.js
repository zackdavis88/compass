import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import sidebar from "./sidebar";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sidebar
});

export default createRootReducer;
