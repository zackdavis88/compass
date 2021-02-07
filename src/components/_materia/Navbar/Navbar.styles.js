import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "75px",
    backgroundColor: theme.palette.brandBlue,
    color: theme.palette.white
  },
  contentGrid: {
    height: "100%"
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
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      width: "45px",
      height: "45px"
    },
    [theme.breakpoints.between(theme.breakpoints.values.sm, theme.breakpoints.values.md)]: {
      width: "35px",
      height: "35px"
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
      fontSize: "30px"
    }
  }
}));
