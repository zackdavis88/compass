import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_SIDEBAR
} from "../actions/sidebar";

export const openSidebar = () => ({
  type: OPEN_SIDEBAR
});

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});
