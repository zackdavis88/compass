import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sidebarMenu: {
    width: "100%"
  },
  menuItem: {
    width: theme.measurements.sidebarWidth,
  },
  menuItemIcon: {
    color: '#97c05c',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.measurements.sidebarWidth,
    background: '#535454',
    paddingTop: "25px",
    paddingBottom: "25px",
    color: '#fff',
  }
}));
