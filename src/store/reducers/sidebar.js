import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_SIDEBAR
} from "../actions/sidebar";

const initialState = {
  isOpen: false
};

export default function sidebarReducer(state=initialState, action) {
  switch(action.type){
    case OPEN_SIDEBAR:
      return {
        ...state,
        isOpen: true
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen: false
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};