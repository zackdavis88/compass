import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Hidden,
  Grid
} from "@material-ui/core/";
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from "./Navbar.styles";
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';

const Navbar = (props) => {
  const classes = useStyles(props);
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar className={classes.navbarContainer}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2}>
              <Hidden smUp>
                <IconButton style={{color: "white"}}>
                  <MenuIcon/>
                </IconButton>
              </Hidden>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.brandName}>
                <Hidden xsDown>
                  <ExploreTwoToneIcon />
                </Hidden>
                Compass
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
