"use client";

import { SidebarList } from "@/components/chat/sidebar-list";
import { IconRefresh } from "@components/ui/icons";
import { useChats } from "@lib/hooks/useChats";
import { Button } from "@mui/material";
import { getSession } from "next-auth/react";
import { Suspense, useEffect } from "react";

export function ChatHistory() {
  const { loadChats } = useChats();

  useEffect(() => {
    async function fetchSessionAndLoadChats() {
      const session = await getSession();
      if (session?.user?.id) {
        loadChats(session.user.id);
      }
    }

    fetchSessionAndLoadChats();
  }, [loadChats]);

  return (
    <div className="flex h-full flex-col ">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
        <Button>
          <IconRefresh />
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        <SidebarList />
      </Suspense>
    </div>
  );
}
