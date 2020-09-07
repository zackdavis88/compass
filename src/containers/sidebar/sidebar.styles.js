import styled, { css } from "styled-components";
import { 
  brandBlue,
  white,
  white1a,
  whiteb2,
  white36,
  sidebarWidth,
  navbarHeight,
  sidebarExpandDuration
} from "../../common-styles/variables";

export const SidebarWrapper = styled.aside`
  position: fixed;
  width: 0;
  height: calc(100% - ${navbarHeight});
  min-height: 500px;
  display: block;
  z-index: 4000;
  margin-top: ${navbarHeight};
  transition: width ${sidebarExpandDuration} linear;
  color: ${white};
  background-color: ${brandBlue};
  overflow: hidden;
  user-select: none;
  ${({isOpen}) => isOpen && css`
    width: ${sidebarWidth};
    -webkit-box-shadow: 5px 0px 30px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 0px 30px 2px rgba(0,0,0,0.75);
    box-shadow: 5px 0px 30px 2px rgba(0,0,0,0.75);
  `}
`;

export const SidebarContent = styled.div`
  position: relative;
  width: 100%;
  min-width: ${sidebarWidth};
  height: 100%;
  padding: 25px 15px;
  box-sizing: border-box;
`;

export const SidebarHeader = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid ${white};
  user-select: none;
  margin-bottom: 25px;
`;

export const SidebarFooter = styled.div`
  color: ${white36};
  position: absolute;
  left: 0;
  bottom: 25px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  user-select: none;

  & div {
    font-size: 16px;
  }

  & div span {
    margin-left: 6px;
    margin-right: 6px;
  }

  & a {
    color: ${white36};
    text-decoration: none;
    transition: color 150ms linear;

    &:hover {
      text-decoration: underline;
      color: ${white};
    }
  }

  & svg {
    transition: color 150ms linear;
  }
  
  & svg:hover {
    color: ${white};
  }
`;

export const NavList = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: 18px;
  list-style: none;
`;

export const NavItem = styled.li`
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  margin-bottom: 8px;
  transition: background-color 150ms linear, border-color 150ms linear;
  border-radius: 32px;
  border: 1px solid ${brandBlue};
  padding-left: 8px;
  padding-right: 8px;

  &:hover {
    background-color: ${white1a};
  }

  &:active {
    border: 1px solid ${whiteb2};
    background-color: ${white36};
  }

  ${({activeLink}) => activeLink && css`
    border: 1px solid ${whiteb2};
    background-color: ${white1a};
  `}
`;
