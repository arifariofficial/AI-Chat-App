"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import MUIThemeProvider from "../styles/mui-theme-provider";
import { Provider as RuduxProvider } from "react-redux";
import { store } from "@lib/store/store";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <RuduxProvider store={store}>
      <NextThemesProvider {...props}>
        <MUIThemeProvider>
          <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </SidebarProvider>
        </MUIThemeProvider>
      </NextThemesProvider>
    </RuduxProvider>
  );
}
