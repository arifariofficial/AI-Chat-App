"use client";

import { useEffect } from "react";
import { ClearHistory } from "./clear-history";
import { SidebarItems } from "./sidebar-items";
import { useChat } from "@/lib/hooks/use-chat";
import { clearChats } from "@/data/chat";
import { useSession } from "next-auth/react";
import { Locale } from "@/i18n.config";
import { LocalizedRoutes } from "@/lib/localized-routes";

interface SidebarListProps {
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export function SidebarList({ lang, routes }: SidebarListProps) {
  const { chats, loadChats } = useChat();

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      if (session?.user.id) {
        loadChats(session.user.id);
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats, session?.user.id]);

  if (!chats || !session) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col overflow-scroll">
      {/* Chat list section */}
      <div className="flex-1">
        {chats?.length ? (
          <div className="mx-2 h-full space-y-2 overflow-y-auto pb-[400px]">
            <SidebarItems chats={chats} lang={lang} routes={routes} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">NO Chat History</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 flex w-full items-center justify-between bg-backgroundSecondary p-4">
        <ClearHistory
          session={session}
          clearChats={clearChats}
          isEnabled={chats?.length > 0}
        />
      </div>
    </div>
  );
}
