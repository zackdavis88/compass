import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Hidden,
  Link,
  Grid,
  Button
} from "@material-ui/core/";
import {useStyles} from "./Navbar.styles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {useWidth} from "../../../utils";
import UserMenu from "../Menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faKey, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const classes = useStyles(props);
  const trigger = useScrollTrigger();
  const currentBreakpoint = useWidth();

  const _goHome = (event) => {
    event.preventDefault();
    return props.historyPush("/");
  };

  const navigationItems = [{
    name: "Dashboard",
    url: "/dashboard",
    onClick: (event, url) => {
      event.preventDefault();
      return props.historyPush(url);
    }
  }, {
    name: "Projects",
    url: "/projects",
    onClick: (event, url) => {
      event.preventDefault();
      return props.historyPush(url);
    }
  }];
  
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

  const userMenuProps = {
    menuName: props.userInfo ? props.userInfo.displayName : "booya",
    menuItems: [{
      name: "Change Password",
      startIcon: <FontAwesomeIcon icon={faKey}/>,
      onClick: () => {
        console.log("Change Password");
      }
    }, {
      name: "Sign Out",
      startIcon: <FontAwesomeIcon icon={faSignOutAlt}/>,
      onClick: () => {
        console.log("Sign Out");
      }
    }],
    endIcon: <FontAwesomeIcon icon={faCaretDown} />
  };

  const _renderBranding = () => (
    <Grid {...brandGridProps}>
      <Grid item>
        <Hidden xsDown>
          <FontAwesomeIcon icon={faCompass} className={classes.brandIcon} />
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

  const _renderUserMenu = () => (
    <Hidden smDown>
      {/* {props.userInfo ? <UserMenu {...userMenuProps}/> : null} */}
      <UserMenu {...userMenuProps}/>
    </Hidden>
  );

  const _renderNavigation = () => (
    <>
      <Hidden mdUp>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faBars} className={classes.sidebarToggleIcon}/>
        </IconButton>
      </Hidden>
      <Hidden smDown>
        {navigationItems.map((navItem, index) => {
          const navItemProps = {
            key: index,
            href: navItem.url,
            onClick: (event) => navItem.onClick(event, navItem.url),
            className: `${classes.navigationButton} ${navItem.url === location.pathname ? "activeNav" : ""}`
          }
          return (
            <Button {...navItemProps}>
              {navItem.name}
            </Button>
          );
        })}
      </Hidden>
    </>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Grid {...contentGridProps}>
            <Grid item xs={2} sm={3} md={4} id="navigation-section">
              {_renderNavigation()}
            </Grid>
            <Grid item xs={10} sm={6} md={4}id="brand-section">
              {_renderBranding()}
            </Grid>
            <Grid item sm={3} md={4} id="user-menu-section">
              {_renderUserMenu()}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

Navbar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  userInfo: PropTypes.object,
  historyPush: PropTypes.func.isRequired
};

export default connect((state) => ({
  location: state.router.location,
  userInfo: state.auth.user
}), {
  historyPush: push
})(Navbar);
