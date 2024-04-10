import { createTheme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2E4346",
    },
    secondary: {
      main: "#4B5568",
    },
    error: {
      main: "#red",
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#4b5563",
          fontWeight: "bold",
          color: "#F5EFD1",
          "&:hover": {
            backgroundColor: "#374151",
          },
        },
      },
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
