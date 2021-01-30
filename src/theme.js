import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    white: "#ffffff",
    black: "#212121",
    brandBlue: "#104b7d"

  }
});

export default theme;
