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
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#3C5254",
            boxShadow: "0 7px 14px 0 rgba(0, 0, 0, 0.2)",
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
            color: "#2e4342", // button text
            backgroundColor: "#FFFFFF", //background color of the button
            "&:hover": {
              backgroundColor: "#3f6563", //hover background color of the button
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
            borderColor: "#719ea1", // change as needed
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#719ea1", // change as needed
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "#2E4346", // Change this to the color you want
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
