"use client";

import theme from "@components/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex h-full items-center justify-center">{children}</div>
    </ThemeProvider>
  );
}
