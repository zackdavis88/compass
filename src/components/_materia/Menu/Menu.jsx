import React, {useState, useRef, useEffect} from 'react';
import PropTypes from "prop-types";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from "@material-ui/core";
import { useStyles } from './Menu.styles';

const Menu = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="inherit"
        endIcon={props.endIcon ? props.endIcon : null}
        startIcon={props.startIcon ? props.startIcon : null}
        onClick={handleToggle}
        disableRipple={typeof props.disableRipple === "boolean" ? props.disableRipple : false}
      >
        {props.menuName}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {props.menuItems.map((menuItem, index) => (
                    <MenuItem key={index} onClick={(e) => {handleClose(e); menuItem.onClick()}}>
                      {menuItem.startIcon ? (<span className={classes.itemStartIcon}>{menuItem.startIcon}</span>) : null}
                      {menuItem.name}
                      {menuItem.endIcon ? (<span className={classes.itemEndIcon}>{menuItem.endIcon}</span>) : null}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

Menu.propTypes = {
  menuName: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element
  })),
  endIcon: PropTypes.element,
  startIcon: PropTypes.element,
  disableRipple: PropTypes.bool
};

export default Menu;
