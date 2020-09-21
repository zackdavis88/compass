import styled, { css } from "styled-components";
import {
  brandBlue,
  black,
  white,
  white20,
  white40,
  transparent,
  navbarHeight
} from "../../common-styles/variables";

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  width: 100%;
  height: ${navbarHeight};
  background-color: ${brandBlue};
  border-bottom: 1px solid ${black};
  color: ${white};
`;

export const NavbarBrand = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  user-select: none;
  margin-top: 11px;

  @media screen and (max-width: 700px) {
    span {
      display: none;
    }
  }
`;

export const NavbarLinks = styled.div`
  position: absolute;
  left: 25px;
  height: ${navbarHeight};
  z-index: 5001;
`;

export const LinkItem = styled.a`
  position: relative;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
  user-select: none;
  line-height: ${navbarHeight};
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${white20};
  }
  &:link {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }
  &:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }

  &.navlink-active {
    background-color: ${white20};
  }
`;
