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

export const SidebarToggleButton = styled.div`
  position: absolute;
  left: 25px;
  top: 20px;
  line-height: 0;
  padding: 10px;
  user-select: none;
  cursor: pointer;
  border: 1px solid ${transparent};
  border-radius: 32px;
  background-color: ${transparent};
  z-index: 5001;
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${white20};
  }

  &:active {
    background-color: ${white40};
  }

  ${({isActive}) => isActive && css`
    background-color: ${white40};
    
    &:hover {
      background-color: ${white40};
    }
  `}
`;
