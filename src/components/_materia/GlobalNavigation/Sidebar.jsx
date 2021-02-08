import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,




  ListItemIcon,

} from "@material-ui/core";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import { useStyles } from "./Sidebar.styles.js";

const Sidebar = (props) => {
  const classes = useStyles(props);
  const [accountOpen, setAccountOpen] = useState(false);
  const handleAccountClick = () => setAccountOpen(!accountOpen);
  // TODO: VERY basic sidebar is implemented w/ submenu navigation too.
  // needs styling and major refactoring.
  return (
    <Drawer open={props.isOpen} onClose={props.onClose} classes={{paper: classes.drawerPaper}}>
      <List component="nav" className={classes.sidebarMenu} disablePadding>




        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconPeople />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>

        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <IconBarChart />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button onClick={handleAccountClick} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconLibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Nested Pages" />
        {accountOpen ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={accountOpen} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 1" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Nested Page 2" />
          </ListItem>
        </List>
      </Collapse>




      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default Sidebar;
