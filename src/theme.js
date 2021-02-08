import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1440,
      lg: 1600,
      xl: 1920
    }
  },
  palette: {
    white: "#ffffff",
    black: "#212121",
    brandBlue: "#104b7d"
  },
  // is this officially allowed? Its working and no console warnings/errors...
  measurements: {
    navbarHeight: "75px"
  }
});

export default theme;
