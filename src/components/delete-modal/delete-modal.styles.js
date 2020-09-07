import styled from "styled-components";
import {InputBoxWrapper} from "../input-box/input-box.styles";
import {CheckBoxWrapper} from "../check-box/check-box.styles";

export const MessageSection = styled.div`
  & h3:first-of-type {
    margin-top: 20px;
    margin-bottom: 0;
  }

  & h3 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  & div {
    margin-bottom: 15px;
  }

  & div span {
    font-weight: bold;
  }
`;

export const InputSection = styled.div`
  & > div > span {
    font-weight: bold;
  }

  & ${InputBoxWrapper} {
    margin-top: 15px;
    & span {
      font-weight: normal;
    }
  }

  & ${CheckBoxWrapper} {
    margin-top: 15px;
  }
`;
