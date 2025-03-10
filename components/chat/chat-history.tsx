"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import { IconDownload, IconRefresh } from "@/components/ui/icons";
import { useChat } from "@/lib/hooks/use-chat";
import { Session } from "next-auth";
import { Suspense, useCallback, useEffect } from "react";
import { toast } from "../ui/use-toast";
import MyButton from "../my-button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Locale } from "@/i18n.config";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface ChatHistoryProps {
  session: Session | null;
  buttonClassName?: string;
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export function ChatHistory({
  session,
  buttonClassName,
  lang,
  routes,
}: ChatHistoryProps) {
  const { loadChats } = useChat();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      try {
        if (isSidebarOpen && session?.user?.id) {
          loadChats(session.user.id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats, session?.user?.id, isSidebarOpen]);

  const handleRefresh = useCallback(() => {
    if (session?.user?.id) {
      loadChats(session.user.id);
      toast({
        title: "Päivitä",
        description: "Keskusteluhistoria päivitetty.",
      });
    }
  }, [session?.user?.id, loadChats]);

  if (!isSidebarOpen) {
    return null; // Ensure the component doesn't render when the sidebar is closed
  }

  return (
    <div className="bg-bg-backgroundSecondary flex h-full flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between bg-background p-4 shadow-sm">
        <h4 className="text-sm font-bold">Keskusteluhistoria</h4>
        <MyButton
          variant="outline"
          className={cn(buttonClassName, "ml-4 h-7 p-1")}
          onClick={handleRefresh}
          tooltipText="Päivitä"
        >
          <div className="flex max-w-full flex-row items-center gap-2">
            <IconDownload className="size-5" />
            <p>Päivitä</p>
            <IconRefresh className="size-4" />
          </div>
        </MyButton>
      </div>
      <Suspense
        // Loading skeleton while chats are loading
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md border bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        <SidebarList lang={lang} routes={routes} />
      </Suspense>
    </div>
  );
}
