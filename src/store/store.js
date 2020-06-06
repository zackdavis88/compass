import { 
  createStore,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers/root";

export const history = createBrowserHistory();

export default createStore(
  createRootReducer(history),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  )
);
