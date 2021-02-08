import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root": {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "15px"
    }
  },
  itemStartIcon: {
    marginRight: "5px"
  },
  itemEndIcon: {
    marginLeft: "5px"
  }
}));
