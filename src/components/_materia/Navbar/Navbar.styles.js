import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    height: "75px",
    backgroundColor: theme.palette.brandBlue,
    color: theme.palette.white
  },
  brandName: {
    lineHeight: "75px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      textAlign: "left"
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "35px",
      textAlign: "center"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "45px",
      textAlign: "center"
    },
  }
}));
