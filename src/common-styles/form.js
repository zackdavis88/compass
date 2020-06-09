import styled from "styled-components";
import { lightGrey } from "./variables";
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
`;

const FormSection = styled.div`
  position: relative;
  & ${InputBoxWrapper} {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
`;

const FormError = styled.div`
  position: relative;
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
