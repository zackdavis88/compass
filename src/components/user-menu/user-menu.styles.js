import styled from "styled-components";
import { white, black, black1a, black26, navbarHeight } from "../../common-styles/variables";
import { fadeIn } from "../../common-styles/animations";

export const UserMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 25px;
  height: ${navbarHeight};

  & span {
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
    text-overflow: ellipsis;
    user-select: none;
    line-height: ${navbarHeight};
  }
`;

export const FlyoutWrapper = styled.div`
  position: absolute;
  border-radius: 4px;
  line-height: 1;
  border: 1px solid ${black};
  top: 50px;
  right: 10px;
  width: 175px;
  min-width: 175px;
  height: auto;
  background-color: ${white};
  color: ${black};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 5px;
  padding-right: 5px;
  animation: 125ms linear 0s 1 ${fadeIn};
`;

export const FlyoutMenuItem = styled.li`
  user-select: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${white};
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${black1a};
  }

  &:active {
    background-color: ${black26};
  }
`;

export const FlyoutItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
  & ${FlyoutMenuItem} {
    margin-bottom: 2px;
  }
`;
