import styled from "styled-components";
import {RadioGroupWrapper} from "../radio-group/radio-group.styles";
export const ProjectModalWrapper = styled.div`
  position: relative;
  
  & ${RadioGroupWrapper} {
    margin-bottom: 25px;
  }
`;
