import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "../types/notification";

export const showNotification = (message, type, autoHide) => ({
  type: SHOW_NOTIFICATION,
  notification: {message, type, autoHide}
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
