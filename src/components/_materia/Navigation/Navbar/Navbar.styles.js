import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.white,
    backgroundColor: theme.palette.brandBlue
  },
  toolbar: {
    height: theme.measurements.navbarHeight,
    backgroundColor: theme.palette.brandBlue,
    color: theme.palette.white
  },
  contentGrid: {
    height: "100%",
    "& #user-menu-section": {
      textAlign: "right"
    }
  },
  brandGrid: {
    height: "100%",
    "& > .MuiGrid-item": {
      [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        height: "45px"
      },
      [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
        height: "35px"
      }
    },
    "& > .MuiGrid-item ~ .MuiGrid-item": {
      height: "auto"
    }
  },
  brandIcon: {
    // CSS selector to make font awesome SVGs specific height/width
    "&.svg-inline--fa.fa-w-16": {
      marginRight: "5px",
      [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        width: "45px",
        height: "45px"
      },
      [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
        width: "35px",
        height: "35px"
      }
    }
  },
  brandText: {
    fontWeight: "bold",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      fontSize: "50px"
    },
    [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
      fontSize: "38px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: "30px",
      lineHeight: "44px"
    }
  },
  sidebarToggleIcon: {
    "&.svg-inline--fa.fa-w-14": {
      width: "20px",
      height: "20px"
    }
  },
  navigationButton: {
    "&.MuiButton-root": {
      height: theme.measurements.navbarHeight,
      color: "inherit",
      fontWeight: "bold",
      padding: "8px 12px",
      borderRadius: "0",
      marginRight: "8px",
      borderBottom: `4px solid ${theme.palette.brandBlue}`,
      transition: "border-color 200ms ease-in"
    },
    "&.MuiButton-root.activeNav": {
      borderColor: theme.palette.white
    }
  },
  drawerPaper: {
    width: theme.measurements.sidebarWidth
  }
}));
