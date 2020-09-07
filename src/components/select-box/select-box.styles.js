import styled, {css} from "styled-components";
import {
  inputHeight,
  transparent,
  white,
  black,
  black05,
  black1a,
  black33,
  blackb0,
  black80,
  black26
} from "../../common-styles/variables";
import {fadeIn} from "../../common-styles/animations";

export const IconsWrapper = styled.div`
  right: 13px;
  top: 0;
  position: absolute;
  user-select: none;
  line-height: ${inputHeight};
  color: ${blackb0};
  transition: color 100ms linear;

  & .clearButton {
    margin-right: 10px;
  }
`;

export const OptionsWrapper = styled.div`
  position: absolute;
  border-radius: 0 0 5px 5px;
  border: 1px solid ${black80};
  border-top: 1px solid ${transparent};
  width: 100%;
  height: auto;
  max-height: 12.5em;
  background-color: ${white};
  color: ${black};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 5px;
  padding-right: 5px;
  animation: 100ms linear 0s 1 ${fadeIn};
  z-index: 7002;
  line-height: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SelectItem = styled.li`
  position: relative;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
  color: ${black};
  border: 1px solid ${transparent};
  border-radius: 5px;
  transition: background-color 125ms linear;
  &:hover {
    background-color: ${black26};
  }

  ${({isSelected}) => isSelected && css`
    background-color: ${black1a};
  `}

  & > svg {
    float: right;
  }
`;

export const SelectList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
`;

export const SelectedValue = styled.div`
  position: relative;
  width: 100%;
  font-family: Arial;
  background-color: ${white};
  font-size: 16px;
  font-weight: normal;
  border-radius: 5px;
  border: 1px solid ${black33};
  transition: border-color 100ms linear, background-color 100ms linear, color 100ms linear, border-radius 100ms linear;
  cursor: pointer;
  line-height: ${inputHeight};
  padding-left: 13px;
  padding-right: 2.5em;
  color: ${black};
  user-select: none;
`;

export const SelectBoxWrapper = styled.div`
  position: relative;
  width: 100%;

  & .selectBoxLabel {
    color: ${black};
    position: absolute;
    padding-left: 3px;
    padding-right: 3px;
    top: -13px;
    left: 10px;
    background-color: ${white};
    font-size: 15px;
    font-weight: bold;
    user-select: none;
    animation: 100ms linear 0s 1 ${fadeIn};
    z-index: 7001;
  }

  ${({dropdownOpen}) => dropdownOpen && css`
    & > ${SelectedValue} {
      border-color: ${black80} !important;
      border-radius: 5px 5px 0 0;
    }
  `}

  ${({hasValue}) => hasValue ? (
    css`
      & > ${SelectedValue} {
        user-select: text;
        border-color: ${black33};
      }
    `
  ) : (
    css`
      & > ${SelectedValue} {
        color: ${blackb0};
      }

      &:hover > ${SelectedValue} {
        background-color: ${black05};
      }
    `
  )}

  &:hover > ${SelectedValue} > ${IconsWrapper} {
    color: ${black};
  }
`;
