import styled, { createGlobalStyle, css } from "styled-components";
import { black, black33, tertiaryRed, white, transparent } from "./variables";
import {calcTextColor} from "../utils";

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
  text-align: center;
  padding: 15px;
  border-radius: 0;
`;

export const ProjectConfigLabel = styled.div.attrs(({color, transparent}) => ({
  style: {
    backgroundColor: transparent ? "#00000000" : color,
    color: transparent ? "#000000" : calcTextColor(color)
  }
}))`
  font-style: normal;
  background-color: ${transparent};
  padding: 0 10px;
  border-radius: 5px;
  display: inline-block;
`;
