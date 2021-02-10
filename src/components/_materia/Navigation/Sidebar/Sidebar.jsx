import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider
} from "@material-ui/core";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import { useStyles } from "./Sidebar.styles.js";

const Sidebar = (props) => {
  const classes = useStyles(props);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const _handleSubMenuClick = (index) => {
    if(index === openSubMenu)
      return setOpenSubMenu(null);

    return setOpenSubMenu(index)
  };

  const _renderMenuItem = (navItem, inset=false) => {
    const listItemProps = {
      button: true,
      className: classes.menuItem,
      onClick: navItem.onClick ? (e) => {navItem.onClick(); props.closeSidebar()} : (e) => {props.goToUrl(e, navItem.url); props.closeSidebar()}
    };

    return (
      <ListItem {...listItemProps}>
        <ListItemText primary={navItem.name.toUpperCase()} inset={inset} />
      </ListItem>
    );
  };

  const _renderCollapsibleMenuItem = (navItem, index) => (
    <>
      <ListItem button onClick={() => _handleSubMenuClick(index)} className={classes.menuItem}>
        <ListItemText primary={navItem.name.toUpperCase()} />
        {openSubMenu === index ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {navItem.navigationItems.map((subItem, index) => (
            <React.Fragment key={index}>
              {_renderMenuItem(subItem, true)}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );

  return (
    <Drawer open={props.isOpen} onClose={props.onClose} classes={{root: classes.drawerRoot, paper: classes.drawerPaper}}>
      <List component="nav" className={classes.sidebarMenu} disablePadding>
        {props.navigationItems.map((navItem, index) => {
          return (
            <React.Fragment key={index}>
              {navItem.navigationItems && navItem.navigationItems.length ? (
                _renderCollapsibleMenuItem(navItem, index)
              ) : (
                _renderMenuItem(navItem)
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    navigationItems: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func
    }))
  })),
  goToUrl: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default Sidebar;
