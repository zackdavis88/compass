import styled from "styled-components";
import { Form } from "../../common-styles/form";

export const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;

  & ${Form} {
    width: 500px;
    margin-top: 25px;
    margin-left: auto;
    margin-right: auto;
  }
`;
