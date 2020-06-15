import styled, { css } from "styled-components";
import {
  transparent,
  black33,
  white,
  white20,
  white40,
  brandBlue,
  tertiaryRed
} from "../../common-styles/variables";
import {scaleIn, scaleOut} from "../../common-styles/animations";

export const NotificationMessageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 75px;
  min-height: 75px;
  color: ${white};
  background-color: ${brandBlue};
  font-size: 18px;
  width: 500px;
  border: 2px solid ${black33};
  border-radius: 15px;
  animation: 200ms linear ${scaleIn} forwards;
  ${({type}) => type === "danger" && css`
    background-color: ${tertiaryRed};
  `}
  & #notification-message {
    margin-top: 23px;
    margin-bottom: 23px;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 45px;
  }

  ${({showCloseAnimation}) => showCloseAnimation && css`
    animation: 200ms linear ${scaleOut} forwards;
  `}
`;

export const CloseButton = styled.div`
  cursor: pointer;
  transition: background-color 100ms linear;
  position: absolute;
  right: 10px;
  top: 17px;
  border-radius: 32px;
  padding: 2px;
  border: 1px solid ${transparent};
  line-height: 0px;
  user-select: none;

  &:hover {
    background-color: ${white20};
  }

  &:active {
    background-color: ${white40};
  }
`;
