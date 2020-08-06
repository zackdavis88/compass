import styled, {css} from "styled-components";
import { transparent, black, black80, black1a, black26, white } from "../../common-styles/variables";
import { fadeIn } from "../../common-styles/animations";

export const ProjectActionsWrapper = styled.div`
  position: absolute;
  right: 50px;
  top: 30px;
  z-index: 2999;
  border: 1px solid ${transparent};
  color: ${black80};
  transition: border-color 100ms linear, color 100ms linear;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  
  ${({menuOpen}) => menuOpen && css`
    border-color: ${black80};
    color: ${black};
  `}

  &:hover {
    border-color: ${black80};
    color: ${black};
  }

  & span {
    font-weight: 500;
    font-size: 18px;
    user-select: none;
  }
`;

export const FlyoutWrapper = styled.div`
  position: absolute;
  border-radius: 5px;
  border: 1px solid ${black};
  left: -71px;
  width: 175px;
  min-width: 175px;
  height: auto;
  background-color: ${white};
  color: ${black};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 5px;
  padding-right: 5px;
  -webkit-box-shadow: 0px 8px 15px 2px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 8px 15px 2px rgba(0,0,0,0.25);
  box-shadow: 0px 8px 15px 2px rgba(0,0,0,0.25);
  animation: 125ms linear 0s 1 ${fadeIn};
`;

export const Item = styled.li`
  user-select: none;
  cursor: pointer;
  padding: 5px 15px 5px 15px;
  border-radius: 5px;
  border: 1px solid ${white};
  transition: background-color 125ms linear;

  &:hover {
    background-color: ${black1a};
  }

  &:active {
    background-color: ${black26};
  }

  & svg {
    margin-right: 5px;
  }
`;

export const ItemList = styled.ul`
  margin: 0;
  padding: 0 0 2px 0;
  list-style: none;
  text-align: left;
`;
