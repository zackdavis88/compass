import styled, { css } from "styled-components";
import {
  lightGrey,
  black33,
  tertiaryRed,
  white,
  white40,
  transparent
} from "./variables";
import { InputBoxWrapper } from "../components/input-box/input-box.styles";
import { ButtonWrapper } from "../components/button/button.styles";

const FormWrapper = styled.div`
  position: relative;
  border: 1px solid ${lightGrey};
  border-radius: 15px;
  display: block;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  min-width: 500px;
  text-align: center;
`;

const FormSection = styled.div`
  position: relative;
  & ${InputBoxWrapper} {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
`;

export const FormError = styled.div`
  font-size: 18px;
  font-weight: bold;
  height: 0;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
  border: 2px solid ${black33};
  background-color: ${tertiaryRed};
  color: ${white};
  border-radius: 15px;
  margin-bottom: 0;
  opacity: 0;
  transition: margin 100ms linear, opacity 100ms linear, height 100ms linear, padding 100ms linear;
  ${({hasError}) => hasError && css`
    opacity: 1;
    margin-bottom: 25px;
    height: 65px;
    padding-top: 20px;
  `}
`;

const FormActions = styled.div`
  & ${ButtonWrapper} {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const FormComponent = FormWrapper;
FormComponent.Section = FormSection;
FormComponent.Actions = FormActions;
FormComponent.Error = FormError;
export const Form = FormComponent;

export const CloseButton = styled.div`
  cursor: pointer;
  transition: background-color 100ms linear;
  position: absolute;
  right: 15px;
  padding-top: 2px;
  padding-right: 1px;
  top: 10px;
  border-radius: 32px;
  padding: 2px;
  border: 1px solid ${transparent};
  line-height: 0px;
  user-select: none;

  &:hover {
    background-color: ${white40};
  }
`;
