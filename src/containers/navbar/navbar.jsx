import React from "react";
import PropTypes from "prop-types";
import { NavbarWrapper, NavbarBrand } from "./navbar.styles";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = (props) => {
  return (
    <NavbarWrapper>
      <NavbarBrand>
        <FontAwesomeIcon data-testid="brandIcon" icon={faCompass} fixedWidth />
        <span data-testid="brandName">Compass</span>
      </NavbarBrand>
    </NavbarWrapper>
  );
};

export default Navbar;
