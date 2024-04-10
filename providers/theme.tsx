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
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)", // shadow-md
          "&:hover": {
            backgroundColor: "#374151",
          },
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
