"use client";

import { useEffect } from "react";
import { ClearHistory } from "./clear-history";
import { SidebarItems } from "./sidebar-items";
import { useChats } from "@/lib/hooks/useChats";
import { clearChats } from "@/data/chat";
import { useSession } from "next-auth/react";

export function SidebarList() {
  const { chats, loadChats } = useChats();

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
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Chat list section */}
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 p-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Ei keskusteluhistoriaa
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ClearHistory
          session={session}
          clearChats={clearChats}
          isEnabled={chats?.length > 0}
        />
      </div>
    </div>
  );
}
