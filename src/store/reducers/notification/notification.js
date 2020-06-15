import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "../../types/notification";

const initialState = {
  message: "",
  type: ""
};

export default function notificationReducer(state=initialState, action) {
  switch(action.type){
    case SHOW_NOTIFICATION:
      return {
        message: action.notification.message,
        type: action.notification.type || "info"
      };
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};
