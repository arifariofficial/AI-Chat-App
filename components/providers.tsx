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
import { LangProvider } from "@/lib/chat/lang-context";
import { Locale } from "@/i18n.config";

type ProvidersProps = ThemeProviderProps & {
  chats?: Chat[] | undefined;
  lang: Locale;
};

export function Providers({ children, lang, chats, ...props }: ProvidersProps) {
  return (
    <RuduxProvider store={store}>
      <NextThemesProvider {...props}>
        <MUIThemeProvider>
          <ChatProvider initialChats={chats}>
            <SidebarProvider>
              <LangProvider lang={lang}>
                <TooltipProvider>{children}</TooltipProvider>
              </LangProvider>
            </SidebarProvider>
          </ChatProvider>
        </MUIThemeProvider>
      </NextThemesProvider>
    </RuduxProvider>
  );
}
