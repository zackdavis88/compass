import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sidebarMenu: {
    width: "100%"
  },
  menuItem: {
    width: "100%"
  },
  menuItemIcon: {
    color: '#97c05c',
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: theme.measurements.sidebarWidth,
    background: theme.palette.brandBlue,
    padding: "25px 15px",
    fontSize: "0.875rem",
    color: theme.palette.white
  },
  drawerRoot: {
    "&.MuiDrawer-modal": {
      top: `${theme.measurements.navbarHeight} !important`,
      height: `calc(100% - ${theme.measurements.navbarHeight})`,
    },
    "& .MuiBackdrop-root": {
      top: `${theme.measurements.navbarHeight}`,
      height: `calc(100% - ${theme.measurements.navbarHeight})`,
    },
    "& .MuiListItemText-primary": {
      fontSize: "0.875rem",
      fontWeight: "bold"
    },
    "& .MuiDivider-root": {
      // marginLeft: "16px",
      // marginRight: "16px",
      backgroundColor: theme.palette.white
    },
    "& .MuiListItemText-inset": {
      paddingLeft: "15px"
    }
  }
}));
