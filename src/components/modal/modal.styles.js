import styled, { keyframes, css } from "styled-components";
import { white, black, black26, black33, black66, black99, transparent } from "../../common-styles/variables";
import { InputBoxWrapper } from "../input-box/input-box.styles";
import { SelectInputWrapper } from "../select-input/select-input.styles";
import { TextAreaWrapper } from "../text-area/text-area.styles";
import { ButtonWrapper } from "../button/button.styles";
const scaleIn = keyframes`
  0% {
    transform: translate(-50%) scale(0);
  }
  50% {
    transform: translate(-50%) scale(0.5);
  }
  100% {
    transform: translate(-50%) scale(1);
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: ${black66};
  z-index: 7000;
  display: block;
  overflow-y: auto;
`;

export const ModalBox = styled.div`
  box-sizing: border-box;
  color: ${black};
  position: relative;
  z-index: 7001;
  width: 700px;
  min-width: 200px;
  top: 20%;
  left: 50%;
  padding: 15px 15px;
  background-color: ${white};
  animation: 150ms linear ${scaleIn} forwards;
  border: 1px solid ${white};
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 15px -4px ${black99};
  -moz-box-shadow: 10px 10px 15px -4px ${black99};
  box-shadow: 10px 10px 15px -4px ${black99};
  ${({small}) => small && css`
    width: 550px;
  `}
`;

export const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${black33};

  & h1 {
    user-select: none;
    margin: 0;
    line-height: 1;
    text-align: left;
    ${({centerHeader}) => centerHeader && css`
      text-align: center;
    `}
  }
`;

export const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 7001;
  top: 5px;
  right: 15px;
  border-radius: 32px;
  padding: 8px;
  line-height: 0;
  background-color: ${transparent};
  transition: background-color 100ms linear;

  &:hover {
    background-color: ${black26};
  }

  &:active {
    background-color: ${black33};
  }
`;

export const ModalBody = styled.div`
  width: 100%;
  padding: 15px;
  height: auto;
  max-height: 40em;
  overflow-y: auto;

  & ${InputBoxWrapper} {
    margin-bottom: 15px;
  }

  & ${SelectInputWrapper} {
    margin-bottom: 15px;
  }

  & ${TextAreaWrapper} {
    margin-bottom: 15px;
  }
`;

export const ModalActions = styled.div`
  width: 100%;
  text-align: right;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;

  & ${ButtonWrapper} {
    display: inline-block;
    
    & + ${ButtonWrapper} {
      margin-left: 5px;
    }
  }
`;
