"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import MUIThemeProvider from "../styles/mui-theme-provider";
import { Provider as RuduxProvider } from "react-redux";
import { store } from "@/lib/store/store";
import { ChatProvider } from "@/lib/hooks/use-chat";
import { Chat } from "@/lib/types";

type ProvidersProps = ThemeProviderProps & {
  chats?: Chat[] | undefined;
};

export function Providers({ children, chats, ...props }: ProvidersProps) {
  return (
    <RuduxProvider store={store}>
      <NextThemesProvider {...props}>
        <MUIThemeProvider>
          <ChatProvider initialChats={chats}>
            <SidebarProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
          </ChatProvider>
        </MUIThemeProvider>
      </NextThemesProvider>
    </RuduxProvider>
  );
}
