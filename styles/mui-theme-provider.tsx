import React, { useEffect, useState } from "react";
import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";

const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme: nextTheme, systemTheme } = useNextTheme();
  const [muiTheme, setMuiTheme] = useState(() => {
    const initialMode =
      nextTheme === "system" ? systemTheme : nextTheme || "light";
    return createDefaultTheme(initialMode === "dark" ? "dark" : "light");
  });

  function createDefaultTheme(mode: PaletteMode = "light") {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode, // Use the system's or user's preference for light/dark mode
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(var(--border))", // Default border color
                  borderWidth: "1px", // Default border width
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(var(--border))", // Same color
                  borderWidth: "2px", // Slightly thicker on hover
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(var(--border))", // Default border color
                  borderWidth: "1px", // Default border width
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(var(--border))", // Same color
                  borderWidth: "2px", // Slightly thicker on hover
                },
              },
            },
          },
        },
      }),
    );
  }

  useEffect(() => {
    const effectiveTheme = nextTheme === "system" ? systemTheme : nextTheme;
    const isDarkMode = effectiveTheme === "dark";
    setMuiTheme(createDefaultTheme(isDarkMode ? "dark" : "light"));
  }, [nextTheme, systemTheme]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
