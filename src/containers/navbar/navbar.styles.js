import styled from "styled-components";
import { primaryBlue, black, white, navbarHeight } from "../../common-styles/variables";

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  width: 100%;
  height: ${navbarHeight};
  background-color: ${primaryBlue};
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