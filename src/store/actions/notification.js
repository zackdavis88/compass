import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "../types/notification";

export const showNotification = (message, type) => ({
  type: SHOW_NOTIFICATION,
  notification: {message, type}
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
});
