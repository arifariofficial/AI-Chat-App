import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2E4346",
      light: "#3A5A6A",
      dark: "#1C2E36",
    },
    secondary: {
      main: "#4B5568",
      light: "#5B6578",
      dark: "#3B4558",
    },
    error: {
      main: "#ff0000",
      light: "#ff3333",
      dark: "#cc0000",
    },
    background: {
      default: "#F5F5F5",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#2E4346",
      secondary: "#4B5568",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          color: "#f5efd1",
          backgroundColor: "#4F6E70",
          "&:hover": {
            backgroundColor: "#3C5254",
          },
        },
      },
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e4342",
          color: "#f5efd1",
        },
        action: {
          "& .MuiButton-root": {
            color: "#2e4342",
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#3f6563",
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#719ea1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#719ea1",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "#2E4346",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
