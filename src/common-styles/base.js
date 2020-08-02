import styled, { createGlobalStyle } from "styled-components";
import { black, black33, tertiaryRed, white } from "./variables";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
    font-family: "Baloo 2";
    background-color: ${white};
    color: ${black};

    & * {
      box-sizing: border-box;
    }
  }

  *:focus {
    outline: none;
  }
`;

export const PageError = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: relative;
  border: 2px solid ${black33};
  background-color: ${tertiaryRed};
  color: ${white};
  border-radius: 15px;
`;
