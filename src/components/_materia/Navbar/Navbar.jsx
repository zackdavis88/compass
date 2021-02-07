import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Hidden,
  Button,
  Link,
  Grid
} from "@material-ui/core/";
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from "./Navbar.styles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';
import {useWidth} from "../../../utils";

const Navbar = (props) => {
  const classes = useStyles(props);
  const trigger = useScrollTrigger();
  const currentBreakpoint = useWidth();

  const _goHome = (event) => {
    event.preventDefault();
    return props.historyPush("/");
  };
  
  const contentGridProps = {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center",
    className: classes.contentGrid
  };

  const brandGridProps = {
    container: true,
    direction: "row",
    justify: currentBreakpoint !== "xs" ? "center" : "flex-start",
    alignItems: "center",
    className: classes.brandGrid
  };

  const _renderBranding = () => (
    <Grid {...brandGridProps}>
      <Grid item>
        <Hidden xsDown implementation="css">
          <ExploreTwoToneIcon className={classes.brandIcon}/>
        </Hidden>
      </Grid>
      <Grid item>
        <Typography color="inherit" variant="h3" component="h3" className={classes.brandText}>
          <Link href="/" color="inherit" underline="none" onClick={_goHome}>
            Compass
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Grid {...contentGridProps}>
            <Grid item xs={2} sm={3}>
              <Hidden mdUp implementation="css">
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Grid>
            <Grid item xs={10} sm={6}>
              {_renderBranding()}
            </Grid>
            <Grid item sm={3}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default connect((state) => ({
  //mapStateToProps
  location: state.router.location
}), {
  // mapDispatchToProps
  historyPush: push
})(Navbar);
